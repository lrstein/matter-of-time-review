// A Matter of Time — story parser.
// Reads content/story.md (the single source of every word in the game) into a
// plain object, and validates it. Used by the browser (window.StoryParser) and by
// Node tools (require("./js/story-parser.js")). No DOM, no dependencies.
//
// Format, in short:
//   # SECTION            sections: SCALE, SETTINGS, UI TEXT, ABOUT, HISTORY TIMELINE, VALUES,
//                        IMAGE STYLE GUIDE, ROUND 1..n, EVENTS, STATE OF THE ART,
//                        TIPPING POINTS, FUTURES (others ignored)
//   ## id                an item: a Value, Scenario, Event, milestone, tipping beat or Future
//   ### Choice A         a Choice inside a Scenario
//   ### Story 1          a story inside a Future, with Image, Image description and Text
//   **Label:** value     a field; continues until the next label, heading or ---
//   (a line wholly in brackets, inside a field, is an editor's note and is skipped)
//   [words](https://…)   a link inside player-facing text; kept as written, rendered by the UI
//
// Conditions (Appears when, Openers, Requires, Condition, Likelihood, Tipping point) are
// comma-separated terms, all of which must hold:
//   power >= 2, unity <= 0     a Value (also year, round and agents)
//   flag drones_built          a flag set earlier in the game (a Choice's own flag is
//                              "card-id/Letter", an Event's or tipping beat's is its id)
//   not flag pause             a flag that hasn't been set
//   last flag r2-grid/C        set by the most recent Choice or the Event after it
//   any flag a, b, c           at least one of these (the list runs on to the next term
//                              that isn't a bare flag name)
//   default                    (Openers only) the fallback lead-in

