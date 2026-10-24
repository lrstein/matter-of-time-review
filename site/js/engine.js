// A Matter of Time — engine. Logic only: no content, no DOM.
// createEngine(story) takes the parsed content/story.md (see js/story-parser.js).
// Used by the browser (window.createEngine) and by tools/check-story.js.
//
// Storylets: no card links to the next. Each card says when it can appear (its Round and
// its Appears when conditions), and at the start of every round the engine draws from all
// the cards that qualify, favoring the one that continues the thread of the last decision.

(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) module.exports = factory();
  else root.createEngine = factory();
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  // A small, fast seeded random number generator (mulberry32): the same seed gives
  // the same sequence, so a game can be replayed exactly (?seed=N in the browser).
  function seeded(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Every flag a condition list mentions.
  function flagsIn(terms) {
    var out = [];
    (terms || []).forEach(function (t) {
      if (t.type === "flag" && !t.not) out.push(t.flag);
      if (t.type === "any") out.push.apply(out, t.flags);
    });
    return out;
  }

  // `opts.seed` (optional): an integer seed. Without one, a random seed is drawn once.
  // Every random choice in the game goes through `random()`.
  return function createEngine(story, opts) {
    opts = opts || {};
    var SEED = opts.seed != null && !isNaN(opts.seed) ? Math.floor(opts.seed) >>> 0 : Math.floor(Math.random() * 4294967296);
    var random = seeded(SEED);
    var VALUE_IDS = story.values.map(function (v) { return v.id; });
    var ROUNDS = story.rounds;
    var S = story.settings;

    var byId = {};
    story.scenarios.forEach(function (s) { byId[s.id] = s; });
    story.events.forEach(function (e) { byId[e.id] = e; });
    (story.sota || []).forEach(function (a) { byId[a.id] = a; });
    (story.tipping || []).forEach(function (t) { byId[t.id] = t; });
    var TIPPING = {};
    (story.tipping || []).forEach(function (t) { TIPPING[t.type] = t; });
    // Events with a Likelihood are adaptive (v5); without one, the v4.1 flat Event chance applies.
    var ADAPTIVE = story.events.some(function (e) { return e.likelihood; });

    // Futures reached by distance; the one without targets (The Long Middle) is the fallback.
    var RANKABLE = story.futures.filter(function (f) { return f.targets && Object.keys(f.targets).length; });
    var FALLBACK = story.futures.filter(function (f) { return !f.targets; })[0] || null;
    // Futures that can only follow a tipping point (they require the flag after_humanity).
    var AFTER = RANKABLE.filter(function (f) { return flagsIn(f.requires).indexOf("after_humanity") !== -1; });

    function zeroValues() {
      var v = {};
      VALUE_IDS.forEach(function (id) { v[id] = 0; });
      return v;
    }

    // `weight` (a milestone's optional Weight, default 1) multiplies the Effects.
    function applyEffects(values, effects, weight) {
      var w = weight == null ? 1 : weight;
      var next = {};
      VALUE_IDS.forEach(function (id) { next[id] = (values[id] || 0) + ((effects && effects[id]) || 0) * w; });
      return next;
    }

    // v5.6: once the world has tipped over, the Values in SETTINGS → Values lost at the
    // tipping point stop counting: Effects on them are dropped (the results show them struck
    // through, and their bars at state.snapshot, the moment before the tipping point).
    function lostNow(state) { return state.flags.after_humanity ? S.valuesLost || [] : []; }
    function counted(state, effects) {
      var lost = lostNow(state);
      if (!effects || !lost.length) return effects;
      var out = {};
      Object.keys(effects).forEach(function (id) { if (lost.indexOf(id) === -1) out[id] = effects[id]; });
      return out;
    }

    // Era drift only nudges a Value something in the game has already moved: a Value no
    // decision touched (Virtual, in a game that never went near it) stays at exactly 0.
    function untouchedOut(state, effects) {
      var out = {};
      Object.keys(effects).forEach(function (id) { if (state.values[id]) out[id] = effects[id]; });
      return out;
    }

    function scaleBy(values, k) {
      var out = {};
      VALUE_IDS.forEach(function (id) { out[id] = (values[id] || 0) * k; });
      return out;
    }

    // --- The Value scale -------------------------------------------------------------
    // A longer game moves the Values further, so every condition and the final match use
    // scaled Values: multiplied by Value scale rounds (4, the v4.1 game's length) over the
    // rounds played so far, never more than 1. After 7 rounds that's 4/7.
    function scaleFor(played) { return played > 0 ? Math.min(1, S.valueScaleRounds / played) : 1; }
    function played(state) { return Math.min(ROUNDS, state.round - 1); }
    function scaled(state) { return scaleBy(state.values, scaleFor(played(state))); }

    // --- Conditions ------------------------------------------------------------------
    // Values (scaled), year (of the last card or Event), round, agents, and flags.
    function number(state, id, values) {
      if (id === "year") return state.year;
      if (id === "round") return state.round;
      if (id === "agents") return state.agents;
      if (id === "brakes") return state.brakes;
      return (values || scaled(state))[id] || 0;
    }
    function hasFlag(state, flag, last) { return last ? state.last.indexOf(flag) !== -1 : !!state.flags[flag]; }
    // `cap` (optional): the capability to test "capability >= AGI" and "reached sota-robots"
    // against, { gauge, reached }; by default the game's own, as it stands.
    function holds(state, terms, values, cap) {
      if (!terms || !terms.length) return true;
      values = values || scaled(state);
      return terms.every(function (t) {
        if (t.type === "cap") {
          var g = cap ? cap.gauge : state.gauge, want = LEVELS.indexOf(t.level.toLowerCase());
          return t.op === ">=" ? g >= want : g <= want;
        }
        if (t.type === "reached") return isReached(cap ? cap.reached : state.reached, t.id) !== t.not;
        if (t.type === "pace") return (paceOf(cap ? cap.reached : state.reached, state.flags) === t.pace) !== t.not;
        if (t.type === "value") {
          var v = number(state, t.id, values);
          return t.op === ">=" ? v >= t.value : v <= t.value;
        }
        if (t.type === "flag") return hasFlag(state, t.flag, t.last) !== !!t.not;
        if (t.type === "any") return t.flags.some(function (f) { return hasFlag(state, f, t.last); });
        return true;
      });
    }
    // Close to holding: every Value within 1 point of its threshold (flags must hold).
    function nearly(state, terms) {
      var values = scaled(state);
      return terms.every(function (t) {
        if (t.type !== "value") return holds(state, [t], values);
        var v = number(state, t.id, values);
        return t.op === ">=" ? v >= t.value - 1 : v <= t.value + 1;
      });
    }
    // Whether the game meets a Future's Requires (its Values, scaled, and its flags).
    function meets(state, future) { return holds(state, future.requires); }

    // --- Flags -----------------------------------------------------------------------
    // Every Choice sets its own flag ("r3-drones/A") and any in its Sets; every Event and
    // tipping beat sets its id. `source` remembers what first set each flag, so the reveal
    // can show the decision behind a Future's required flag.
    // `when` is the round the flag was (most recently) set in: a Choice's round, or half a
    // round later for an Event, which came after it. Continuity and openers weight flags
    // by how recently they were set.
    // `year` (v5.2): the date of the card or Event that set it, so a sentence can say
    // "the cap you signed in {year}".
    function setFlag(state, flag, source, when, year) {
      if (!state.flags[flag]) { state.flags[flag] = true; state.source[flag] = source; }
      if (when != null) state.when[flag] = when;
      if (year != null) state.years[flag] = year;
      state.counts[flag] = (state.counts[flag] || 0) + 1;
      S.counters.forEach(function (c) {
        if (c.flag === flag && state.counts[flag] >= c.count && !state.flags[c.sets]) setFlag(state, c.sets, source, when, year);
      });
    }

    // The Brake balance: Choices and Events that slow AI's money and power add to it (Brake: +1),
    // and racing Choices take away from it (Brake: -1), so a slowdown follows the balance of the
    // player's decisions. A brake on a world-scale card, or a pause or restraint, also sets
    // brake_world: the slowdown has reached the global level, which a plateau needs (see STATE OF
    // THE ART).
    function brake(state, n, scale, paused, source, when, year) {
      if (!n) return;
      state.brakes += n;
      if (n > 0 && (scale === 3 || paused)) setFlag(state, "brake_world", source, when, year);
    }

    // --- Grounding -------------------------------------------------------------
    // A Future's Grounded by list names the Choices ("r2-glasses/C"), Events ("ev-crash") and
    // tipping beats ("tip-war") that can lead to it. A log entry's key is matched against it.

    function logKey(entry) {
      if (entry.kind === "choice") return entry.choice.key;
      if (entry.kind === "event") return entry.event.id;
      if (entry.kind === "tipping") return entry.beat.id;
      return null;
    }

    // The Grounded by entries of `future` that happened in this game, in the order they
    // happened: [{ entry, logIndex, round, key, text }]. `round` is the round whose Choice
    // it was, or for an Event, the round it followed.
    function grounding(state, future) {
      var list = (future && future.grounded) || [];
      if (!list.length) return [];
      var byKey = {};
      list.forEach(function (g) { byKey[g.key] = g; });
      var out = [];
      state.log.forEach(function (entry, i) {
        var g = byKey[logKey(entry)];
        if (!g) return;
        var year = entry.kind === "choice" ? entry.scenario.year : entry.kind === "event" ? entry.event.year : entry.year;
        out.push({ entry: entry, logIndex: i, round: entry.round, key: g.key, year: year, text: String(g.text).replace(/\{year\}/g, String(year)) });
      });
      return out;
    }

    // v5.2: how strongly the game's decisions pull toward a Future. Each of its grounding
    // matches adds Future pull decay ^ (rounds before the last), so the last rounds count most.
    function pull(state, future, matches) {
      matches = matches || grounding(state, future);
      var last = Math.min(ROUNDS, state.round - 1);
      return matches.reduce(function (n, m) { return n + Math.pow(S.futurePullDecay, Math.max(0, last - m.round)); }, 0);
    }

    // Whether a Future's grounding is a collection of decisions and not one early one: at
    // least Future min grounding matches, one of them from round Future recent round on.
    // A single match also counts when it comes from the last two rounds: the Future is then
    // the direct next step of what the player just decided, not of one early decision.
    // So does one recent match when the world is already very close to the Future's Targets
    // (within Future close distance): the Values, built by every decision, corroborate it.
    function wellGrounded(matches, dist) {
      var recent = matches.filter(function (m) { return m.round >= S.futureRecentRound; });
      if (!recent.length) return false;
      return matches.length >= S.futureMinGrounding || recent.some(function (m) { return m.round >= ROUNDS - 1; }) ||
        (dist != null && dist <= S.futureCloseDistance);
    }

    // The Futures this game is heading toward, best first: [{ future, distance, score }].
    // Score = distance − Future pull × pull; a Future whose Value Requires the game doesn't
    // meet yet scores 1 worse, and one beyond the Long Middle threshold 3 worse a point.
    // One whose required flags or milestones aren't there can't lead (they come from
    // specific decisions, like a near miss, or from the world's AI). Futures that need a
    // tipping point only lead after one.
    function leaders(state) {
      var values = scaled(state), tipped = !!state.flags.after_humanity;
      var list = RANKABLE.filter(function (f) { return (AFTER.indexOf(f) !== -1) === tipped; });
      var open = list.filter(function (f) { return (f.requires || []).every(function (t) { return (t.type !== "flag" && t.type !== "reached") || holds(state, [t]); }); });
      return (open.length ? open : list)
        .map(function (f) {
          var d = distance(values, f);
          // Beyond the Long Middle threshold it can't be given, so it can only lead if nothing nearer can.
          var far = Math.max(0, d - S.longMiddleThreshold) * 3;
          return { future: f, distance: d, score: d - S.futurePull * pull(state, f) + (meets(state, f) ? 0 : 1) + far };
        })
        .sort(function (a, b) { return a.score - b.score; });
    }

    // "How we got here" (v5.2): up to three sentences, a collection of decisions. If the
    // Future requires flags, the decisions that set them come first; then the latest match;
    // then one from the middle of the game (the latest earlier match from a different
    // round); the earliest only if nothing else is left. In the order they happened.
    var LOOKING_BACK = 3;
    function lookingBack(matches, future, state) {
      if (!matches || !matches.length) return [];
      var pick = [];
      function add(m) { if (m && pick.length < LOOKING_BACK && pick.indexOf(m) === -1) pick.push(m); }
      flagsIn(future && future.requires).forEach(function (f) {
        var src = state && state.source[f];
        add(matches.filter(function (x) { return x.key === src; })[0]);
      });
      add(matches[matches.length - 1]);
      // Then the most recent matches from rounds not yet represented.
      for (var i = matches.length - 2; i >= 0; i--) {
        if (!pick.some(function (p) { return p.round === matches[i].round; })) add(matches[i]);
      }
      for (var j = matches.length - 2; j >= 0; j--) add(matches[j]);
      return pick.sort(function (a, b) { return a.logIndex - b.logIndex; });
    }

    // Grounded by keys of every Future, for steering: { futureId: { key: true } }.
    var GROUND_KEYS = {};
    story.futures.forEach(function (f) {
      GROUND_KEYS[f.id] = {};
      (f.grounded || []).forEach(function (g) { GROUND_KEYS[f.id][g.key] = true; });
    });

    // Whether any of a Scenario's Choices appears in the Grounded by list of one of `futures`.
    function steersToward(s, futures) {
      return s.choices.some(function (c) {
        return futures.some(function (f) { return GROUND_KEYS[f.id][c.key]; });
      });
    }

    function futureById(id) {
      for (var i = 0; i < story.futures.length; i++) if (story.futures[i].id === id) return story.futures[i];
      return null;
    }

    function cardById(id) { return byId[id] || null; }

    // Root-mean-square difference over only the Values the Future defines.
    function distance(values, future) {
      var keys = Object.keys(future.targets);
      var sum = 0;
      keys.forEach(function (k) {
        var d = (values[k] || 0) - future.targets[k];
        sum += d * d;
      });
      return Math.sqrt(sum / keys.length);
    }

    // All Futures except the fallback, nearest first.
    function ranked(values) {
      return RANKABLE
        .map(function (f) { return { future: f, distance: distance(values, f) }; })
        .sort(function (a, b) { return a.distance - b.distance; });
    }

    function shuffle(list, rng) {
      rng = rng || random;
      var a = list.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(rng() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }

    // `history` (optional) is { id: true } for every card shown earlier this session;
    // replays favor cards not in it. The engine only reads it; the UI adds to it.
    // `gauge` is the capability gauge level (an index into Gauge levels); `done` holds the
    // milestones already passed (shown or skipped); `slots` the Slots already filled.
    // `flags`, `source` and `counts`: see setFlag. `last`: the flags set by the most recent
    // Choice and any Event after it (`lastChoice`, `lastEvent`). `year`: the date of the last
    // card or Event. `agents`: the hidden Agents counter; `brakes`: the hidden Brake counter. `tipping`: the beat, once tipped.
    function newGame(history) {
      return {
        values: zeroValues(), round: 1, seen: [], picks: [], log: [], history: history || {},
        gauge: GAUGE_START, done: {}, slots: {}, reached: [],
        flags: {}, source: {}, counts: {}, when: {}, years: {}, last: [], lastChoice: [], lastEvent: [], afterChoices: 0,
        year: -Infinity, cardYear: -Infinity, agents: 0, agentsSource: null, brakes: 0, nearMissNew: null, events: 0, eventRound: 0, tipping: null, snapshot: null,
        spine: null, threads: {}, lastScale: null, slowShown: false
      };
    }

    function clone(state) {
      return {
        values: Object.assign({}, state.values), round: state.round,
        seen: state.seen.slice(), picks: state.picks.slice(), log: state.log.slice(),
        history: state.history, gauge: state.gauge, done: Object.assign({}, state.done), slots: Object.assign({}, state.slots),
        reached: state.reached.slice(),
        flags: Object.assign({}, state.flags), source: Object.assign({}, state.source), counts: Object.assign({}, state.counts),
        when: Object.assign({}, state.when), years: Object.assign({}, state.years), afterChoices: state.afterChoices,
        last: state.last.slice(), lastChoice: state.lastChoice.slice(), lastEvent: state.lastEvent.slice(),
        year: state.year, cardYear: state.cardYear, agents: state.agents, agentsSource: state.agentsSource, brakes: state.brakes, nearMissNew: state.nearMissNew,
        events: state.events, eventRound: state.eventRound, tipping: state.tipping, snapshot: state.snapshot,
        spine: state.spine, threads: state.threads, lastScale: state.lastScale, slowShown: state.slowShown
      };
    }

    // --- Picking the next card -----------------------------------------------------
    // The pool: every Scenario whose Round includes this round, whose Appears when holds,
    // that hasn't appeared this game and isn't dated before the last card or Event. After a
    // tipping point only "After humanity" cards qualify, and never before one.
    function eligible(state, ignoreConditions) {
      var tipped = !!state.flags.after_humanity;
      return story.scenarios.filter(function (s) {
        return s.rounds.indexOf(state.round) !== -1 && state.seen.indexOf(s.id) === -1 &&
          !(s.year < state.year) && s.afterHumanity === tipped &&
          // v5.3: at most Most years between cards after the last card.
          !(S.maxGap && state.cardYear > -Infinity && s.year - state.cardYear > S.maxGap) &&
          (ignoreConditions ? ignoreConditions(s) : holds(state, s.appears, null, CAPPED[s.id] ? capabilityAt(state, s.year) : null));
      });
    }

    // Cards whose conditions test capability. They are tested against the world as it will
    // be at their own date: the milestones up to that date are worked out first, exactly as
    // the transition will show them (see resolveTo), so a card never assumes an AI the
    // world doesn't have, and the milestones shown before it always agree with it.
    var CAPPED = {};
    story.scenarios.forEach(function (s) {
      CAPPED[s.id] = (s.appears || []).some(function (t) { return t.type === "cap" || t.type === "reached" || t.type === "pace"; });
    });
    function capabilityAt(state, year) {
      var base = state.capBase || { state: state, event: null };
      var cache = base.cache || (base.cache = {});
      if (!cache[year]) {
        var sim = resolveTo(base.state, base.event, year).sim;
        cache[year] = { gauge: sim.gauge, reached: sim.reached };
      }
      return cache[year];
    }

    // v5.4: the card or Event as it reads in this world: the first Version whose When holds
    // (capability and milestones tested at its own date) replaces its text. A shallow copy:
    // same id, choices and everything else.
    function versioned(state, item, cap) {
      var vs = item.versions || [];
      for (var i = 0; i < vs.length; i++) {
        if (holds(state, vs[i].when, null, cap)) return Object.assign({}, item, vs[i].fields, { version: vs[i].name });
      }
      return item;
    }

    // The safety net, if the pool is ever empty (check-story.js proves it never is): cards
    // marked Fallback ignore their conditions; then any unused card of this round in date
    // order; then any unused card of this round at all.
    // v5.4: the Event just shown, if it demands a response (Demands response).
    // v6.0: or the last Choice, if it does (the halt is answered in Geneva).
    function demandingChoice(state) {
      var last = state.picks[state.picks.length - 1];
      return last && last.choice.demands ? last.choice.key : null;
    }
    function demanding(state) {
      var id = state.lastEvent[0], e = id && byId[id];
      return e && e.demands ? id : demandingChoice(state);
    }
    function pool(state) {
      var list = eligible(state);
      // After an Event (or, v6.0, a Choice) that demands a response, only the cards that
      // answer it (one of their openers or conditions names it), if any qualify.
      var d = demanding(state);
      if (d) { var answers = list.filter(function (s) { return mentions(s, [d]); }); if (answers.length) list = answers; }
      // v5.5: by round Pace question by round, the player has been asked how fast AI should go.
      // If no Pace card has been drawn yet, only those cards qualify (if any do).
      if (S.paceBy && state.round === S.paceBy && !state.flags.after_humanity && !S.paceCards.some(function (id) { return state.seen.indexOf(id) !== -1; })) {
        var pace = list.filter(function (s) { return S.paceCards.indexOf(s.id) !== -1; });
        if (pace.length) list = pace;
      }
      // v5.9: in a world held at the line or leveled off, from round Pressure question by
      // round, the player meets the push for more AI. If no Pressure card has been drawn
      // yet, only those cards qualify (if any do).
      if (S.pressureBy && state.round >= S.pressureBy && !state.flags.after_humanity && !d && slowWorld(state) &&
          !S.pressureCards.some(function (id) { return state.seen.indexOf(id) !== -1; })) {
        var push = list.filter(function (s) { return S.pressureCards.indexOf(s.id) !== -1; });
        if (push.length) list = push;
      }
      if (list.length) return { list: list, safety: 0 };
      list = eligible(state, function () { return true; });
      if (list.length) return { list: list, safety: 2 };
      list = story.scenarios.filter(function (s) { return s.rounds.indexOf(state.round) !== -1 && state.seen.indexOf(s.id) === -1; });
      return { list: list, safety: 3 };
    }

    // The flags a card's conditions mention: its Appears when and its openers.
    var MENTIONS = {};
    story.scenarios.forEach(function (s) {
      var list = flagsIn(s.appears);
      s.openers.forEach(function (o) { list = list.concat(flagsIn(o.when)); });
      MENTIONS[s.id] = list;
    });
    function mentions(s, flags) {
      if (!flags.length) return false;
      return MENTIONS[s.id].some(function (f) { return flags.indexOf(f) !== -1; });
    }

    // How many rounds ago a flag was set: 0 for the last Choice, −0.5 for an Event after it.
    function age(state, flag) { return (state.round - 1) - (state.when[flag] != null ? state.when[flag] : -Infinity); }

    // Continuity: how strongly a card follows from this game's decisions. Every flag its
    // conditions or openers mention that has been set adds Continuity decay ^ its age: 1 for
    // the last decision, half that for the one before (at a decay of 0.5), and so on, a
    // little more than 1 for an Event that just happened. So every earlier decision counts,
    // and the most recent count most.
    var DIRECT = {};
    story.scenarios.forEach(function (s) { DIRECT[s.id] = MENTIONS[s.id].filter(function (f, i, a) { return a.indexOf(f) === i; }); });
    // v5.1: a card's Follows list names the decisions that cause it, each with a strength,
    // and only those count (openers are wording). Content without Follows falls back to the
    // flags its conditions and openers mention, at strength 1.
    function affinity(state, s) {
      var a = 0;
      var list = s.follows && s.follows.length ? s.follows : DIRECT[s.id].map(function (f) { return { flag: f, w: 1 }; });
      list.forEach(function (x) { if (state.flags[x.flag]) a += x.w * Math.pow(S.continuityDecay, age(state, x.flag)); });
      return a;
    }

    // The spine: the storylines (threads) the player's decisions have dwelt on, recent ones
    // counting more (Spine decay per round). state.threads holds each thread's weight, the
    // strongest scaled to 1; state.spine names the strongest. Events don't move it: they
    // happen to the player.
    function updateSpine(state) {
      var sums = {}, now = state.picks.length, top = 0;
      state.picks.forEach(function (p, i) {
        (p.scenario.threads || []).forEach(function (t) { sums[t] = (sums[t] || 0) + Math.pow(S.spineDecay, now - (i + 1)); });
      });
      Object.keys(sums).forEach(function (t) { top = Math.max(top, sums[t]); });
      state.threads = {};
      state.spine = null;
      Object.keys(sums).forEach(function (t) {
        state.threads[t] = sums[t] / top;
        if (!state.spine || sums[t] > sums[state.spine]) state.spine = t;
      });
    }
    // How strongly a card continues the spine: the weight of its strongest thread (0 to 1).
    function onSpine(state, s) {
      var best = 0;
      (s.threads || []).forEach(function (t) { best = Math.max(best, (state.threads && state.threads[t]) || 0); });
      return best;
    }

    // A card's score: its Weight, times Continuity bonus ^ its continuity, Steering bonus (from
    // round Steering from round, if a Choice on it grounds one of the two nearest Futures),
    // the Agents arc's bonus or penalty, and Novelty bonus if it's new this session.
    function score(state, s, nearest) {
      var aff = affinity(state, s);
      var w = s.weight * Math.pow(S.continuityBonus, aff);
      w *= Math.pow(S.spineBonus, onSpine(state, s));
      // Rising stakes: below the round's scale, or a step down from the last card's.
      if (s.scale >= 0) {
        var target = S.roundScales[state.round - 1];
        if (target != null && s.scale < target) w *= S.scalePenalty;
        if (state.lastScale != null && s.scale < state.lastScale) w *= S.scalePenalty;
      }
      // Steering toward the Futures the game is heading for only chooses among cards that
      // continue the story. v5.2: per round (Steering bonus "1, 1, 1, 4, 10, 25"), toward the
      // leading Future; a card that also offers the runner-up (in the last rounds, the
      // final fork: confirm the trajectory or turn it) gets a little more.
      if (state.round >= S.steerFrom && (aff > 0 || !S.roundScales.length)) {
        var bonus = S.steeringByRound.length ? (S.steeringByRound[state.round - 1] || 1) : S.steeringBonus;
        if (S.steeringByRound.length) {
          if (steersToward(s, nearest.slice(0, 1))) {
            w *= bonus;
            if (nearest[1] && steersToward(s, nearest.slice(1, 2))) w *= Math.sqrt(Math.sqrt(bonus));
          } else if (steersToward(s, nearest.slice(1, 2))) w *= Math.sqrt(bonus);
        } else if (steersToward(s, nearest)) w *= bonus;
      }
      if (state.flags.agents_era) {
        if (s.focus === "agents") w *= S.agentsBonus;
        else if (state.round >= S.agentsPenaltyFrom && !mentions(s, ["agents_era"])) w *= S.agentsPenalty;
      }
      if (!state.history[s.id]) w *= S.noveltyBonus;
      return w;
    }

    // Round influence: the stakes rise, so a later Choice moves the Values further.
    function influence(round) { var f = S.roundInfluence[round - 1]; return f == null ? 1 : f; }

    // The Values (scaled) after a Choice, for the explore and tiebreaker scores.
    function projected(state, effects) {
      return scaleBy(applyEffects(state.values, effects, influence(state.round)), scaleFor(played(state) + 1));
    }

    // Explore: how many of the 3 nearest Futures its Choices lead toward, then (as a
    // tiebreak) how much its Choices spread the distances to them.
    function exploreScore(state, s) {
      var near = ranked(scaled(state)).slice(0, 3).map(function (r) { return r.future; });
      var leads = {};
      var spread = 0;
      var dists = s.choices.map(function (c) {
        var v = projected(state, c.effects);
        var ds = near.map(function (f) { return distance(v, f); });
        var nearest = 0;
        for (var i = 1; i < ds.length; i++) if (ds[i] < ds[nearest]) nearest = i;
        leads[near[nearest].id] = true;
        return ds;
      });
      for (var f = 0; f < near.length; f++) {
        var col = dists.map(function (d) { return d[f]; });
        spread += Math.max.apply(null, col) - Math.min.apply(null, col);
      }
      return Object.keys(leads).length * 1000 + spread;
    }

    // Tiebreaker (the last round): how strongly its Choices split the two nearest Futures.
    function tiebreakerScore(state, s) {
      var r = ranked(scaled(state));
      var A = r[0].future, B = r[1].future;
      var diffs = s.choices.map(function (c) {
        var v = projected(state, c.effects);
        return distance(v, A) - distance(v, B);
      });
      return Math.max.apply(null, diffs) - Math.min.apply(null, diffs);
    }

    // The odds of each card being drawn this round: { odds: [{ scenario, p }], fresh, safety }.
    // Replays: if the most continuous cards include one not yet seen this session, cards
    // already seen drop out (`fresh` lists the unseen ones, for the play-test harness).
    // Before round Best-fit from round, cards are drawn in proportion to their scores. From
    // then on, the best-scoring card (ties go to the explore score, or in the last round
    // the tiebreaker, then to file order) is drawn with probability Best-fit pick chance,
    // and otherwise one of the rest, in proportion to their scores.
    function scenarioOdds(state) {
      var p = pool(state), list = p.list, fresh = [];
      var aff = list.map(function (s) { return affinity(state, s); });
      var top = Math.max.apply(null, aff.concat([0]));
      var unseen = list.filter(function (s) { return !state.history[s.id]; });
      if (unseen.length < list.length && list.some(function (s, i) { return aff[i] >= top * 0.75 && !state.history[s.id]; })) {
        list = unseen;
        fresh = unseen.map(function (s) { return s.id; });
      }
      var out = { odds: [], fresh: fresh, safety: p.safety };
      if (list.length <= 1) { out.odds = list.map(function (s) { return { scenario: s, p: 1 }; }); return out; }
      var nearest = (S.steeringByRound.length ? leaders(state) : ranked(scaled(state))).slice(0, 2).map(function (r) { return r.future; });
      var rows = list.map(function (s, i) { return { scenario: s, w: score(state, s, nearest), order: i }; });
      if (state.round < S.bestFitFrom) {
        var total = rows.reduce(function (n, r) { return n + r.w; }, 0);
        out.odds = rows.map(function (r) { return { scenario: r.scenario, p: total ? r.w / total : 1 / rows.length }; });
        return out;
      }
      var fine = state.round >= ROUNDS ? tiebreakerScore : exploreScore;
      rows.forEach(function (r) { r.fine = fine(state, r.scenario); });
      rows.sort(function (a, b) { return b.w - a.w || b.fine - a.fine || a.order - b.order; });
      var rest = rows.slice(1).reduce(function (n, r) { return n + r.w; }, 0);
      out.odds = rows.map(function (r, i) {
        return { scenario: r.scenario, p: i === 0 ? S.bestFitChance : (1 - S.bestFitChance) * (rest ? r.w / rest : 1 / (rows.length - 1)) };
      });
      return out;
    }

    function sample(odds, rng) {
      var x = (rng || random)();
      for (var i = 0; i < odds.length; i++) {
        x -= odds[i].p;
        if (x < 0) return odds[i];
      }
      return odds[odds.length - 1];
    }

    // The lead-in shown before a card: of its openers whose condition holds, the one tied to
    // the most recent decision (the youngest flag it mentions; file order on a tie, and
    // openers that mention no flag after those that do), otherwise its default.
    function openerFor(state, s) {
      return pickLine(state, s.openers, capabilityAt(state, s.year));
    }
    // Shared by openers and milestones' Because lines; "{year}" is filled in (fillYear).
    function pickLine(state, lines, cap) { return pickLineAt(state, lines, cap).text; }
    // The line itself: { text, cite } (cite: the flags its condition names that are set, so
    // a milestone's log entry records which decision explained it; none for the default).
    function pickLineAt(state, lines, cap) {
      var dflt = "", best = null, bestAge = Infinity;
      for (var i = 0; i < lines.length; i++) {
        var o = lines[i];
        if (o.isDefault) { if (!dflt) dflt = o.text; continue; }
        if (!holds(state, o.when, null, cap)) continue;
        var flags = flagsIn(o.when).filter(function (f) { return state.flags[f]; });
        var a = flags.length ? Math.min.apply(null, flags.map(function (f) { return age(state, f); })) : 1e9;
        if (!best || a < bestAge) { best = o; bestAge = a; }
      }
      if (!best) return { text: dflt, cite: [] };
      return { text: fillYear(state, best.text, best.when), cite: flagsIn(best.when).filter(function (f) { return state.flags[f]; }) };
    }

    // Draw this round's card. Returns { scenario, lead, fresh, safety }: lead is the opener
    // (none for round 1); fresh lists the candidates not yet shown this session, if the
    // draw was limited to them; safety is 0 unless the pool was empty (see pool()).
    function selectScenario(state, rng) {
      var o = scenarioOdds(state);
      var pick = sample(o.odds, rng).scenario;
      var shown = pick.versions && pick.versions.length ? versioned(state, pick, capabilityAt(state, pick.year)) : pick;
      return { scenario: shown, lead: state.round > 1 ? openerFor(state, pick) : "", fresh: o.fresh, safety: o.safety };
    }

    // Apply a Choice and move to the next round. Returns the tipping beat if this Choice
    // tipped the world over (see TIPPING POINTS), otherwise null.
    function choose(state, scenario, choice) {
      var round = state.round;
      state.nearMissNew = null;
      var applies = counted(state, choice.effects) || {};
      state.values = applyEffects(state.values, applies, influence(round));
      state.seen.push(scenario.id);
      state.picks.push({ scenario: scenario, choice: choice });
      // v5.6: what this Choice did to each Value (× Round influence), and the Values it would
      // have moved that no longer count, for the pills on the results screen.
      var applied = {}, lost = [];
      VALUE_IDS.forEach(function (id) {
        var d = (choice.effects && choice.effects[id]) || 0;
        if (!d) return;
        applied[id] = d * influence(round);
        if (!applies[id]) lost.push(id);
      });
      state.log.push({ kind: "choice", scenario: scenario, choice: choice, round: round, applied: applied, lost: lost });
      var y = scenario.year;
      setFlag(state, choice.key, choice.key, round, y);
      // The card's own id too, so a later card can follow this one whatever was chosen.
      setFlag(state, scenario.id, choice.key, round, y);
      choice.sets.forEach(function (f) { setFlag(state, f, choice.key, round, y); });
      // A Choice can end a named flag, for everything after it (the cap expiring ends the pause).
      (choice.clears || []).forEach(function (f) { delete state.flags[f]; });
      // Making any Choice on a card opens the card's threads (its topics), for later cards.
      (scenario.threads || []).forEach(function (t) { setFlag(state, t, choice.key, round, y); });
      // "Mostly" rules: after a tipping point, a flag like tended_life holds while at least
      // half of the Choices made since have set its counted flag (tends_life).
      if (state.flags.after_humanity && scenario.afterHumanity) {
        state.afterChoices += 1;
        S.mostly.forEach(function (m) {
          var n = state.counts[m.flag] || 0;
          if (n * 2 >= state.afterChoices) { if (!state.flags[m.sets]) { state.flags[m.sets] = true; state.source[m.sets] = choice.sets.indexOf(m.flag) !== -1 ? choice.key : state.source[m.sets] || choice.key; state.when[m.sets] = round; state.years[m.sets] = y; } }
          else { delete state.flags[m.sets]; }
          if (state.flags[m.sets] && choice.sets.indexOf(m.flag) !== -1) state.source[m.sets] = choice.key;
        });
      }
      brake(state, choice.brake, scenario.scale, choice.sets.indexOf("pause") !== -1 || choice.sets.indexOf("restraint") !== -1, choice.key, round, y);
      if (choice.agents) {
        var before = state.agents;
        state.agents += choice.agents;
        if (before < S.agentsThreshold && state.agents >= S.agentsThreshold) state.agentsSource = choice.key;
      }
      state.lastChoice = [choice.key].concat(choice.sets);
      state.lastEvent = [];
      state.last = state.lastChoice.slice();
      state.year = Math.max(state.year, scenario.year);
      state.cardYear = scenario.year;
      if (scenario.scale >= 0) state.lastScale = scenario.scale;
      state.round += 1;
      updateSpine(state);
      // The tipping point: checked against the Values (scaled) with this Choice made.
      var beat = null;
      if (choice.tipping && !state.flags.after_humanity && TIPPING[choice.tipping.type]) {
        if (holds(state, choice.tipping.when)) {
          beat = TIPPING[choice.tipping.type];
          state.tipping = beat;
          // v5.6: the Values as they stood the moment before, for the results screen.
          state.snapshot = scaled(state);
          // Why this decision, and whether it could have been stopped: worked out before the
          // beat's own flags are set, so Prevented names one of the player's earlier decisions.
          var why = (choice.tippingWhy || []).map(function (p) { return p.replace(/\{year\}/g, String(scenario.year)); });
          var earlier = (beat.prevented || []).filter(function (o) {
            var f = flagsIn(o.when);
            return f.indexOf(choice.key) === -1 && f.indexOf(scenario.id) === -1; // never the tipping decision itself
          });
          var prevented = pickLine(state, earlier, null);
          var told = (beat.versions || []).filter(function (v) { return holds(state, v.when); })[0];
          setFlag(state, beat.id, beat.id, round, y);
          setFlag(state, "after_humanity", beat.id, round, y);
          state.last.push(beat.id);
          state.log.push({ kind: "tipping", beat: beat, scenario: scenario, choice: choice, round: round, year: scenario.year, date: scenario.date, why: why, prevented: prevented, text: told ? told.text : beat.text });
        } else if (nearly(state, choice.tipping.when) && !state.flags.near_miss) {
          // The world came close and turned back: SETTINGS → Near miss effects, quietly.
          // v5.4: near_war, near_collapse or near_runaway says which edge it was, for the
          // near-miss Event that follows and the stories that remember it.
          setFlag(state, "near_miss", choice.key, round, y);
          setFlag(state, "near_" + choice.tipping.type, choice.key, round, y);
          state.nearMissNew = choice.tipping.type;
          state.values = applyEffects(state.values, S.nearMissEffects);
        }
      }
      return beat;
    }

    // --- Events --------------------------------------------------------------
    // After a round's Choice, an Event may happen. Eligible: its Round includes the round
    // just played, its Appears when holds, it hasn't happened this game, it isn't dated
    // before the last card, the world hasn't tipped over, and the game hasn't had Most Events
    // per game. On a replay, Events not yet shown this session are preferred over all others.
    // Adaptive Events (with a Likelihood) also never come in two transitions in a row; each
    // eligible one rolls its likelihood, and if several succeed, the likeliest is shown.
    // Without Likelihoods (the v4.1 content), the flat Event chance applies, preferring
    // Events that lead to the same cards as the Choice.

    function likelihood(state, e) {
      var l = e.likelihood.base;
      var values = scaled(state);
      e.likelihood.mods.forEach(function (m) { if (holds(state, m.when, values)) l += m.delta; });
      return Math.max(0, Math.min(1, l));
    }

    function eventPool(state) {
      var after = state.round - 1;
      if (after < 1 || after >= ROUNDS || state.flags.after_humanity || state.events >= S.maxEvents) return [];
      // v6.0: a Choice that demands a response is answered by the very next card, with no Event between.
      if (demandingChoice(state)) return [];
      if (ADAPTIVE && state.eventRound && state.eventRound === after - 1) return [];
      var list = story.events.filter(function (e) {
        return !e.nearMiss && !e.certain && e.rounds.indexOf(after) !== -1 && state.seen.indexOf(e.id) === -1 && !(e.year < state.year) && holds(state, e.appears);
      });
      var fresh = list.filter(function (e) { return !state.history[e.id]; });
      return fresh.length ? fresh : list;
    }

    // [{ event (null = no Event), p }]
    function eventOdds(state) {
      // v5.4: a near miss is always shown, as its Event, a year after the card.
      if (state.nearMissNew) {
        var nm = story.events.filter(function (e) { return e.nearMiss === state.nearMissNew && state.seen.indexOf(e.id) === -1; })[0];
        if (nm) {
          var ny = state.cardYear + 1;
          return [{ event: Object.assign({}, nm, { year: ny, date: String(ny) }), p: 1 }];
        }
      }
      // v6.1: a Certain Event is always shown once its Appears when holds (the Vienna treaty
      // after a call for a worldwide pause), past the usual limits on Events.
      if (state.round > 1 && !state.flags.after_humanity) {
        var sure = story.events.filter(function (e) {
          return e.certain && e.rounds.indexOf(state.round - 1) !== -1 && state.seen.indexOf(e.id) === -1 && !(e.year < state.year) && holds(state, e.appears);
        })[0];
        if (sure) return [{ event: sure, p: 1 }];
      }
      var list = eventPool(state);
      if (!list.length) return [{ event: null, p: 1 }];
      if (ADAPTIVE) {
        // v5.3: an Event on the player's main storylines (a thread weighing at least half the
        // spine) is likelier, by Event on-spine factor, and one off them less likely, by Event
        // off-spine factor, so the Events that happen belong to the story.
        var rows = list.map(function (e, i) {
          var l = e.likelihood ? likelihood(state, e) : 0;
          if (S.eventOffSpine != null && state.threads && Object.keys(state.threads).length) l = Math.min(1, l * (onSpine(state, e) < 0.5 ? S.eventOffSpine : S.eventOnSpine));
          return { event: e, l: l, order: i };
        })
          .sort(function (a, b) { return b.l - a.l || a.order - b.order; });
        var none = 1, out = [];
        rows.forEach(function (r) { out.push({ event: r.event, p: none * r.l }); none *= 1 - r.l; });
        out.unshift({ event: null, p: none });
        return out;
      }
      var next = story.scenarios.filter(function (s) { return s.rounds.indexOf(state.round) !== -1 && mentions(s, state.lastChoice); });
      var linked = list.filter(function (e) { return next.some(function (s) { return mentions(s, [e.id]); }); });
      if (linked.length) list = linked;
      var odds = [{ event: null, p: 1 - S.eventChance }];
      list.forEach(function (e) { odds.push({ event: e, p: S.eventChance / list.length }); });
      return odds;
    }

    function applyEvent(state, event) {
      state.values = applyEffects(state.values, event.effects);
      state.seen.push(event.id);
      // v6.0: what it moved, for its pills on the results: its own Effects, and for a near
      // miss's Event the Near miss effects too (applied with the Choice, shown here).
      var applied = {};
      [event.effects, event.nearMiss ? S.nearMissEffects : null].forEach(function (fx) {
        Object.keys(fx || {}).forEach(function (id) { if (fx[id]) applied[id] = (applied[id] || 0) + fx[id]; });
      });
      state.log.push({ kind: "event", event: event, round: state.round - 1, applied: applied, lost: [] });
      var when = state.round - 0.5; // after the Choice of the round just played
      setFlag(state, event.id, event.id, when, event.year);
      event.sets.forEach(function (f) { setFlag(state, f, event.id, when, event.year); });
      (event.threads || []).forEach(function (t) { setFlag(state, t, event.id, when, event.year); });
      brake(state, event.brake, event.scale, event.sets.indexOf("pause") !== -1, event.id, when, event.year);
      state.lastEvent = [event.id].concat(event.sets);
      state.last = state.lastChoice.concat(state.lastEvent);
      state.year = Math.max(state.year, event.year);
      state.events += 1;
      state.eventRound = state.round - 1;
      return state;
    }

    // --- The start of a round: era drift and the Agents arc ---------------------------
    // The technology keeps advancing whatever anyone chooses: SETTINGS → Era drift adds a
    // little to some Values at the start of some rounds, quietly. From round Agents from
    // round, once the Agents counter has reached Agents threshold, the flag agents_era is set
    // (its source is the Choice that reached the threshold).
    function roundStep(state) {
      return { kind: "round", round: state.round, drift: S.eraDrift[state.round] || null };
    }
    function startRound(state, step) {
      if (step.drift) state.values = applyEffects(state.values, counted(state, untouchedOut(state, step.drift)));
      if (step.round >= S.agentsFrom && state.agents >= S.agentsThreshold && !state.flags.agents_era) setFlag(state, "agents_era", state.agentsSource, null, state.years[state.agentsSource]);
      return state;
    }

    // --- Milestones (State of the Art) and the capability gauge --------------------
    // Milestones are placed by date. At each transition (after a Choice), the Event, if
    // one happens, and every milestone not yet passed that is dated no later than the
    // next card are shown in date order, the Event first on a tie. A milestone appears
    // only if the game at that moment meets its Condition; of milestones sharing a Slot,
    // only the first to qualify appears. After a tipping point, milestones pass silently.
    // Effects apply as each appears. A milestone whose Gauge names a level moves the gauge
    // there; "hold" leaves it where it is.

    var SOTA = (story.sota || []).slice().sort(function (a, b) { return a.year - b.year; }); // stable: file order on ties
    // "reached sota-robots" also holds once a milestone that Counts as it is reached
    // (sota-robots-late).
    function isReached(reached, id) {
      for (var i = 0; i < reached.length; i++) {
        if (reached[i] === id || (byId[reached[i]] && byId[reached[i]].countsAs === id)) return true;
      }
      return false;
    }
    // v5.7: the world's pace, from the milestones reached (in the order they came): racing
    // by default, paced once a pace Choice has set `paced`, then whatever the latest
    // milestone with a Sets pace says (held, leveled, beyond, or racing again when a pause
    // is lifted). Cards test it with "pace is held" so a racing card never reads in a held world.
    // v5.9: held at the line or leveled off, as the world stands now.
    function slowWorld(state) {
      var p = paceOf(state.reached, state.flags);
      return p === "held" || p === "leveled";
    }
    function paceOf(reached, flags) {
      var p = flags && flags.paced ? "paced" : "racing";
      reached.forEach(function (id) { var a = byId[id]; if (a && a.setsPace) p = a.setsPace; });
      return p;
    }
    var LEVELS = (S.gaugeLevels || []).map(function (l) { return l.toLowerCase(); });
    var GAUGE_START = Math.max(0, LEVELS.indexOf(String(S.gaugeStart || "").toLowerCase()));

    function gaugeLevel(item) {
      var i = LEVELS.indexOf(String(item.gauge || "").toLowerCase());
      return i; // -1 for hold
    }

    // The steps of a transition, in order, worked out on a copy of `state` (already
    // after the Choice). `event` may be null; `untilYear` is the next card's year
    // (Infinity before the Future); `round` is the next round's start step (or null).
    // Steps: { kind: "event", event }, { kind: "milestone", item } (it appears), { kind:
    // "skip", item } (its Condition isn't met, or its Slot is filled: passed silently, never
    // reconsidered) and, last, { kind: "round", round, drift }.
    // The milestones (and the Event) up to `untilYear`, resolved on a copy of `state`:
    // { sim, steps }. Used for the transition itself and, before a card is drawn, to know
    // the capability at that card's date (capabilityAt).
    function resolveTo(state, event, untilYear) {
      var sim = clone(state);
      var pending = SOTA.filter(function (a) { return !sim.done[a.id] && a.year <= untilYear; });
      var queue = pending.map(function (a) { return { kind: "milestone", item: a, year: a.year }; });
      if (event) {
        // The Event goes before any milestone dated the same year or later.
        var at = 0;
        while (at < queue.length && queue[at].year < event.year) at++;
        queue.splice(at, 0, { kind: "event", event: event, year: event.year });
      }
      var steps = queue.map(function (step) {
        if (step.kind === "event" && step.event.versions && step.event.versions.length) step = { kind: "event", event: versioned(sim, step.event), year: step.year };
        if (step.kind === "milestone") {
          var a = step.item;
          // After a tipping point, only the milestones its beat lists still happen.
          var passed = sim.flags.after_humanity && !(sim.tipping && sim.tipping.milestones.indexOf(a.id) !== -1);
          if ((a.slot && sim.slots[a.slot]) || passed || !holds(sim, a.condition)) step = { kind: "skip", item: a };
        }
        applyStep(sim, step);
        return step;
      });
      return { sim: sim, steps: steps };
    }

    // v5.7: a milestone marked Shown: always is never made quiet (later cards assume it).
    function transitionSteps(state, event, untilYear, round) {
      return chooseShown(state, event, untilYear, round).map(function (v) {
        v.steps = v.steps.map(function (s) { return s.kind === "quiet" && s.item.alwaysShown ? { kind: "milestone", item: s.item } : s; });
        return v;
      });
    }
    function chooseShown(state, event, untilYear, round) {
      var steps = resolveTo(state, event, untilYear).steps;
      if (round) steps.push(round);
      // Between two cards, the milestones that move the gauge are shown (v5.4: all of them;
      // before, only the last), or, if none does, any one of them, equally likely. Any others reached in
      // the same stretch still happen (their Effects, Slot and gauge level apply) but
      // quietly: never shown or logged. Returns the ways it can go: [{ p, steps }].
      // At most one slowdown is shown per game: later ones, and any that share a stretch
      // with a milestone that moves the gauge, are quiet.
      // v5.2: the game's first slowdown is never hidden (the cards that follow it assume the
      // player saw it). It is shown even beside a milestone that moves the gauge, so such a
      // stretch can show two: the mover, then the slowdown.
      var reached = steps.filter(function (s) { return s.kind === "milestone"; });
      var firstSlow = state.slowShown ? null : reached.filter(function (x) { return x.item.slowdown; })[0] || null;
      steps = steps.map(function (s) {
        return s.kind === "milestone" && s.item.slowdown && s !== firstSlow ? { kind: "quiet", item: s.item } : s;
      });
      var shown = steps.filter(function (s) { return s.kind === "milestone"; });
      if (shown.length < 2) return [{ p: 1, steps: steps }];
      var movers = shown.filter(function (s) { return gaugeLevel(s.item) !== -1; });
      // v5.4: every milestone that moves the gauge is shown (recursive self-improvement, then
      // superintelligence, can share a stretch), with the first slowdown beside them.
      // v5.8: the others pass quietly beside them (Shown: always ones are shown anyway, in
      // transitionSteps), so a stretch never crowds the gauge.
      if (movers.length) {
        return [{ p: 1, steps: steps.map(function (s) { return s.kind === "milestone" && movers.indexOf(s) === -1 && s !== firstSlow ? { kind: "quiet", item: s.item } : s; }) }];
      }
      var keeps = firstSlow ? [firstSlow] : shown;
      return keeps.map(function (keep) {
        return {
          p: 1 / keeps.length,
          steps: steps.map(function (s) { return s.kind === "milestone" && s !== keep && s !== firstSlow ? { kind: "quiet", item: s.item } : s; })
        };
      });
    }

    function applyStep(state, step) {
      if (step.kind === "event") return applyEvent(state, step.event);
      if (step.kind === "round") return startRound(state, step);
      var a = step.item;
      state.done[a.id] = true;
      if (step.kind === "skip") return state;
      if (a.slot) state.slots[a.slot] = true;
      state.values = applyEffects(state.values, counted(state, a.effects), a.weight);
      var lvl = gaugeLevel(a);
      if (lvl !== -1) state.gauge = lvl;
      state.reached.push(a.id); // shown or quiet: both bend the capability curve
      if (step.kind !== "quiet") {
        var because = pickLineAt(state, a.because || [], null);
        state.log.push({ kind: "sota", item: a, round: state.round - 1, why: because.text, cite: because.cite });
        if (a.slowdown) state.slowShown = true;
      }
      return state;
    }

    // "{year}" in a sentence becomes the date of the most recent decision its condition
    // names (the year the player made it), so a line can say "the cap you signed in 2039".
    function fillYear(state, text, terms) {
      if (!text || text.indexOf("{year}") === -1) return text;
      var best = null, bestAge = Infinity;
      flagsIn(terms).forEach(function (f) {
        if (!state.flags[f] || state.years[f] == null) return;
        var a = age(state, f);
        if (best == null || a < bestAge) { best = state.years[f]; bestAge = a; }
      });
      return best == null ? text.replace(/\s*\{year\}/g, "") : text.replace(/\{year\}/g, String(best));
    }

    // The capability curve's bends, for the gauge: [{ year, pace }]. Each milestone reached
    // (shown or quiet) multiplies the pace from its date by its Pace (rising by its Growth each
    // year after, for recursive self-improvement), and (v5.4) each major
    // Choice, one whose Brake is at least 1 either way, by 1 - Gauge brake pace × its Brake
    // (0.5 to 1.5), and by 0.85 more if it sets restraint or pause. So racing steepens the
    // projection and braking flattens it, and minor decisions leave it alone.
    function gaugeBends(state) {
      var out = [];
      // A slowdown ends any growth that came before it (a pause stops self-improvement).
      var slowYears = state.reached.map(function (id) { return byId[id]; }).filter(function (a) { return a && a.slowdown; }).map(function (a) { return a.year; });
      state.reached.forEach(function (id) {
        var a = byId[id];
        if (!a) return;
        var stop = Math.min.apply(null, slowYears.filter(function (y) { return y > a.year; }).concat([Infinity]));
        out.push({ year: a.year, pace: a.pace || 1, growth: a.growth || 0, until: stop });
      });
      state.log.forEach(function (e) {
        if (e.kind !== "choice" || Math.abs(e.choice.brake || 0) < 1) return;
        var p = 1 - S.gaugeBrakePace * e.choice.brake;
        if (e.choice.sets.indexOf("restraint") !== -1 || e.choice.sets.indexOf("pause") !== -1) p *= 0.85;
        out.push({ year: e.scenario.year, pace: Math.max(0.5, Math.min(1.5, p)) });
      });
      return out;
    }

    // The capability curve: heights from 0 to 1 at `steps` + 1 evenly spaced years over Gauge
    // years, on a log scale. The pace follows Gauge pace (the real trend) bent by
    // gaugeBends(state); pass no state for the world as it is now (Home). The trend alone
    // reaches Gauge trend height by the last year. v5.6: there is no ceiling. A runaway curve
    // rises above 1 and leaves the top of the chart (the UI clips it and marks where), because
    // flattening it would show a plateau no decision caused. With the default 256 steps over 64 years every whole year is a sample, and
    // bends start on whole years, so a bend never changes the curve before its own year: the
    // filled part of the graph (the past) never moves, only the projection.
    function gaugeHeights(state, steps) {
      steps = steps || 256;
      var y0 = S.gaugeYears[0], y1 = S.gaugeYears[1];
      var bends = state ? gaugeBends(state) : [];
      function pace(year, withBends) {
        var p = 1;
        S.gaugePace.forEach(function (k) { if (year >= k.year) p = k.pace; });
        if (withBends) bends.forEach(function (a) { if (year >= a.year) p *= a.pace * Math.pow(1 + (a.growth || 0), Math.min(year, a.until || Infinity) - a.year); });
        return p;
      }
      function climb(withBends) {
        var L = 0, out = [0], dy = (y1 - y0) / steps;
        for (var i = 1; i <= steps; i++) { L += pace(y0 + (i - 0.5) * dy, withBends) * dy; out.push(L); }
        return out;
      }
      var ref = climb(false)[steps] / S.gaugeTrendHeight;
      return climb(true).map(function (L) { return 0.03 + 0.94 * (L / ref); });
    }

    // v5.6: what the gauge expects next if nothing else changes, for its dropdown. The
    // milestones still to come up to `untilYear` are resolved on a copy, exactly as the game
    // would show them with no further Choices: { next: [{ item, text }] (the next milestones
    // that move the gauge or slow AI, at most two, each with its Ahead line), status }.
    // status says where AI stands when nothing moving is left: "beyond" (superintelligence),
    // "held" (a pause holds it), "level" (it leveled off) or "steady".
    function outlook(state, untilYear) {
      var steps = resolveTo(state, null, untilYear).steps;
      var next = steps.filter(function (x) {
        return x.kind === "milestone" && (gaugeLevel(x.item) !== -1 || x.item.slowdown);
      }).slice(0, 2).map(function (x) {
        return { item: x.item, text: pickLine(state, x.item.ahead || [], null) };
      });
      var pace = paceOf(state.reached, state.flags);
      var status = pace === "held" ? "held" : pace === "leveled" ? "level" : pace === "beyond" ? "beyond" : "steady";
      return { next: next, status: status };
    }

    // Every way the transition after a Choice can go, with its probability:
    // [{ p, event, next: { scenario, lead, fresh, safety } or null, steps }]. The Event is
    // rolled first; the next round starts (era drift, the Agents arc); the next card is
    // drawn with the game as it stands then; the milestones up to that card's date follow.
    // After the last round there's no next card, and the remaining milestones are shown.
    function transitionOdds(state) {
      var out = [];
      eventOdds(state).forEach(function (eo) {
        if (!eo.p) return;
        var after = clone(state);
        if (eo.event) applyEvent(after, eo.event);
        if (isOver(state)) {
          transitionSteps(state, eo.event, Infinity, null).forEach(function (v) {
            out.push({ p: eo.p * v.p, event: eo.event, next: null, steps: v.steps });
          });
          return;
        }
        var rs = roundStep(after);
        startRound(after, rs);
        after.capBase = { state: state, event: eo.event };
        var so = scenarioOdds(after);
        so.odds.forEach(function (o) {
          if (!o.p) return;
          var shownCard = o.scenario.versions && o.scenario.versions.length ? versioned(after, o.scenario, capabilityAt(after, o.scenario.year)) : o.scenario;
          var next = { scenario: shownCard, lead: openerFor(after, o.scenario), fresh: so.fresh, safety: so.safety };
          transitionSteps(state, eo.event, o.scenario.year, rs).forEach(function (v) {
            out.push({ p: eo.p * o.p * v.p, event: eo.event, next: next, steps: v.steps });
          });
        });
      });
      return out;
    }

    // Plan the transition after a Choice (one random draw). Returns { event, next, steps }.
    // The UI then shows the steps in order, calling applyStep() for each as it appears,
    // and draws `next` (null after the last round).
    function planTransition(state, rng) {
      var o = sample(transitionOdds(state), rng);
      return { event: o.event, next: o.next, steps: o.steps };
    }

    // v5.3: How we got here for The Long Middle. The latest decision pulling toward each of the
    // two Futures the game came closest to (by leaders), in the order they happened, then
    // UI TEXT → Long Middle looking back ("They pulled in different directions…").
    function pulledApart(state) {
      var picks = [];
      leaders(state).some(function (l) {
        var g = grounding(state, l.future);
        var m = g[g.length - 1];
        if (m && !picks.some(function (p) { return p.key === m.key; })) picks.push(m);
        return picks.length >= 2;
      });
      if (picks.length < 2) return [];
      picks.sort(function (x, y) { return x.logIndex - y.logIndex; });
      var close = story.ui && story.ui["Long Middle looking back"];
      if (close) picks.push({ text: close, key: null, round: null, logIndex: Infinity });
      return picks;
    }

    function isOver(state) { return state.round > ROUNDS; }

    // v5.3: a Future's stories that fit this game's world (their When holds), so a story never
    // contradicts the AI the player saw. If none fits, every story (check-story fails on that).
    function storiesFor(state, future) {
      var fit = (future.stories || []).filter(function (st) { return holds(state, st.when); });
      return fit.length ? fit : (future.stories || []);
    }
    // v6.0: how strongly this game's own path points to a story: over its Drawn by entries the
    // game has set, each strength × Continuity decay ^ rounds since (as cards' Follows count).
    function storyPull(state, st) {
      return (st.drawnBy || []).reduce(function (n, x) {
        return state.flags[x.flag] ? n + x.w * Math.pow(S.continuityDecay || 1, Math.max(0, age(state, x.flag))) : n;
      }, 0);
    }
    // v6.0: the story to tell. Of the stories that fit the world, the one with Drawn by that the
    // game points to most (at least Story pull minimum), ties broken away from `last` (the
    // index shown last time); if none reaches it, one of the others at random, avoiding `last`.
    function chooseStory(state, future, last, rng) {
      rng = rng || random;
      var all = future.stories || [];
      var fit = storiesFor(state, future);
      var drawn = fit.filter(function (st) { return st.drawnBy && st.drawnBy.length; })
        .map(function (st) { return { st: st, pull: storyPull(state, st) }; })
        .filter(function (x) { return x.pull >= (S.storyPullMin || 1); })
        .sort(function (a, b) { return b.pull - a.pull; });
      if (drawn.length) {
        // The strongest, unless it was told last time and another comes close (three
        // quarters of its pull), so a player who replays a similar path hears someone new.
        var close = drawn.filter(function (x) { return x.pull >= drawn[0].pull * 0.75; });
        var keep = close.filter(function (x) { return all.indexOf(x.st) !== last; });
        return (all.indexOf(drawn[0].st) !== last || !keep.length ? drawn[0] : keep[0]).st;
      }
      var rest = fit.filter(function (st) { return !(st.drawnBy && st.drawnBy.length); });
      var list = rest.length ? rest : fit;
      var n = list.length;
      if (!n) return null;
      var i = Math.floor(rng() * n);
      if (n > 1 && all.indexOf(list[i]) === last) i = (i + 1 + Math.floor(rng() * (n - 1))) % n;
      return list[i];
    }
    // v5.8: a story's paragraphs as this game reads them: its Text, then its Ending line
    // (picked like an opener) if it has one.
    function storyText(state, st) {
      var end = st.ending && st.ending.length ? pickLine(state, st.ending) : "";
      var text = st.text;
      // v6.0: a paragraph that is just "{world}" is the World line that fits this game.
      if (st.world && st.world.length) {
        var w = pickLine(state, st.world);
        text = text.map(function (p) { return p.trim() === "{world}" ? w : p; }).filter(function (p) { return p; });
      }
      return end ? text.concat([end]) : text;
    }

    // The final Future. Going down the Futures from nearest to furthest (by the scaled
    // Values), the first one that is within the threshold, meets all its Requires AND is
    // grounded: at least one of its Grounded by Choices, Events or tipping beats happened
    // in this game. Otherwise the fallback (The Long Middle).
    // After a tipping point: a Future that requires after_humanity, if the game meets its
    // Requires and it's grounded (Overgrowth), whatever the distance; otherwise the Future
    // of the disaster (the beat's Future). The Long Middle never follows a tipping point.
    // Returns { future, ranked, grounding: [matches, in order], lookingBack: [one or two] }.
    function chooseFuture(state) {
      var values = scaled(state);
      var r = ranked(values);
      function result(f) {
        var g = grounding(state, f);
        return { future: f, ranked: r, grounding: g, lookingBack: lookingBack(g, f, state) };
      }
      if (state.flags.after_humanity && state.tipping) {
        for (var a = 0; a < r.length; a++) {
          if (AFTER.indexOf(r[a].future) === -1 || !meets(state, r[a].future)) continue;
          if (grounding(state, r[a].future).length) return result(r[a].future);
        }
        return result(futureById(state.tipping.future) || FALLBACK);
      }
      // v5.2: of the Futures within the threshold that meet their Requires and are grounded by
      // a collection of decisions (wellGrounded), the one with the lowest distance − Future
      // pull × pull: where the game's recent decisions were heading, not only the nearest.
      var best = null;
      for (var i = 0; i < r.length; i++) {
        if (r[i].distance > S.longMiddleThreshold || !meets(state, r[i].future)) continue;
        var g = grounding(state, r[i].future);
        if (!g.length || !wellGrounded(g, r[i].distance)) continue;
        var sc = r[i].distance - S.futurePull * pull(state, r[i].future, g);
        if (!best || sc < best.score) best = { future: r[i].future, score: sc };
      }
      if (best) return result(best.future);
      return { future: FALLBACK || (r[0] && r[0].future), ranked: r, grounding: [], lookingBack: pulledApart(state) };
    }

    return {
      story: story,
      seed: SEED,
      random: random,
      VALUE_IDS: VALUE_IDS,
      ROUNDS: ROUNDS,
      distance: distance,
      applyEffects: applyEffects,
      scaled: scaled,
      holds: holds,
      meets: meets,
      grounding: grounding,
      lookingBack: lookingBack,
      transitionOdds: transitionOdds,
      planTransition: planTransition,
      applyStep: applyStep,
      gaugeBends: gaugeBends,
      gaugeHeights: gaugeHeights,
      outlook: outlook,
      paceOf: function (state) { return paceOf(state.reached, state.flags); },
      leaders: leaders,
      GAUGE_START: GAUGE_START,
      shuffle: shuffle,
      newGame: newGame,
      onSpine: onSpine,
      pool: pool,
      scenarioOdds: scenarioOdds,
      selectScenario: selectScenario,
      choose: choose,
      likelihood: likelihood,
      isOver: isOver,
      storiesFor: storiesFor,
      chooseStory: chooseStory,
      storyText: storyText,
      chooseFuture: chooseFuture,
      cardById: cardById
    };
  };
});