(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) module.exports = factory();
  else root.StoryParser = factory();
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  var VALUE_NAMES = ["power", "control", "handover", "unity", "reality", "equality"];
  // Besides the Values, conditions can test these numbers about the game so far.
  var GAME_NUMBERS = ["year", "round", "agents", "brakes"];
  var TIPPING_TYPES = ["war", "collapse", "runaway"];
  var FLAG_RE = /^[A-Za-z0-9_][A-Za-z0-9_\-\/]*$/;
  var MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };

  // v5.4: Versions. A Scenario or Event can hold "### Version" sub-items, each with a When
  // (conditions, like a Future story's) and any of Headline, Timeline label, Place, Summary,
  // Story and Question. The first version whose When holds replaces those fields, so one card
  // can read truly in different worlds without a second card.
  function versionsOf(it, conditions, reporter) {
    return it.subs.filter(function (sub) { return /^Version\b/i.test(sub.name); }).map(function (sub) {
      var f = sub.fields, v = { name: sub.name, when: conditions(oneLine(f["When"]), reporter(it.id + " " + sub.name + " When")), fields: {} };
      if (f["Headline"]) v.fields.headline = oneLine(f["Headline"]);
      if (f["Timeline label"]) v.fields.label = oneLine(f["Timeline label"]);
      if (f["Place"]) v.fields.place = oneLine(f["Place"]);
      if (f["Summary"]) v.fields.summary = paragraphs(rawText(f["Summary"]));
      if (f["Story"]) v.fields.story = paragraphs(rawText(f["Story"]));
      if (f["Question"]) v.fields.question = oneLine(f["Question"]);
      return v;
    });
  }

  // --- Low level: lines into sections, items, sub-items and fields ------------

  // Returns [{ name, fields, items: [{ id, line, fields, subs: [{ name, line, fields, body }] }], lines }]
  // where `fields` maps label -> { raw, line } and `lines` holds a section's loose lines.
  function tokenize(text) {
    var lines = text.replace(/\r\n?/g, "\n").split("\n");
    var sections = [];
    var section = null, item = null, sub = null, field = null;

    function target() { return sub || item || section; }

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var n = i + 1;
      var m;

      if ((m = /^#\s+(.+?)\s*$/.exec(line)) && !/^##/.test(line)) {
        section = { name: m[1].toUpperCase(), line: n, fields: {}, items: [], lines: [] };
        sections.push(section);
        item = sub = field = null;
        continue;
      }
      if (!section) continue;
      if ((m = /^##\s+(.+?)\s*$/.exec(line)) && !/^###/.test(line)) {
        item = { id: m[1], line: n, fields: {}, subs: [] };
        section.items.push(item);
        sub = field = null;
        continue;
      }
      if ((m = /^###\s+(.+?)\s*$/.exec(line))) {
        sub = { name: m[1], line: n, fields: {}, body: [] };
        if (item) item.subs.push(sub);
        field = null;
        continue;
      }
      if (/^\s*---+\s*$/.test(line)) { field = null; continue; }
      if ((m = /^\*\*([^*]+?):\*\*\s?(.*)$/.exec(line))) {
        field = { raw: [m[2]], line: n };
        target().fields[m[1].trim()] = field;
        continue;
      }
      if (field) {
        if (/^\s*\(.*\)\s*$/.test(line)) continue; // editor's note
        field.raw.push(line);
        continue;
      }
      if (sub) sub.body.push(line);
      else if (!item) section.lines.push(line);
    }
    return sections;
  }

  function rawText(field) { return field ? field.raw.join("\n").trim() : ""; }

  // Paragraphs: split on blank lines; lines within a paragraph are joined with spaces.
  function paragraphs(str) {
    return str.split(/\n\s*\n/).map(function (p) {
      return p.split("\n").map(function (l) { return l.trim(); }).join(" ").trim();
    }).filter(Boolean);
  }

  function oneLine(field) { return paragraphs(rawText(field)).join(" "); }

  // "- a | b" list lines of a field: [{ left, right, line }]
  function listLines(field) {
    if (!field) return [];
    var out = [];
    field.raw.forEach(function (l) {
      var m = /^\s*[-*]\s+(.*?)\s*$/.exec(l);
      if (!m) return;
      var bar = m[1].indexOf("|");
      out.push(bar === -1 ? { left: m[1].trim(), right: "" } : { left: m[1].slice(0, bar).trim(), right: m[1].slice(bar + 1).trim() });
    });
    return out;
  }

  function num(str) { return parseFloat(String(str).replace(/\s/g, "").replace("−", "-")); }

  // --- Conditions ------------------------------------------------------------
  // "flag a, not flag b, power >= 2" -> [{ type: "flag", flag: "a" }, { type: "flag", flag: "b", not: true },
  // { type: "value", id: "power", op: ">=", value: 2 }]. `problem(message)` reports what can't be read.
  function conditions(str, problem, opts) {
    opts = opts || {};
    var out = [];
    str = String(str || "").trim();
    if (!str || /^[(\[]/.test(str)) return out; // (none)
    var any = null;
    str.split(",").forEach(function (part) {
      part = part.trim();
      if (!part) return;
      var m;
      if (any && FLAG_RE.test(part) && !/^(default|flag|not|last|any)$/i.test(part)) { any.flags.push(part); return; }
      any = null;
      if (/^default$/i.test(part) && opts.openers) { out.push({ type: "default" }); return; }
      if ((m = /^any\s+(last\s+)?flags?\s+(\S+)$/i.exec(part)) && FLAG_RE.test(m[2])) { any = { type: "any", flags: [m[2]], last: !!m[1] }; out.push(any); return; }
      if ((m = /^(not\s+|last\s+)?flag\s+(\S+)$/i.exec(part)) && FLAG_RE.test(m[2])) {
        var t = { type: "flag", flag: m[2] };
        if (m[1] && /not/i.test(m[1])) t.not = true;
        if (m[1] && /last/i.test(m[1])) t.last = true;
        out.push(t);
        return;
      }
      // Capability at the card's date: "capability >= AGI" (a Gauge level name).
      if ((m = /^capability\s*(>=|<=|≥|≤)\s*([A-Za-z][A-Za-z ]*)$/i.exec(part))) {
        out.push({ type: "cap", op: m[1] === "≥" ? ">=" : m[1] === "≤" ? "<=" : m[1], level: m[2].trim() });
        return;
      }
      // A milestone reached by the card's date (shown or quiet): "reached sota-robots".
      if ((m = /^(not\s+)?reached\s+(\S+)$/i.exec(part)) && FLAG_RE.test(m[2])) {
        out.push({ type: "reached", id: m[2], not: !!m[1] });
        return;
      }
      // v5.7: the world's pace at the card's date: "pace is held", "pace not racing"
      // (racing, paced, held, leveled, beyond; see the milestones' Sets pace).
      if ((m = /^pace\s+(is|not)\s+([a-z]+)$/i.exec(part))) {
        out.push({ type: "pace", pace: m[2].toLowerCase(), not: /not/i.test(m[1]) });
        return;
      }
      if ((m = /^([a-zA-Z]+)\s*(>=|<=|≥|≤)\s*([+-−]?\s*\d+(?:\.\d+)?)$/.exec(part))) {
        var name = m[1].toLowerCase();
        if (VALUE_NAMES.indexOf(name) === -1 && GAME_NUMBERS.indexOf(name) === -1) {
          problem('unknown Value "' + m[1] + '" (use ' + VALUE_NAMES.concat(GAME_NUMBERS).join(", ") + ")");
          return;
        }
        out.push({ type: "value", id: name, op: m[2] === "≥" ? ">=" : m[2] === "≤" ? "<=" : m[2], value: num(m[3]) });
        return;
      }
      problem('can\'t read "' + part + '" (expected something like "unity >= 1", "flag pause", "not flag pause" or "any flag a, b")');
    });
    return out;
  }

  // Every flag a condition list mentions: ["a", "b", …]
  function flagsIn(terms) {
    var out = [];
    (terms || []).forEach(function (t) {
      if (t.type === "flag") out.push(t.flag);
      if (t.type === "any") out.push.apply(out, t.flags);
    });
    return out;
  }

  // "3", "3-4" or "3, 5" -> [3] / [3, 4] / [3, 5]
  function roundList(str) {
    var out = [];
    String(str || "").split(",").forEach(function (part) {
      var m = /^\s*(\d+)\s*(?:-|–|to)\s*(\d+)\s*$/.exec(part);
      if (m) { for (var r = +m[1]; r <= +m[2]; r++) out.push(r); return; }
      m = /^\s*(\d+)\s*$/.exec(part);
      if (m) out.push(+m[1]);
    });
    return out;
  }

  function yes(field) { return /^(yes|true)$/i.test(oneLine(field)); }
  // "Follows": "r3-policing/B 1, r1-election/B 0.5, truth 0.2" -> [{ flag, w }] (w defaults to 1).
  function follows(field, id) {
    return list(field).map(function (x) {
      var mm = /^(\S+)(?:\s+([0-9.]+))?$/.exec(x);
      if (!mm || !FLAG_RE.test(mm[1]) || (mm[2] && isNaN(parseFloat(mm[2])))) { problem(id, 'can\'t read Follows "' + x + '" (expected "r3-policing/B 1")'); return null; }
      return { flag: mm[1], w: mm[2] ? parseFloat(mm[2]) : 1 };
    }).filter(Boolean);
  }
  var SCALES = ["local", "national", "bloc", "world"];
  function scale(field, id) {
    var v = oneLine(field).toLowerCase();
    if (!v) return -1;
    var i = SCALES.indexOf(v);
    if (i === -1) problem(id, 'Scale "' + v + '" isn\'t one of ' + SCALES.join(", "));
    return i;
  }
  function list(field) { return oneLine(field).split(",").map(function (x) { return x.trim(); }).filter(function (x) { return x && !/^[(\[]/.test(x); }); }

  // --- Parsing ---------------------------------------------------------------

  function parse(text) {
    var problems = [];
    function problem(id, message) { problems.push({ id: id, message: message }); }
    function reporter(id) { return function (message) { problem(id, message); }; }

    var story = {
      settings: {},
      ui: {},
      about: { heading: "", text: [], signature: "" },
      history: [],
      values: [],
      imageStyle: "",
      scenarios: [],
      events: [],
      sota: [],
      tipping: [],
      futures: [],
      rounds: 0,
      problems: problems
    };

    // "power +1, control -2" -> { power: 1, control: -2 }
    function effects(str, id) {
      var out = {};
      if (!str || /^[(\[]/.test(str)) return out; // (none)
      str.split(",").forEach(function (part) {
        part = part.trim();
        if (!part) return;
        var m = /^([a-zA-Z]+)\s*([+-−]?\s*\d+(?:\.\d+)?)$/.exec(part);
        if (!m) { problem(id, 'can\'t read "' + part + '" (expected something like "power +1")'); return; }
        var name = m[1].toLowerCase();
        if (VALUE_NAMES.indexOf(name) === -1) { problem(id, 'unknown Value "' + m[1] + '" (use ' + VALUE_NAMES.join(", ") + ")"); return; }
        out[name] = (out[name] || 0) + num(m[2]);
      });
      return out;
    }

    // Optional Weight (default 1). On a Scenario or Event it makes the card likelier to be
    // drawn; on a milestone it multiplies the Effects.
    function weight(field, id) {
      var w = oneLine(field);
      if (!w) return 1;
      var n = parseFloat(w);
      if (isNaN(n) || n < 0) { problem(id, 'Weight "' + w + '" isn\'t a number'); return 1; }
      return n;
    }

    function pace(field, id) {
      var w = oneLine(field);
      if (!w) return 1;
      var n = parseFloat(w);
      if (isNaN(n) || n <= 0) { problem(id, 'Pace "' + w + '" isn\'t a positive number'); return 1; }
      return n;
    }

    // Grounded by (Futures): "- r2-glasses/C | sentence" (a Choice) or "- ev-crash | sentence"
    // (an Event or a tipping beat).
    // -> [{ key: "r2-glasses/C", id: "r2-glasses", choice: "C", text }], choice null otherwise.
    function groundedList(field, id) {
      if (!field) return [];
      var list = [];
      field.raw.forEach(function (l) {
        if (!l.trim()) return;
        var m = /^\s*[-*]\s+([^|\/\s]+)(?:\s*\/\s*([A-Za-z]))?\s*(?:\|\s*(.*?))?\s*$/.exec(l);
        if (!m) { problem(id, 'can\'t read Grounded by line "' + l.trim() + '"'); return; }
        var choice = m[2] ? m[2].toUpperCase() : null;
        list.push({ key: m[1] + (choice ? "/" + choice : ""), id: m[1], choice: choice, text: (m[3] || "").trim() });
      });
      return list;
    }

    // Openers: "- last flag r2-grid/C | sentence", "- default | sentence"
    // -> [{ when: [terms], text, isDefault }]
    function openerList(field, id) {
      return listLines(field).map(function (o) {
        var when = conditions(o.left, reporter(id + " Openers"), { openers: true });
        return { when: when.filter(function (t) { return t.type !== "default"; }), text: o.right, isDefault: when.some(function (t) { return t.type === "default"; }) };
      });
    }

    // Likelihood: "base 0.15; +0.10 if equality <= -2; -0.05 if flag drone_ban"
    // -> { base, mods: [{ delta, when: [terms] }] }
    function likelihood(field, id) {
      var str = oneLine(field);
      if (!str) return null;
      var out = { base: 0, mods: [] };
      str.split(";").forEach(function (part) {
        part = part.trim();
        if (!part) return;
        var m;
        if ((m = /^base\s+([+-]?\d*\.?\d+)$/i.exec(part))) { out.base = parseFloat(m[1]); return; }
        if ((m = /^([+-−]\s*\d*\.?\d+)\s+if\s+(.+)$/i.exec(part))) {
          out.mods.push({ delta: num(m[1]), when: conditions(m[2], reporter(id + " Likelihood")) });
          return;
        }
        problem(id, 'can\'t read Likelihood "' + part + '" (expected "base 0.15" or "+0.10 if unity <= -2")');
      });
      return out;
    }

    function image(fields) {
      return { image: oneLine(fields["Image"]) || null, imageDescription: oneLine(fields["Image description"]) };
    }

    tokenize(text).forEach(function (sec) {
      var m;
      var name = sec.name;

      if (name === "SETTINGS") {
        Object.keys(sec.fields).forEach(function (k) {
          var v = oneLine(sec.fields[k]);
          // A number only if the whole value is one ("2000, 2070" stays text).
          story.settings[k] = /^-?\d+(\.\d+)?$/.test(v.trim()) ? parseFloat(v) : v;
        });
      } else if (name === "ABOUT") {
        story.about = { heading: oneLine(sec.fields["Heading"]), text: paragraphs(rawText(sec.fields["Text"])), signature: oneLine(sec.fields["Signature"]) };
      } else if (name === "UI TEXT") {
        Object.keys(sec.fields).forEach(function (k) { story.ui[k] = oneLine(sec.fields[k]); });
      } else if (name === "HISTORY TIMELINE") {
        sec.lines.forEach(function (l) {
          var mm = /^\s*[-*]\s+(.*)$/.exec(l);
          if (!mm) return;
          var parts = mm[1].split("|").map(function (s) { return s.trim(); });
          if (parts.length < 3) { problem("HISTORY TIMELINE", 'can\'t read "' + l.trim() + '" (expected Date | Title | Line | URL)'); return; }
          story.history.push({ date: parts[0], when: whenOf(parts[0]), title: parts[1], line: parts[2], source: parts[3] || "", strip: parts[4] || "" });
        });
      } else if (name === "VALUES") {
        sec.items.forEach(function (it) {
          var f = it.fields;
          story.values.push({
            id: it.id, name: oneLine(f["Name"]) || it.id, color: oneLine(f["Color"]),
            left: oneLine(f["Left"]), right: oneLine(f["Right"]),
            leftMeans: oneLine(f["Left means"]), rightMeans: oneLine(f["Right means"]), why: oneLine(f["Why it matters"]),
            // v5.6: why this Value stopped mattering, shown on the results after a tipping point.
            afterTipping: oneLine(f["After the tipping point"])
          });
        });
      } else if (name === "IMAGE STYLE GUIDE") {
        story.imageStyle = rawText(sec.fields["Style guide"]);
      } else if ((m = /^ROUND\s+(\d+)$/.exec(name))) {
        // A round section only groups cards for editing; a card's **Round:** field says
        // which rounds it can appear in (the section's round if it has none).
        var section = +m[1];
        story.rounds = Math.max(story.rounds, section);
        sec.items.forEach(function (it) {
          var f = it.fields;
          var rounds = f["Round"] ? roundList(oneLine(f["Round"])) : [section];
          var s = {
            kind: "scenario", id: it.id, section: section, line: it.line,
            rounds: rounds, round: rounds[0] || section,
            headline: oneLine(f["Headline"]), label: oneLine(f["Timeline label"]),
            date: oneLine(f["Date"]), year: yearOf(oneLine(f["Date"])), place: oneLine(f["Place"]),
            summary: paragraphs(rawText(f["Summary"])),
            story: paragraphs(rawText(f["Story"])), question: oneLine(f["Question"]),
            weight: weight(f["Weight"], it.id),
            appears: conditions(oneLine(f["Appears when"]), reporter(it.id + " Appears when")),
            openers: openerList(f["Openers"], it.id),
            // The topics this card is about: making any Choice on it sets these flags.
            threads: list(f["Threads"]),
            // The decisions that cause this card, with strengths: they drive continuity.
            follows: follows(f["Follows"], it.id),
            // How far its consequences reach: local, national, bloc or world (index 0–3).
            scale: scale(f["Scale"], it.id),
            afterHumanity: yes(f["After humanity"]),
            isNew: !!oneLine(f["Added"]), added: oneLine(f["Added"]) || null,
            choices: [], missing: missing(f, ["Headline", "Timeline label", "Date", "Place", "Summary", "Story", "Question"]),
            versions: versionsOf(it, conditions, reporter)
          };
          if (f["Round"] && !rounds.length) problem(it.id, 'can\'t read Round "' + oneLine(f["Round"]) + '" (expected something like 3 or 3-4)');
          var img = image(f); s.image = img.image; s.imageDescription = img.imageDescription;
          // An agents card is one that needs the agents era (Appears when: flag agents_era).
          s.focus = flagsIn(s.appears.filter(function (t) { return !t.not; })).indexOf("agents_era") !== -1 ? "agents" : null;
          it.subs.forEach(function (sub) {
            var cm = /^Choice\s+(\S+)/i.exec(sub.name);
            if (!cm) return;
            var cf = sub.fields;
            var owner = it.id + " Choice " + cm[1];
            var tip = null, tipRaw = oneLine(cf["Tipping point"]);
            if (tipRaw) {
              var bar = tipRaw.lastIndexOf("|");
              tip = { when: conditions(bar === -1 ? tipRaw : tipRaw.slice(0, bar), reporter(owner + " Tipping point")), type: bar === -1 ? "" : tipRaw.slice(bar + 1).trim().toLowerCase() };
            }
            var agents = oneLine(cf["Agents"]);
            if (agents && isNaN(num(agents))) problem(owner, 'Agents "' + agents + '" isn\'t a number like +1');
            var brake = oneLine(cf["Brake"]);
            if (brake && isNaN(num(brake))) problem(owner, 'Brake "' + brake + '" isn\'t a number like +1');
            s.choices.push({
              label: cm[1], key: it.id + "/" + cm[1].toUpperCase(), text: oneLine(cf["Text"]),
              effects: effects(oneLine(cf["Effects"]), owner),
              sets: oneLine(cf["Sets"]).split(",").map(function (x) { return x.trim(); }).filter(Boolean),
              // Clears: named flags this Choice ends (the cap expiring ends the pause).
              clears: oneLine(cf["Clears"]).split(",").map(function (x) { return x.trim(); }).filter(Boolean),
              agents: agents ? num(agents) || 0 : 0,
              brake: brake ? num(brake) || 0 : 0,
              tipping: tip,
              // v5.6: why this Choice tipped the world over, and what the others would have done ({year}).
              tippingWhy: paragraphs(rawText(cf["Tipping why"])),
              // v6.0: Demands response: the next card must answer this Choice (one of its
              // openers or conditions names it), and no Event comes between them.
              demands: yes(cf["Demands response"]),
              result: paragraphs(rawText(cf["As a result"])),
              missing: missing(cf, ["Text", "Effects", "As a result"])
            });
          });
          story.scenarios.push(s);
        });
      } else if (name === "EVENTS") {
        sec.items.forEach(function (it) {
          var f = it.fields;
          // Round: the rounds after whose Choice it can happen (v4.1 called this After round).
          var rounds = roundList(oneLine(f["Round"] || f["After round"]));
          var e = {
            kind: "event", id: it.id, line: it.line,
            rounds: rounds,
            headline: oneLine(f["Headline"]), label: oneLine(f["Timeline label"]),
            date: oneLine(f["Date"]), year: yearOf(oneLine(f["Date"])), place: oneLine(f["Place"]),
            effects: effects(oneLine(f["Effects"]), it.id),
            weight: weight(f["Weight"], it.id),
            appears: conditions(oneLine(f["Appears when"]), reporter(it.id + " Appears when")),
            likelihood: likelihood(f["Likelihood"], it.id),
            sets: oneLine(f["Sets"]).split(",").map(function (x) { return x.trim(); }).filter(Boolean),
            threads: list(f["Threads"]),
            follows: follows(f["Follows"], it.id),
            scale: scale(f["Scale"], it.id),
            brake: oneLine(f["Brake"]) ? num(oneLine(f["Brake"])) || 0 : 0,
            // v5.4: Near miss (war, collapse or runaway): shown, always, right after a near miss
            // of that kind, dated a year after the card. Demands response: the next card must
            // answer it (one of its openers or conditions names this Event).
            nearMiss: oneLine(f["Near miss"]).toLowerCase() || null,
            demands: yes(f["Demands response"]),
            // v6.1: Certain: shown whenever its Appears when holds, like a near miss.
            certain: yes(f["Certain"]),
            isNew: !!oneLine(f["Added"]), added: oneLine(f["Added"]) || null,
            summary: paragraphs(rawText(f["Summary"])),
            story: paragraphs(rawText(f["Story"])),
            missing: missing(f, ["Headline", "Timeline label", "Date", "Place", "Summary", "Story", "Effects"]),
            versions: versionsOf(it, conditions, reporter)
          };
          if (!rounds.length) problem(it.id, "missing Round (the rounds after whose Choice it can happen)");
          var img = image(f); e.image = img.image; e.imageDescription = img.imageDescription;
          story.events.push(e);
        });
      } else if (name === "STATE OF THE ART") {
        // Milestones: never cards. Each appears at its Date, between the cards either side of it.
        sec.items.forEach(function (it) {
          var f = it.fields;
          var a = {
            kind: "sota", id: it.id, line: it.line,
            headline: oneLine(f["Headline"]), label: oneLine(f["Timeline label"]),
            date: oneLine(f["Date"]), year: yearOf(oneLine(f["Date"])), place: "",
            // The capability gauge level this milestone moves to, or "hold" (a gentle pulse).
            gauge: oneLine(f["Gauge"]),
            // How it bends the capability curve: multiplies the curve's pace from its date (default 1).
            pace: pace(f["Pace"], it.id),
            // Growth (v5.4): how much its Pace rises each year after it (recursive
            // self-improvement compounds): 0.05 is 5% a year.
            growth: oneLine(f["Growth"]) ? num(oneLine(f["Growth"])) || 0 : 0,
            definition: oneLine(f["Short definition"]),
            // Items sharing a Slot are alternatives: the first (in date, then file, order) whose Condition is met appears.
            slot: oneLine(f["Slot"]) || null,
            // A slowdown ("Progress steadies"): at most one is shown per game.
            slowdown: yes(f["Slowdown"]),
            // Counts as: another milestone this one stands in for ("reached sota-robots" also
            // holds once sota-robots-late is reached).
            countsAs: oneLine(f["Counts as"]) || null,
            // Sets pace (v5.7): the world's pace from this milestone on (racing, paced, held,
            // leveled or beyond), tested by "pace is held" terms.
            setsPace: (oneLine(f["Sets pace"]) || "").toLowerCase() || null,
            // Shown (v5.7): "always" shows it on the strip even when it shares a stretch
            // with others, because later cards assume the player saw it.
            alwaysShown: /^always$/i.test(oneLine(f["Shown"]) || ""),
            // Because: why it happened, in this game ("- flag r2-datacenter/A | … you approved in {year}.",
            // "- default | …"), chosen like an opener and shown with the Short definition.
            because: openerList(f["Because"], it.id),
            // Ahead (v5.6): what the gauge's dropdown says while this milestone is still to come,
            // in the future tense, chosen like Because ("- flag r2-assisted/A | … in {year} …").
            ahead: openerList(f["Ahead"], it.id),
            condition: conditions(oneLine(f["Condition"]), reporter(it.id + " Condition")),
            effects: effects(oneLine(f["Effects"]), it.id),
            weight: weight(f["Weight"], it.id),
            isNew: !!oneLine(f["Added"]), added: oneLine(f["Added"]) || null,
            happened: paragraphs(rawText(f["What happened"])),
            means: paragraphs(rawText(f["What it means"])),
            life: paragraphs(rawText(f["How life changes"])),
            missing: missing(f, ["Headline", "Timeline label", "Date", "Gauge", "Short definition", "What happened"])
          };
          var img = image(f); a.image = img.image; a.imageDescription = img.imageDescription;
          story.sota.push(a);
        });
      } else if (name === "TIPPING POINTS") {
        // The beat shown in place of "As a result…" when a Choice tips the world over.
        sec.items.forEach(function (it) {
          var f = it.fields;
          story.tipping.push({
            kind: "tipping", id: it.id, line: it.line,
            type: oneLine(f["Type"]).toLowerCase(),
            headline: oneLine(f["Headline"]), label: oneLine(f["Timeline label"]),
            future: oneLine(f["Future"]),
            // Milestones that still happen after this beat (all others pass silently).
            milestones: list(f["Milestones"]),
            text: paragraphs(rawText(f["Text"])),
            // Prevented (v5.6): could it have been stopped. Lines like openers, naming the earlier
            // decision that did most to bring the world to the edge.
            prevented: openerList(f["Prevented"], it.id),
            // Versions (v5.6): the first whose When holds (at the tipping moment) replaces the
            // Text, so the beat agrees with the Future story that follows it.
            versions: it.subs.filter(function (sub) { return /^Version\b/i.test(sub.name); }).map(function (sub) {
              return { name: sub.name, when: conditions(oneLine(sub.fields["When"]), reporter(it.id + " " + sub.name + " When")), text: paragraphs(rawText(sub.fields["Text"])) };
            }),
            isNew: !!oneLine(f["Added"]), added: oneLine(f["Added"]) || null,
            missing: missing(f, ["Type", "Headline", "Timeline label", "Future", "Text", "Prevented"])
          });
        });
      } else if (name === "FUTURES") {
        sec.items.forEach(function (it) {
          var f = it.fields;
          var t = oneLine(f["Targets"]);
          var fut = {
            kind: "future", id: it.id, line: it.line,
            title: oneLine(f["Title"]), tagline: oneLine(f["Tagline"]), accent: oneLine(f["Accent"]) || "#9a9a9a",
            // Text in brackets means no targets: The Long Middle, the fallback Future.
            targets: !t || /^[(\[]/.test(t) ? null : effects(t, it.id + " Targets"),
            // Hard rules the final Values (and flags) must meet for this Future to be given.
            requires: conditions(oneLine(f["Requires"]), reporter(it.id + " Requires")),
            // The decisions and Events that can lead here; at least one must happen in the game.
            grounded: groundedList(f["Grounded by"], it.id + " Grounded by"),
            // What it would take to arrive here (shown in the review documents, not in the game).
            path: paragraphs(rawText(f["Path"])),
            isNew: !!oneLine(f["Added"]), added: oneLine(f["Added"]) || null,
            // Each story has its own card image: { name, image, imageDescription, text: [paragraphs] }.
            stories: it.subs.filter(function (sub) { return /^Story\b/i.test(sub.name); })
              .map(function (sub) {
                var img = image(sub.fields);
                return {
                  name: sub.name, image: img.image, imageDescription: img.imageDescription,
                  // v5.3: When, the world this story belongs to ("not reached sota-asi"); none means any.
                  when: conditions(oneLine(sub.fields["When"]), reporter(it.id + " " + sub.name + " When")),
                  text: paragraphs(sub.fields["Text"] ? rawText(sub.fields["Text"]) : sub.body.join("\n")),
                  // v5.8: Ending, lines like openers; the one that fits this game is the story's
                  // last paragraph, so it can close on a decision the player made.
                  ending: openerList(sub.fields["Ending"], it.id + " " + sub.name + " Ending"),
                  // v6.0: Drawn by, the cards, Choices and Events that lead to this story ("r3-drones 1,
                  // r6-arms/A 2"), like Follows; the story the game's own path points to most is told.
                  drawnBy: follows(sub.fields["Drawn by"], it.id + " " + sub.name + " Drawn by"),
                  // v6.0: World, lines like openers; the one that fits fills the paragraph "{world}",
                  // so one story reads truly whether AI raced, was paced, held or leveled.
                  world: openerList(sub.fields["World"], it.id + " " + sub.name + " World")
                };
              }),
            missing: missing(f, ["Title", "Tagline"])
          };
          story.futures.push(fut);
        });
      }
    });

    var S = story.settings;
    S.longMiddleThreshold = numSetting(S["Long Middle threshold"], 2.2);
    S.eventChance = numSetting(S["Event chance"], 0.35);
    S.bestFitChance = numSetting(S["Best-fit pick chance"], 0.6);
    // How many rounds a game has (default: the highest ROUND section).
    story.rounds = Math.max(1, Math.round(numSetting(S["Rounds"], story.rounds)));
    S.rounds = story.rounds;
    // Each round's years ("2027, 2028-2030, …"): [[2027, 2027], [2028, 2030], …], or [] if not set.
    S.roundYears = String(S["Round years"] || "").split(",").map(function (x) {
      var mm = /^\s*(\d{4})\s*(?:-|–)\s*(\d{4})\s*$/.exec(x) || /^\s*(\d{4})\s*$/.exec(x);
      return mm ? [+mm[1], +(mm[2] || mm[1])] : null;
    }).filter(Boolean);
    // Card selection (see js/engine.js).
    S.bestFitFrom = numSetting(S["Best-fit from round"], 3);
    S.steerFrom = numSetting(S["Steering from round"], 3);
    // v5.5: the cards that ask how fast AI should go (race, pace or pause), and the round by
    // which one must have been asked: in that round, if none has, the pool narrows to them.
    S.paceCards = String(S["Pace cards"] || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean);
    S.paceBy = numSetting(S["Pace question by round"], 0);
    S.pressureCards = String(S["Pressure cards"] || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean);
    S.pressureBy = numSetting(S["Pressure question by round"], 0);
    S.continuityBonus = numSetting(S["Continuity bonus"], 1000);
    // How much an older decision's continuity counts, per round of age (0.5: half as much).
    S.continuityDecay = numSetting(S["Continuity decay"], 0);
    // Round influence: "0.75, 1, 1, 1.25, 1.5, 1.5" multiplies each round's Choice Effects.
    S.roundInfluence = String(S["Round influence"] || "").split(",").map(function (x) { return parseFloat(x); }).filter(function (x) { return !isNaN(x); });
    // Steering bonus: one number (from Steering from round on), or one per round ("1, 1, 1, 4, 10, 25").
    var sb = S["Steering bonus"];
    S.steeringBonus = typeof sb === "number" ? sb : 1000;
    S.steeringByRound = typeof sb === "string" ? sb.split(",").map(function (x) { return parseFloat(x); }).filter(function (x) { return !isNaN(x); }) : [];
    // The Future (v5.2): decisions that ground a Future pull the game toward it, recent ones most.
    S.futurePull = numSetting(S["Future pull"], 0);
    S.futurePullDecay = numSetting(S["Future pull decay"], 0.6);
    S.storyPullMin = numSetting(S["Story pull minimum"], 1);
    S.futureMinGrounding = numSetting(S["Future min grounding"], 1);
    S.futureRecentRound = numSetting(S["Future recent round"], 1);
    S.futureCloseDistance = numSetting(S["Future close distance"], 0);
    // v5.3: the most years between two cards in a row (and between the last card and the Future).
    S.maxGap = numSetting(S["Most years between cards"], 0);
    // v5.3: how much less likely an Event is when none of its threads is on the player's spine.
    S.eventOffSpine = typeof S["Event off-spine factor"] === "number" ? S["Event off-spine factor"] : null;
    S.eventOnSpine = numSetting(S["Event on-spine factor"], 1);
    // How much a Choice's power Effect bends the capability curve from its card's date.
    S.gaugeBrakePace = numSetting(S["Gauge brake pace"], 0.15);
    S.gaugeTrendHeight = numSetting(S["Gauge trend height"], 0.5);
    // The spine: cards on the game's main thread score Spine bonus times higher.
    S.spineBonus = numSetting(S["Spine bonus"], 1);
    S.spineDecay = numSetting(S["Spine decay"], 0.7);
    // Rising stakes: a card below the round's scale, or below the last card's, scores Scale penalty times less.
    S.scalePenalty = numSetting(S["Scale penalty"], 1);
    S.roundScales = String(S["Round scales"] || "").split(",").filter(function (x) { return x.trim(); }).map(function (x) { return SCALES.indexOf(x.trim().toLowerCase()); });
    S.noveltyBonus = numSetting(S["Novelty bonus"], 1);
    // Events: at most this many per game, and (if Events have a Likelihood) never two transitions in a row.
    S.maxEvents = numSetting(S["Most Events per game"], 2);
    // Value scale: final (and in-game) Values are multiplied by this many rounds / rounds played.
    S.valueScaleRounds = numSetting(S["Value scale rounds"], story.rounds);
    // Era drift: "round 3 power +1; round 5 power +1, handover +1"
    S.eraDrift = {};
    String(S["Era drift"] || "").split(";").forEach(function (part) {
      var mm = /^\s*round\s+(\d+)\s+(.+)$/i.exec(part);
      if (mm) S.eraDrift[+mm[1]] = effects(mm[2], "SETTINGS Era drift");
      else if (part.trim() && !/^[(\[]/.test(part.trim())) problem("SETTINGS", 'can\'t read Era drift "' + part.trim() + '" (expected "round 3 power +1")');
    });
    // Mostly rules: "tends_life tended_life" sets tended_life while at least half of the
    // Choices after a tipping point have set tends_life.
    S.mostly = String(S["Mostly flags"] || "").split(",").map(function (x) {
      var mm = /^\s*(\S+)\s+(\S+)\s*$/.exec(x);
      return mm ? { flag: mm[1], sets: mm[2] } : null;
    }).filter(Boolean);
    // Near miss: what changes, quietly, when a tipping point is narrowly missed ("control +2, unity +1").
    // v5.6: the Values that stop counting once the world tips over ("control, handover, unity, equality").
    S.valuesLost = String(S["Values lost at the tipping point"] || "").split(",").map(function (x) { return x.trim().toLowerCase(); }).filter(Boolean);
    S.nearMissEffects = effects(String(S["Near miss effects"] || ""), "SETTINGS Near miss effects");
    // The Agents arc: the counter that sets agents_era, and how strongly it bends the draw.
    S.agentsThreshold = numSetting(S["Agents threshold"], 3);
    S.agentsFrom = numSetting(S["Agents from round"], 4);
    S.agentsBonus = numSetting(S["Agents bonus"], 1);
    S.agentsPenalty = numSetting(S["Agents penalty"], 1);
    S.agentsPenaltyFrom = numSetting(S["Agents penalty from round"], 5);
    // Counted flags: "tends_life 2 tended_life" sets tended_life once tends_life has been set twice.
    S.counters = String(S["Counted flags"] || "").split(",").map(function (x) {
      var mm = /^\s*(\S+)\s+(\d+)\s+(\S+)\s*$/.exec(x);
      return mm ? { flag: mm[1], count: +mm[2], sets: mm[3] } : null;
    }).filter(Boolean);
    var rc = S["Round colors"];
    S.roundColors = typeof rc === "string" ? rc.split(",").map(function (c) { return c.trim(); }).filter(Boolean) : [];
    S.eventColor = typeof S["Event color"] === "string" ? S["Event color"].trim() : "";
    S.sotaColor = typeof S["State of the art color"] === "string" ? S["State of the art color"].trim() : "";
    S.tippingColor = typeof S["Tipping point color"] === "string" ? S["Tipping point color"].trim() : "#5e5a55";
    S.gaugeLevels = String(S["Gauge levels"] || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean);
    S.gaugeStart = String(S["Gauge start"] || "").trim();
    // The capability graph: its years ("2000, 2060") and its pace from each year ("2000 0.23, 2010 1").
    var gy = String(S["Gauge years"] || "2000, 2070").split(",").map(function (x) { return parseFloat(x); });
    S.gaugeYears = gy.length === 2 && gy[1] > gy[0] ? gy : [2000, 2070];
    S.gaugePace = String(S["Gauge pace"] || "2000 1").split(",").map(function (x) {
      var p = x.trim().split(/\s+/).map(parseFloat);
      return { year: p[0], pace: p[1] };
    }).filter(function (p) { return !isNaN(p.year) && p.pace > 0; }).sort(function (a, b) { return a.year - b.year; });
    return story;
  }

  function numSetting(v, fallback) { return typeof v === "number" && !isNaN(v) ? v : fallback; }

  function missing(fields, names) {
    return names.filter(function (n) { return !fields[n] || !rawText(fields[n]); });
  }

  // A card's date as a year on one scale, for ordering and the timeline strip: an exact
  // year stays as it is; "Late 2030s" -> 2038, "Mid 2030s" -> 2035, "Early 2030s" -> 2032,
  // "2040s" -> 2045. NaN if there's no year.
  function yearOf(date) {
    date = String(date || "");
    var m = /(\d{4})s/.exec(date);
    if (m) {
      var base = +m[1];
      if (/early/i.test(date)) return base + 2;
      if (/mid/i.test(date)) return base + 5;
      if (/late/i.test(date)) return base + 8;
      return base + 5;
    }
    m = /(\d{4})/.exec(date);
    return m ? +m[1] : NaN;
  }

  // "Jun 2017" -> 2017.42, "2026" -> 2026.5
  function whenOf(date) {
    var m = /([A-Za-z]{3})[a-z]*\.?\s+(\d{4})/.exec(date);
    if (m && MONTHS[m[1].toLowerCase()] != null) return +m[2] + MONTHS[m[1].toLowerCase()] / 12;
    m = /(\d{4})/.exec(date);
    return m ? +m[1] + 0.5 : 0;
  }

  // --- Validation ------------------------------------------------------------
  // Returns [{ id, message }]: things that are wrong. Includes anything the parser couldn't read.
  // (lint() below returns softer warnings, for tools/check-story.js only.)

  function validate(story) {
    var out = story.problems.slice();
    function problem(id, message) { out.push({ id: id, message: message }); }
    var S = story.settings;

    var byId = {};
    story.scenarios.concat(story.events, story.sota, story.tipping).forEach(function (c) {
      if (byId[c.id]) problem(c.id, "the id is used twice");
      byId[c.id] = c;
    });
    var tippingTypes = {};
    story.tipping.forEach(function (t) { tippingTypes[t.type] = t; });

    story.scenarios.forEach(function (s) {
      s.missing.forEach(function (f) { problem(s.id, "missing " + f); });
      if (s.choices.length !== 3) problem(s.id, "has " + s.choices.length + " choices (needs exactly 3)");
      s.rounds.forEach(function (r) { if (r < 1 || r > story.rounds) problem(s.id, "Round " + r + " is outside rounds 1 to " + story.rounds); });
      s.openers.forEach(function (o) { if (!o.text) problem(s.id, "has an opener with no sentence"); });
      s.choices.forEach(function (c) {
        var owner = s.id + " Choice " + c.label;
        c.missing.forEach(function (f) { problem(owner, "missing " + f); });
        c.sets.forEach(function (fl) { if (!FLAG_RE.test(fl)) problem(owner, 'Sets "' + fl + '" isn\'t a flag name (letters, digits, _ and -)'); });
        if (c.tipping) {
          if (!c.tipping.when.length) problem(owner, "Tipping point has no condition");
          if (TIPPING_TYPES.indexOf(c.tipping.type) === -1) problem(owner, 'Tipping point type "' + c.tipping.type + '" (use ' + TIPPING_TYPES.join(", ") + ")");
          else if (!tippingTypes[c.tipping.type]) problem(owner, 'no TIPPING POINTS entry has Type "' + c.tipping.type + '"');
        }
      });
    });

    story.events.forEach(function (e) {
      e.missing.forEach(function (f) { problem(e.id, "missing " + f); });
      e.rounds.forEach(function (r) { if (r < 1 || r >= story.rounds) problem(e.id, "Round is " + r + " (an Event follows a round's Choice, so 1 to " + (story.rounds - 1) + ")"); });
    });

    story.tipping.forEach(function (t) {
      t.missing.forEach(function (f) { problem(t.id, "missing " + f); });
      if (t.type && TIPPING_TYPES.indexOf(t.type) === -1) problem(t.id, 'Type "' + t.type + '" (use ' + TIPPING_TYPES.join(", ") + ")");
      if (t.future && !story.futures.some(function (f) { return f.id === t.future; })) problem(t.id, 'Future "' + t.future + '" doesn\'t exist');
      if (t.prevented.length && !t.prevented.some(function (o) { return o.isDefault; })) problem(t.id, "Prevented has no default line");
    });
    S.valuesLost.forEach(function (v) { if (VALUE_NAMES.indexOf(v) === -1) problem("SETTINGS", 'Values lost at the tipping point names "' + v + '", which isn\'t a Value'); });
    story.scenarios.forEach(function (s) {
      s.choices.forEach(function (c) { if (c.tipping && !c.tippingWhy.length) problem(c.key, "has a Tipping point but no Tipping why"); });
    });

    var levels = S.gaugeLevels.map(function (l) { return l.toLowerCase(); });
    if (story.sota.length && levels.length < 2) problem("SETTINGS", "Gauge levels needs at least two names, lowest first");
    if (story.sota.length && levels.indexOf(S.gaugeStart.toLowerCase()) === -1) problem("SETTINGS", 'Gauge start "' + S.gaugeStart + '" isn\'t one of the Gauge levels');
    story.sota.forEach(function (a) {
      a.missing.forEach(function (f) { problem(a.id, "missing " + f); });
      if (a.gauge && a.gauge.toLowerCase() !== "hold" && levels.indexOf(a.gauge.toLowerCase()) === -1) problem(a.id, 'Gauge is "' + a.gauge + '" (use hold or one of: ' + S.gaugeLevels.join(", ") + ")");
    });
    story.scenarios.concat(story.events, story.sota).forEach(function (c) {
      if (c.date && isNaN(c.year)) problem(c.id, 'Date "' + c.date + '" has no year');
      // v5.1: every date is an exact year, so the strip and the gauge never blur the order.
      else if (S.roundScales.length && c.date && !/^\d{4}$/.test(c.date)) problem(c.id, 'Date "' + c.date + '" isn\'t an exact year (like 2043)');
    });
    // Capability terms name a Gauge level; reached terms name a milestone.
    var PACES = ["racing", "paced", "held", "leveled", "beyond"];
    var sotaIds = {};
    story.sota.forEach(function (a) { sotaIds[a.id] = true; });
    function checkTerms(id, terms) {
      (terms || []).forEach(function (t) {
        if (t.type === "cap" && levels.indexOf(t.level.toLowerCase()) === -1) problem(id, 'capability "' + t.level + '" isn\'t a Gauge level (' + S.gaugeLevels.join(", ") + ")");
        if (t.type === "reached" && !sotaIds[t.id]) problem(id, 'reached "' + t.id + '": no such milestone');
        if (t.type === "pace" && PACES.indexOf(t.pace) === -1) problem(id, 'pace "' + t.pace + '" isn\'t a pace (' + PACES.join(", ") + ")");
      });
    }
    story.sota.forEach(function (a) {
      checkTerms(a.id + " Condition", a.condition);
      a.because.forEach(function (o) { checkTerms(a.id + " Because", o.when); });
      a.ahead.forEach(function (o) { checkTerms(a.id + " Ahead", o.when); });
      if (a.ahead.length && !a.ahead.some(function (o) { return o.isDefault; })) problem(a.id, "Ahead has no default line");
      if (a.setsPace && PACES.indexOf(a.setsPace) === -1) problem(a.id, 'Sets pace "' + a.setsPace + '" isn\'t a pace (' + PACES.join(", ") + ")");
      if (a.countsAs && !sotaIds[a.countsAs]) problem(a.id, 'Counts as "' + a.countsAs + '": no such milestone');
    });
    story.scenarios.concat(story.events).forEach(function (c) {
      checkTerms(c.id, c.appears);
      (c.openers || []).forEach(function (o) { checkTerms(c.id + " opener", o.when); });
      if (S.roundScales.length && c.kind === "scenario" && c.scale === -1) problem(c.id, "missing Scale (local, national, bloc or world)");
    });
    if (S.roundScales.length && S.roundScales.length !== story.rounds) problem("SETTINGS", "Round scales has " + S.roundScales.length + " entries (needs " + story.rounds + ")");
    S.roundScales.forEach(function (x) { if (x === -1) problem("SETTINGS", "Round scales: use local, national, bloc or world"); });

    story.futures.forEach(function (f) {
      f.missing.forEach(function (name) { problem(f.id, "missing " + name); });
      if (f.targets && !f.grounded.length) problem(f.id, "has no Grounded by entries, so no player can ever receive it");
      var keys = {};
      f.grounded.forEach(function (g) {
        var owner = f.id + " Grounded by " + g.key;
        if (keys[g.key]) problem(owner, "is listed twice");
        keys[g.key] = true;
        if (!g.text) problem(owner, "has no sentence");
        var t = byId[g.id];
        if (!t) problem(owner, '"' + g.id + '" doesn\'t exist');
        else if (g.choice) {
          if (t.kind !== "scenario") problem(owner, '"' + g.id + '" isn\'t a Scenario, so it has no Choice ' + g.choice);
          else if (!t.choices.some(function (c) { return c.label.toUpperCase() === g.choice; })) problem(owner, '"' + g.id + '" has no Choice ' + g.choice);
        } else if (t.kind === "scenario") problem(owner, '"' + g.id + '" is a Scenario: add a Choice letter, like ' + g.id + "/A");
        else if (t.kind === "sota") problem(owner, '"' + g.id + '" is a State of the Art item, which can\'t ground a Future');
      });
      if (!f.stories.length) problem(f.id, "has no stories");
      f.stories.forEach(function (st) { if (!st.text.length) problem(f.id + " " + st.name, "missing Text"); checkTerms(f.id + " " + st.name + " When", st.when); });
    });
    if (!story.futures.some(function (f) { return !f.targets; })) problem("FUTURES", "no fallback Future (one with no Targets, like long_middle)");
    for (var r = 1; r <= story.rounds; r++) {
      if (!story.scenarios.some(function (s) { return s.rounds.indexOf(r) !== -1; })) problem("ROUND " + r, "no Scenario can appear in round " + r);
    }
    if (S.roundYears.length && S.roundYears.length !== story.rounds) problem("SETTINGS", "Round years has " + S.roundYears.length + " entries (needs " + story.rounds + ")");
    var hexRe = /^#[0-9a-f]{6}$/i;
    if (S.roundColors.length < story.rounds) problem("SETTINGS", "Round colors has " + S.roundColors.length + " colors (needs " + story.rounds + ")");
    S.roundColors.forEach(function (c) { if (!hexRe.test(c)) problem("SETTINGS", 'Round colors: "' + c + '" isn\'t a color like #7fa6a3'); });
    if (!hexRe.test(S.eventColor)) problem("SETTINGS", "Event color is missing or isn't a color like #8f897e");
    if (story.sota.length && !hexRe.test(S.sotaColor)) problem("SETTINGS", "State of the art color is missing or isn't a color like #9fb4c7");
    if (story.tipping.length && !hexRe.test(S.tippingColor)) problem("SETTINGS", "Tipping point color isn't a color like #5e5a55");
    if (story.values.length !== VALUE_NAMES.length) problem("VALUES", "found " + story.values.length + " Values (expected " + VALUE_NAMES.length + ")");
    story.values.forEach(function (v) {
      if (VALUE_NAMES.indexOf(v.id) === -1) problem(v.id, "unknown Value id (use " + VALUE_NAMES.join(", ") + ")");
    });
    return out;
  }

  // Chronology. With storylets any card may follow any other, so the engine never draws a
  // card dated before the one before it. What can be checked here: each card's date falls
  // in the years of the rounds it can appear in (SETTINGS → Round years); an Event can't
  // be dated before the round it follows begins, or after the next round begins (so every
  // card of the next round can still follow it); no milestone predates the first round.
  // Returns [{ id, message }].
  function chronology(story) {
    var out = [];
    var Y = story.settings.roundYears;
    var span = function (rounds) {
      var ys = rounds.map(function (r) { return Y[r - 1]; }).filter(Boolean);
      return ys.length ? [Math.min.apply(null, ys.map(function (y) { return y[0]; })), Math.max.apply(null, ys.map(function (y) { return y[1]; }))] : null;
    };
    if (Y.length) {
      story.scenarios.forEach(function (s) {
        var sp = span(s.rounds);
        if (sp && (s.year < sp[0] || s.year > sp[1])) out.push({ id: s.id, message: "is dated " + s.date + " (" + s.year + "), outside the years of round " + s.rounds.join(", ") + " (" + sp[0] + "–" + sp[1] + ")" });
      });
      story.events.forEach(function (e) {
        if (e.nearMiss) return; // dated at runtime, a year after the card it follows
        e.rounds.forEach(function (r) {
          var from = Y[r - 1], next = Y[r];
          if (from && e.year < from[0]) out.push({ id: e.id, message: "is dated " + e.date + ", before round " + r + " begins (" + from[0] + ")" });
          if (next && e.year > next[0]) out.push({ id: e.id, message: "is dated " + e.date + ", after round " + (r + 1) + " begins (" + next[0] + "), so it could come after the next card" });
        });
      });
    } else {
      // No round years: the v4.1 rule. An Event must be dated after every card of the round it follows.
      story.events.forEach(function (e) {
        story.scenarios.filter(function (s) { return e.rounds.indexOf(s.round) !== -1; }).forEach(function (s) {
          if (!(e.year > s.year)) out.push({ id: e.id, message: "can follow " + s.id + " (" + s.date + ") but isn't dated after it (" + e.date + ")" });
        });
      });
    }
    var first = Math.min.apply(null, story.scenarios.filter(function (s) { return s.rounds.indexOf(1) !== -1; }).map(function (s) { return s.year; }));
    story.sota.forEach(function (a) {
      if (a.year <= first) out.push({ id: a.id, message: "is dated " + a.date + ", no later than the first round (" + first + "), so it could never appear in order" });
    });
    return out;
  }

  // Softer warnings, for tools/check-story.js: flags read but never set, or set but never
  // read; cards that can follow round 1 with no default opener; Futures that require a flag
  // whose setters aren't all in their Grounded by list.
  function lint(story) {
    var out = [];
    function warn(id, message) { out.push({ id: id, message: message }); }
    var set = {}, read = {};
    // Flags the engine sets on its own.
    ["after_humanity", "near_miss", "near_war", "near_collapse", "near_runaway", "agents_era", "brake_world"].forEach(function (f) { set[f] = ["the engine"]; });
    story.settings.counters.forEach(function (c) { (set[c.sets] = set[c.sets] || []).push("Counted flags"); });
    story.settings.mostly.forEach(function (c) { (set[c.sets] = set[c.sets] || []).push("Mostly flags"); (read[c.flag] = read[c.flag] || []).push("Mostly flags"); });
    story.scenarios.concat(story.events).forEach(function (c) { (c.threads || []).forEach(function (t) { (set[t] = set[t] || []).push(c.id + " (thread)"); }); });
    story.scenarios.forEach(function (s) {
      (set[s.id] = set[s.id] || []).push(s.id);
      s.choices.forEach(function (c) {
        (set[c.key] = set[c.key] || []).push(c.key);
        c.sets.forEach(function (f) { (set[f] = set[f] || []).push(c.key); });
      });
    });
    story.events.forEach(function (e) {
      (set[e.id] = set[e.id] || []).push(e.id);
      e.sets.forEach(function (f) { (set[f] = set[f] || []).push(e.id); });
    });
    story.tipping.forEach(function (t) { (set[t.id] = set[t.id] || []).push(t.id); });
    function reads(owner, terms) { flagsIn(terms).forEach(function (f) { (read[f] = read[f] || []).push(owner); }); }
    story.scenarios.forEach(function (s) {
      reads(s.id, s.appears);
      (s.follows || []).forEach(function (x) { (read[x.flag] = read[x.flag] || []).push(s.id + " Follows"); });
      s.openers.forEach(function (o) { reads(s.id + " Openers", o.when); });
      s.choices.forEach(function (c) { if (c.tipping) reads(c.key + " Tipping point", c.tipping.when); });
    });
    story.events.forEach(function (e) {
      reads(e.id, e.appears);
      if (e.likelihood) e.likelihood.mods.forEach(function (m) { reads(e.id + " Likelihood", m.when); });
    });
    story.sota.forEach(function (a) {
      reads(a.id, a.condition);
      a.because.forEach(function (o) { reads(a.id + " Because", o.when); });
      a.ahead.forEach(function (o) { reads(a.id + " Ahead", o.when); });
    });
    story.tipping.forEach(function (t) {
      t.prevented.forEach(function (o) { reads(t.id + " Prevented", o.when); });
      t.versions.forEach(function (v) { reads(t.id + " " + v.name, v.when); });
    });
    story.futures.forEach(function (f) { reads(f.id + " Requires", f.requires); });
    story.settings.counters.forEach(function (c) { (read[c.flag] = read[c.flag] || []).push("Counted flags"); });
    Object.keys(read).forEach(function (f) { if (!set[f]) warn(read[f][0], 'reads flag "' + f + '", which nothing sets'); });
    // Named flags (not a Choice's or Event's own) that are set but never read.
    Object.keys(set).forEach(function (f) {
      if (read[f] || /\//.test(f) || set[f][0] === f || set[f][0] === "the engine" || /\(thread\)$/.test(set[f][0])) return;
      warn(set[f][0], 'sets flag "' + f + '", which nothing reads');
    });
    story.scenarios.forEach(function (s) {
      if (s.rounds.some(function (r) { return r > 1; }) && !s.openers.some(function (o) { return o.isDefault; })) warn(s.id, "can appear after round 1 but has no default opener");
    });
    return out;
  }

  return {
    parse: parse, validate: validate, chronology: chronology, lint: lint, conditions: conditions, flagsIn: flagsIn,
    yearOf: yearOf, paragraphs: paragraphs, VALUE_NAMES: VALUE_NAMES, TIPPING_TYPES: TIPPING_TYPES
  };
});
