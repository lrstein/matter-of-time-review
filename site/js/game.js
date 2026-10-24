// A Matter of Time — UI. Browser only.
// Loads content/story.md, parses it (js/story-parser.js), builds the engine
// (js/engine.js), then runs the screens: Home (and About) → Disclaimer → Rounds
// (with Events and State of the Art cards) → Future → See what you chose.

(function (root) {
  "use strict";

  var doc = root.document;
  var $ = function (id) { return doc.getElementById(id); };
  var Sound = root.Sound || { start: function () {}, click: function () {}, confirm: function () {}, flip: function () {}, dip: function () {}, setMuted: function () {}, isMuted: function () { return true; }, useFiles: function () {} };
  var REDUCED = root.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Test hooks (never active without the URL parameter):
  //   ?seed=N   every random choice in the game is reproducible (one seeded generator, Engine.random)
  //   ?test=1   test mode: Home and the Disclaimer skipped, no audio, everything ~10 times faster
  //             (&speed=N for another rate, e.g. 1 for real time), and a read-only
  //             window.__game for tools/play-test.js
  var PARAMS = new URLSearchParams(root.location.search);
  var TEST = PARAMS.get("test") === "1";
  var SEED = /^\d+$/.test(PARAMS.get("seed") || "") ? parseInt(PARAMS.get("seed"), 10) : null;
  var SPEED = TEST ? Math.max(0.25, parseFloat(PARAMS.get("speed")) || 10) : 1;
  // What the player can do now, for test mode: loading, busy, choose, continue, event,
  // interlude, reveal-done. Each change gets a new number, so the harness acts once per phase.
  var phase = "loading", phaseId = 0;
  function setPhase(p) {
    if (p !== phase) { phase = p; phaseId++; }
    if (p === "reveal-done") gameLive = false; // the game is over: Home offers Play again
  }
  // v5.7: a game in progress (from its start until the Future is revealed). Going Home
  // pauses it there, and Home offers Continue and Restart instead of Play.
  var gameLive = false;

  // Test mode speeds up every animation by SPEED: Web Animations by their duration, CSS
  // transitions and animations by their playback rate, timers in wait() and scrolls by ms.
  if (TEST) {
    var animate = Element.prototype.animate;
    Element.prototype.animate = function (frames, opts) {
      if (typeof opts === "number") opts = opts / SPEED;
      else if (opts && opts.duration) opts = Object.assign({}, opts, { duration: opts.duration / SPEED, delay: (opts.delay || 0) / SPEED });
      return animate.call(this, frames, opts);
    };
    var faster = function (e) {
      if (!e.target.getAnimations) return;
      e.target.getAnimations().forEach(function (a) { if (a.playbackRate !== SPEED && !(a instanceof root.CSSAnimation && a.effect && a.effect.getTiming().iterations === Infinity)) a.playbackRate = SPEED; });
    };
    doc.addEventListener("transitionrun", faster, true);
    doc.addEventListener("animationstart", faster, true);
  }

  var STORY_URL = "content/story.md";
  var CARDS = { back: "images/cards/card-back.webp" };
  var GAP = 250;           // between staggered text reveals (each takes ~700 ms, --slow)
  var STORY_KEY = "amot-story-"; // + Future id: the last story shown, so it isn't repeated next time
  var FOUND_KEY = "amot-found";  // v5.8: the Futures collection, { futureId: { story, ending } }

  var story = null;
  var Engine = null;

  // --- Text from story.md ----------------------------------------------------

  // A UI TEXT entry, with {placeholders} filled in. Missing entries show their label.
  function ui(key, vars) {
    var s = story.ui[key];
    if (s == null) { console.warn('story.md: UI TEXT has no "' + key + '"'); s = key; }
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  }

  function fillUiText() {
    doc.querySelectorAll("[data-ui]").forEach(function (e) { e.textContent = ui(e.dataset.ui); });
  }

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Player-facing text may hold Markdown links to sources: [words](https://…), and (v5.7)
  // invented names in italics: *Larkspur*. rich() renders links as subtle links that open
  // in a new tab and italics as <em>; inline() renders the italics only; plain() keeps
  // just the words.
  var LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  var ITALIC = /\*([^*\n]+)\*/g;
  function plain(s) { return String(s).replace(LINK, "$1").replace(ITALIC, "$1"); }
  function emph(html) { return html.replace(ITALIC, "<em>$1</em>"); }
  function inline(s) { return emph(escapeHtml(String(s).replace(LINK, "$1"))); }
  function rich(s) {
    var out = "", last = 0, m;
    s = String(s);
    LINK.lastIndex = 0;
    while ((m = LINK.exec(s))) {
      out += emph(escapeHtml(s.slice(last, m.index)));
      if (/^https?:\/\//i.test(m[2])) {
        out += '<a class="src" href="' + escapeHtml(m[2]).replace(/"/g, "&quot;") + '" target="_blank" rel="noopener">' + emph(escapeHtml(m[1])) + "</a>";
      } else {
        out += emph(escapeHtml(m[1]));
      }
      last = m.index + m[0].length;
    }
    return out + emph(escapeHtml(s.slice(last)));
  }
  function richEl(tag, className, str) { return el(tag, className, rich(str)); }

  // --- Timing helpers --------------------------------------------------------

  // Every timed sequence checks `flow` so Home / Play again can cancel it cleanly.
  var flow = 0;
  function cancelFlow() { flow++; }
  // v5.7: while the game is paused on Home, timers that come due wait for Continue.
  var paused = false, onResume = [];
  function later(fn, ms) {
    var mine = flow;
    setTimeout(function due() { if (paused && mine === flow) onResume.push(due); else fn(); }, ms / SPEED);
  }
  function pause() { paused = true; }
  function resume() {
    paused = false;
    var due = onResume;
    onResume = [];
    due.forEach(function (f) { f(); });
  }
  function wait(ms) {
    var mine = flow;
    return new Promise(function (resolve) {
      later(function () { resolve(mine === flow); }, ms);
    });
  }

  // Resolves on click of `target`, or after `ms` if given. False if the flow was cancelled.
  function waitForTap(target, ms) {
    var mine = flow;
    return new Promise(function (resolve) {
      var timer = null;
      function done() {
        target.removeEventListener("click", done);
        clearTimeout(timer);
        resolve(mine === flow);
      }
      target.addEventListener("click", done);
      if (ms) timer = setTimeout(function due() { if (paused) onResume.push(due); else done(); }, ms / SPEED);
    });
  }

  // Resolves when a Web Animation finishes (or immediately if there isn't one).
  function finished(anim) {
    return new Promise(function (resolve) {
      if (!anim) return resolve();
      anim.onfinish = function () { resolve(); };
      anim.oncancel = function () { resolve(); };
    });
  }

  // Resolves once every running (finite) animation and transition on `els` has finished,
  // so a phase only begins when what it shows is fully visible. False if cancelled.
  function settled(els) {
    var mine = flow;
    return new Promise(function (resolve) {
      requestAnimationFrame(function () { // let just-started transitions register
        var anims = [];
        els.forEach(function (e) {
          if (!e || !e.getAnimations) return;
          e.getAnimations().forEach(function (a) {
            var t = a.effect && a.effect.getTiming ? a.effect.getTiming() : {};
            if (t.iterations !== Infinity) anims.push(a.finished.catch(function () {}));
          });
        });
        Promise.all(anims).then(function () { resolve(mine === flow); });
      });
    });
  }

  // Screens crossfade (about 1 s, see .screen in styles.css).
  var screenChanged = 0;
  function showScreen(id) {
    screenChanged = Date.now();
    doc.querySelectorAll(".screen.active").forEach(function (s) { if (s.id !== id) s.classList.remove("active"); });
    $(id).classList.add("active");
    doc.body.dataset.screen = id;
  }

  function isActive(id) { return $(id).classList.contains("active"); }


  function el(tag, className, html) {
    var e = doc.createElement(tag);
    if (className) e.className = className;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function text(tag, className, str) {
    var e = el(tag, className);
    e.textContent = str;
    return e;
  }

  // Elements that fade in on cue: reset to hidden, then add .in to reveal. The reset is
  // instant (no transition), so text never shows while it fades away before its reveal.
  function resetFade(list) {
    list.forEach(function (e) {
      e.style.transition = "none";
      e.classList.add("fade");
      e.classList.remove("in");
    });
    if (list.length) void list[0].offsetWidth; // apply the hidden state now
    list.forEach(function (e) { e.style.transition = ""; });
  }

  // Reveal elements one after another.
  async function stagger(list, gap) {
    for (var i = 0; i < list.length; i++) {
      list[i].classList.add("in");
      if (i < list.length - 1 && !(await wait(gap))) return false;
    }
    return true;
  }

  // Split into sentences without breaking links (URLs are full of dots).
  function sentences(str) {
    var links = [];
    var masked = String(str).replace(LINK, function (m) { links.push(m); return "\u0000" + (links.length - 1) + "\u0000"; });
    // A stop ends a sentence only before a space or the end, so a number like "7.8" stays whole.
    var parts = masked.match(/[^]*?[.!?…]+["”’)]?(?=\s|$)\s*/g) || [masked];
    if (parts.join("") !== masked) parts.push(masked.slice(parts.join("").length)); // trailing text with no full stop
    return parts.filter(Boolean).map(function (p) {
      return p.replace(/\u0000(\d+)\u0000/g, function (m, i) { return links[+i]; });
    });
  }

  function isNarrow() { return root.matchMedia("(max-width: 760px)").matches; }

  // A slow, eased scroll of the table to bring `node` into view ("nearest", "start" or "values"),
  // instead of the browser's quicker smooth scroll. Keeps clear of the strip at the top.
  var scrollToken = 0;
  function gentleScroll(node, block, ms) {
    var sc = $("table");
    var token = ++scrollToken;
    var view = sc.getBoundingClientRect();
    var r = node.getBoundingClientRect();
    var topLimit = view.top + ($("strip").classList.contains("on") ? $("strip").offsetHeight : 0);
    var delta = 0;
    if (block === "start") delta = r.top - topLimit;
    // "values" (v5.8): the whole Values table in view, its bottom clear of the window's
    // edge, but never past its heading (the strip has risen away by then).
    else if (block === "values") delta = Math.min(r.bottom - view.bottom + 40, $("explain").getBoundingClientRect().top - view.top - 24);
    else if (r.bottom > view.bottom - 24) delta = Math.min(r.bottom - view.bottom + 24, r.top - topLimit);
    else if (r.top < topLimit) delta = r.top - topLimit;
    var from = sc.scrollTop;
    var to = Math.max(0, Math.min(from + delta, sc.scrollHeight - sc.clientHeight));
    if (Math.abs(to - from) < 2) return;
    if (REDUCED) { sc.scrollTop = to; return; }
    ms = (ms || Math.max(800, Math.min(1600, Math.abs(to - from) * 3))) / SPEED;
    var t0 = performance.now();
    (function step(now) {
      if (token !== scrollToken) return;
      var k = Math.min(1, (now - t0) / ms);
      sc.scrollTop = from + (to - from) * easeInOut(k);
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }

  // --- Colour and contrast ---------------------------------------------------
  // Accent-coloured text must reach 4.5:1 against what's behind it. If a colour
  // from story.md falls short, it's lightened toward the primary text colour.

  var TEXT = "#ece6da"; // --text in styles.css
  var MIN_CONTRAST = 4.5;

  function rgb(hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
    if (!m) return null;
    var n = parseInt(m[1], 16);
    return [n >> 16, (n >> 8) & 255, n & 255];
  }
  function hex(c) { return "#" + c.map(function (v) { return ("0" + Math.round(v).toString(16)).slice(-2); }).join(""); }
  // `amount` of colour a over colour b
  function mix(a, b, amount) {
    var x = rgb(a), y = rgb(b);
    if (!x || !y) return a;
    return hex(x.map(function (v, i) { return v * amount + y[i] * (1 - amount); }));
  }
  function luminance(c) {
    return c.map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); })
      .reduce(function (sum, v, i) { return sum + v * [0.2126, 0.7152, 0.0722][i]; }, 0);
  }
  function contrast(a, b) {
    var la = luminance(rgb(a)), lb = luminance(rgb(b));
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }
  function readable(color, bg) {
    if (!rgb(color)) return color;
    bg = bg || "#161614";               // --bg
    for (var k = 0; k <= 1.0001; k += 0.05) {
      var c = mix(TEXT, color, k);
      if (contrast(c, bg) >= MIN_CONTRAST) return c;
    }
    return TEXT;
  }
  // --accent for glows and lines; --accent-text for words.
  function setAccent(node, color) {
    node.style.setProperty("--accent", color);
    node.style.setProperty("--accent-text", readable(color));
  }

  // Each round has its own accent (SETTINGS → Round colors); Events use Event color,
  // and State of the Art items State of the art color.
  function cardColor(item) {
    if (item.kind === "event") return story.settings.eventColor || "#8f897e";
    if (item.kind === "tipping") return story.settings.tippingColor || "#5e5a55";
    if (item.kind === "sota") return story.settings.sotaColor || "#9fb4c7";
    var list = story.settings.roundColors;
    return list[(item.round || 1) - 1] || list[list.length - 1] || "#9a9a9a";
  }
  // --rc / --rc-text: an item's own (round) color, before everything recolors to the Future's.
  function setRoundColor(node, color) {
    node.style.setProperty("--rc", color);
    node.style.setProperty("--rc-text", readable(color));
  }

  // A timeline's spine runs from the top down to `y` (px) and no further.
  function endSpine(container, y) {
    var spine = container.querySelector(".atl-spine");
    if (!spine) return;
    spine.style.bottom = "auto";
    spine.style.height = Math.max(0, Math.round(y)) + "px";
  }

  // --- Cards -----------------------------------------------------------------
  // Card art is 9:16 with square corners; CSS rounds every card at 1/32 of its width.

  // A card's face: its image, or, until the art is made, the placeholder face: a plain
  // dark card with a thin frame, an hourglass and a note (UI TEXT) saying it's temporary.
  // Sized in cqw, so it reads the same on every card; on tiny cards only the frame shows.
  var HOURGLASS = '<svg class="ph-mark" viewBox="0 0 40 60" aria-hidden="true"><path d="M8 4h24M8 56h24M11 4c0 14 18 16 18 26S11 42 11 56M29 4c0 14-18 16-18 26s18 12 18 26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M15 50c2-4 8-4 10 0z" fill="currentColor" opacity="0.7"/></svg>';
  function setFace(face, item) {
    face.innerHTML = "";
    if (item && item.image) {
      var img = el("img");
      img.alt = "";
      img.draggable = false;
      img.src = item.image;
      face.appendChild(img);
      return;
    }
    var ph = el("div", "ph", '<span class="ph-frame"></span>' + HOURGLASS + '<span class="ph-title"></span><span class="ph-note"></span>');
    ph.querySelector(".ph-title").textContent = ui("Placeholder card title");
    ph.querySelector(".ph-note").textContent = ui("Placeholder card note");
    face.appendChild(ph);
  }

  // A tarot card: back and front faces, flipped in 3D. Starts face down.
  function makeCard(item) {
    var card = el("div", "tcard",
      '<div class="tcard-inner">' +
      '<div class="tface tback"><img alt="" draggable="false"></div>' +
      '<div class="tface tfront"></div>' +
      "</div>");
    card.querySelector(".tback img").src = CARDS.back;
    setFace(card.querySelector(".tfront"), item);
    return card;
  }

  // A small face-up card (the player's Timeline).
  function thumb(item, className) {
    var t = el("div", "cardthumb " + (className || ""), '<div class="cface"></div>');
    setFace(t.querySelector(".cface"), item);
    return t;
  }

  function preloadCards() {
    var i = new Image();
    i.src = CARDS.back;
  }

  // The deck: a small offset pile of card backs. Each card drawn takes the top one.
  function buildDeck(size) {
    var deck = $("deck");
    deck.innerHTML = "";
    for (var i = 0; i < size; i++) {
      var c = el("div", "deck-card", '<div class="cface"><img alt="" draggable="false"></div>');
      c.querySelector("img").src = CARDS.back;
      c.style.setProperty("--i", i);
      c.style.setProperty("--rot", ((i * 37) % 7 - 3) * 0.6 + "deg");
      deck.appendChild(c);
    }
  }

  // Take the top card off the deck; returns where it was on screen and its tilt.
  // The deck's own box plus the card's offset, not the card's rect: a rotated card's
  // bounding box is larger than the card, so the draw would start with a jump.
  function takeFromDeck() {
    var deck = $("deck");
    var top = deck.lastElementChild;
    if (!top) return null;
    var r = deck.getBoundingClientRect();
    var i = parseFloat(top.style.getPropertyValue("--i")) || 0;
    var from = {
      left: r.left + i * 2, top: r.top - i * 2.5, width: r.width, height: r.height,
      rot: parseFloat(top.style.getPropertyValue("--rot")) || 0
    };
    top.remove();
    return from;
  }

  // Draw a card from the deck to the slot, face down, then flip it.
  async function drawCard(item, opts) {
    opts = opts || {};
    var mine = flow;
    var slot = $("card-slot");
    slot.querySelectorAll(".tcard").forEach(function (c) { c.remove(); });
    var card = makeCard(item);
    slot.appendChild(card);
    var from = takeFromDeck();
    var inner = card.querySelector(".tcard-inner");

    if (REDUCED) {
      card.style.opacity = 0;
      inner.style.transform = "rotateY(180deg)";
      if (!(await wait(opts.pause || 300))) return false;
      card.style.transition = "opacity 700ms ease";
      card.style.opacity = 1;
      Sound.flip(700);
      return wait(700);
    }

    var to = card.getBoundingClientRect();
    if (from && to.width) {
      var dx = from.left + from.width / 2 - (to.left + to.width / 2);
      var dy = from.top + from.height / 2 - (to.top + to.height / 2);
      var s = from.width / to.width;
      await finished(card.animate([
        { transform: "translate(" + dx + "px," + dy + "px) scale(" + s + ") rotate(" + from.rot + "deg)" },
        { transform: "none" }
      ], { duration: opts.slide || 600, easing: "cubic-bezier(0.16, 0.8, 0.3, 1)" }));
    }
    if (!(await wait(opts.pause || 300))) return false;

    if (opts.glow) $("card-glow").classList.toggle("strong", opts.glow === "strong");
    if (opts.glow) $("card-glow").classList.add("in");
    var flipMs = opts.flip || 900;
    Sound.flip(flipMs); // the swoosh peaks as the card turns edge-on, half way through
    var anim = inner.animate([
      { transform: "rotateY(0deg) scale(1)" },
      { transform: "rotateY(90deg) scale(1.04)", offset: 0.5 },
      { transform: "rotateY(180deg) scale(1)" }
    ], { duration: flipMs, easing: "cubic-bezier(0.45, 0, 0.25, 1)", fill: "forwards" });
    await finished(anim);
    inner.style.transform = "rotateY(180deg)";
    anim.cancel();
    card.classList.add("face-up");
    return mine === flow;
  }

  // --- Home and About ----------------------------------------------------------
  // The page opens on Home: the history Timeline up to Now, the capability gauge, the
  // title, Play (the Disclaimer, then the game) and About.
  // The results' Home button comes back here, leaving the game behind.

  function showHome() {
    var fromGame = isActive("table");
    // v5.7: mid-game, the game is paused, not left behind: its overlays fade out with the
    // table and come back on Continue, and the gauge's place in the game is kept.
    var pausing = fromGame && gameLive;
    if (pausing) {
      pause();
      held.overlays = ["event-panel", "interlude", "tipping"].filter(function (id) { return $(id).classList.contains("on"); });
      held.overlays.forEach(function (id) { $(id).classList.remove("on"); });
      held.gauge = { item: gaugeNow.item, g: gaugeView.g };
    } else if (!paused) {
      cancelFlow();
    }
    hideTip();
    $("strip").classList.remove("tied");
    showStrip(false);
    homeButtons();
    showScreen("home");
    homeTimeline();
    // The gauge stays in the corner on Home, showing where AI is now.
    $("gauge").style.removeProperty("--away");
    $("strip-bg").style.removeProperty("--away");
    resetGauge(true);
    $("gauge").classList.add("on");
    if (fromGame && !pausing) {
      Sound.dip(false);
      $("event-panel").classList.remove("on");   // they fade out with the table
      $("interlude").classList.remove("on");
      $("tipping").classList.remove("on");
      // Once the table has faded out, clear it; the next game starts fresh anyway.
      wait(1100).then(function (ok) {
        if (!ok) return;
        resetTable();
        $("table").scrollTop = 0;
      });
    }
  }

  // v5.7: Play, or Continue and Restart while a game is paused.
  var held = { overlays: [], gauge: null };
  function homeButtons() {
    var key = paused ? "Continue button" : "Play button";
    $("home-play").textContent = ui(key);
    $("about-play").textContent = ui(key);
    $("home-restart").hidden = !paused;
  }

  // Continue: back to the paused game, exactly where it was.
  async function continueGame() {
    hideTip();
    showScreen("table");
    gaugeView.home = false;
    var y = story.settings.gaugeYears;
    if (held.gauge) {
      gaugeNow.item = held.gauge.item;
      updateGauge(y[0] + held.gauge.g * (y[1] - y[0]));
    }
    setGauge(state.gauge);
    showStrip(true);
    if (held.overlays.indexOf("interlude") !== -1) document.body.classList.add("il-lift");
    held.overlays.forEach(function (id) { $(id).classList.add("on"); });
    held.overlays = [];
    var mine = flow;
    setTimeout(function () { if (mine === flow) resume(); }, 600 / SPEED); // as the table fades back in
  }

  // Restart: a new game, without the Disclaimer (like Play again).
  function restartGame() {
    cancelFlow();
    resume(); // the paused game's timers now resolve as cancelled
    held.overlays = [];
    state = null;
    resetTable();
    $("table").scrollTop = 0;
    startGame();
  }

  // The history Timeline on Home: every entry evenly spaced along one line, ending at Now,
  // labels alternating above and below. The line runs on past both ends and fades out.
  // Hovering (or tapping) an entry shows its one line. The first time Home is shown it
  // drifts slowly from the oldest entry to Now; touching it stops the drift.
  var homeTl = { built: false, drifted: false, raf: 0 };
  var HTL = { delay: 900, drift: 6000 };

  function buildHomeTimeline() {
    var track = doc.querySelector("#home-tl .htl-track");
    track.innerHTML = "";
    track.appendChild(el("span", "htl-line"));
    story.history.forEach(function (ev, i) {
      var item = el("button", "htl-item " + (i % 2 ? "below" : "above"));
      item.type = "button";
      item.style.setProperty("--i", i);
      var dot = el("span", "htl-dot");
      dot.style.setProperty("--dc", homeDotColor(i / Math.max(1, story.history.length - 1)));
      item.appendChild(dot);
      var label = el("span", "htl-label");
      label.appendChild(text("span", "htl-date", ev.date));
      label.appendChild(text("span", "htl-title", ev.title));
      item.appendChild(label);
      track.appendChild(item);
      bindTip(item, function () { return ev.line; }, { anchor: label, above: i % 2 === 0 });
    });
    var now = el("div", "htl-item htl-now " + (story.history.length % 2 ? "below" : "above"));
    now.style.setProperty("--i", story.history.length);
    now.innerHTML = '<span class="htl-dot"></span><span class="htl-label"><span class="htl-title"></span></span>';
    now.querySelector(".htl-title").textContent = ui("Now marker");
    track.appendChild(now);
    track.style.setProperty("--n", story.history.length + 1);
    var box = $("home-tl");
    var stop = function () { cancelAnimationFrame(homeTl.raf); homeTl.raf = 0; };
    ["wheel", "pointerdown", "touchstart", "keydown"].forEach(function (t) { box.addEventListener(t, stop, { passive: true }); });
    // A vertical mouse wheel scrolls the line sideways, while there's room to.
    box.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      var max = box.scrollWidth - box.clientWidth;
      if (max <= 0 || (e.deltaY < 0 && box.scrollLeft <= 0) || (e.deltaY > 0 && box.scrollLeft >= max)) return;
      e.preventDefault();
      box.scrollLeft += e.deltaY;
    }, { passive: false });
    box.addEventListener("scroll", function () { if (tipFor && box.contains(tipFor)) hideTip(); }, { passive: true });
    homeTl.built = true;
  }

  // Each dot's color, from oldest (t = 0) to newest (1): a blend along SETTINGS → Round colors.
  function homeDotColor(t) {
    var cs = story.settings.roundColors.map(function (h) {
      var n = parseInt(h.replace("#", ""), 16);
      return [n >> 16, (n >> 8) & 255, n & 255];
    });
    if (cs.length < 2) return cs.length ? story.settings.roundColors[0] : "var(--text-2)";
    var x = t * (cs.length - 1), i = Math.min(cs.length - 2, Math.floor(x)), k = x - i;
    var c = cs[i].map(function (v, j) { return Math.round(v + (cs[i + 1][j] - v) * k); });
    return "rgb(" + c.join(", ") + ")";
  }

  // Where the scroller sits with Now in view: about three quarters across (on phones,
  // a little past the middle, so its label stays clear of the fade).
  function homeTlEnd() {
    var box = $("home-tl");
    var now = box.querySelector(".htl-now");
    var max = box.scrollWidth - box.clientWidth;
    var at = box.clientWidth <= 760 ? 0.6 : 0.74;
    return Math.max(0, Math.min(max, now.offsetLeft - box.clientWidth * at));
  }

  function placeHomeTimeline() {
    cancelAnimationFrame(homeTl.raf);
    homeTl.raf = 0;
    $("home-tl").scrollLeft = homeTlEnd();
  }

  function homeTimeline() {
    if (!homeTl.built) buildHomeTimeline();
    if (homeTl.drifted || REDUCED) { homeTl.drifted = true; placeHomeTimeline(); return; }
    homeTl.drifted = true;
    var box = $("home-tl");
    box.scrollLeft = 0;
    var ease = function (t) { return 0.5 - 0.5 * Math.cos(Math.PI * t); };
    var start = 0;
    var step = function (t) {
      if (!homeTl.raf) return;
      if (!start) start = t;
      var k = Math.min(1, (t - start) / HTL.drift);
      box.scrollLeft = homeTlEnd() * ease(k);
      homeTl.raf = k < 1 ? requestAnimationFrame(step) : 0;
    };
    wait(HTL.delay).then(function (ok) {
      if (!ok || !isActive("home")) { placeHomeTimeline(); return; }
      homeTl.raf = requestAnimationFrame(step);
    });
  }

  function showAbout() {
    hideTip();
    $("gauge").classList.remove("on");
    $("about").scrollTop = 0;
    showScreen("about");
  }

  // --- The Futures collection (v5.8) -------------------------------------------
  // Every Future the player has reached, kept in this browser only. Each is remembered
  // with the story it was told in and that game's Ending line, so it reads again as it did.

  function foundFutures() {
    try { return JSON.parse(root.localStorage.getItem(FOUND_KEY)) || {}; } catch (e) { return {}; }
  }
  function rememberFuture(f, st) {
    var found = foundFutures();
    var end = Engine.storyText(state, st);
    found[f.id] = { story: f.stories.indexOf(st), ending: end.length > st.text.length ? end[end.length - 1] : "" };
    try { root.localStorage.setItem(FOUND_KEY, JSON.stringify(found)); } catch (e) { /* storage blocked */ }
  }

  function showFutures() {
    hideTip();
    $("gauge").classList.remove("on");
    var found = foundFutures(), grid = $("futures-grid"), n = 0;
    grid.innerHTML = "";
    story.futures.forEach(function (f) {
      var got = found[f.id] && f.stories[found[f.id].story] ? found[f.id] : null;
      var cell = el(got ? "button" : "div", "fcell" + (got ? " found" : ""));
      if (got) {
        n++;
        cell.type = "button";
        setAccent(cell, f.accent);
        cell.appendChild(thumb(f.stories[got.story], "fcell-card"));
        cell.appendChild(text("span", "fcell-title", f.title));
        cell.appendChild(text("span", "fcell-tagline", f.tagline));
        cell.addEventListener("click", function () { openFutureStory(f, got); });
      } else {
        cell.appendChild(el("span", "fcell-frame", HOURGLASS));
      }
      grid.appendChild(cell);
    });
    $("futures-tally").textContent = ui("Collection tally", { found: n, total: story.futures.length });
    closeFutureStory();
    $("futures").scrollTop = 0;
    showScreen("futures");
  }

  function openFutureStory(f, got) {
    var panel = $("fs-panel"), st = f.stories[got.story];
    setAccent(panel, f.accent);
    setFace($("fs-card").querySelector(".cface"), st);
    $("fs-title").textContent = f.title;
    $("fs-tagline").textContent = f.tagline;
    var box = $("fs-text");
    box.innerHTML = "";
    st.text.concat(got.ending ? [got.ending] : []).forEach(function (p) { box.appendChild(richEl("p", "", p)); });
    panel.scrollTop = 0;
    panel.classList.add("on");
    $("futures").classList.add("reading");
  }
  function closeFutureStory() { $("fs-panel").classList.remove("on"); $("futures").classList.remove("reading"); }

  function initHome() {
    $("about-title").textContent = story.about.heading;
    // *words* in the About text are italic (it's the only place that uses them).
    var about = $("about-text");
    about.innerHTML = "";
    story.about.text.forEach(function (p) { about.appendChild(el("p", "", rich(p).replace(/\*([^*]+)\*/g, "<em>$1</em>"))); });
    if (story.about.signature) about.appendChild(text("p", "about-sign", story.about.signature));
    $("home-play").addEventListener("click", function () { if (isActive("home")) (paused ? continueGame : play)(); });
    $("home-restart").addEventListener("click", function () { if (isActive("home") && paused) restartGame(); });
    $("home-about").addEventListener("click", showAbout);
    $("home-futures").addEventListener("click", function () { if (isActive("home")) showFutures(); });
    $("futures-back").addEventListener("click", function () { if (isActive("futures")) showHome(); });
    $("fs-back").addEventListener("click", closeFutureStory);
    $("about-back").addEventListener("click", function () { if (isActive("about")) showHome(); });
    $("about-play").addEventListener("click", function () { if (isActive("about")) (paused ? continueGame : play)(); });
    $("btn-home").addEventListener("click", showHome);
    // Back sits where About's Back button is, so the second click of a
    // double-click there is ignored for a moment after the screen changes.
    $("home-corner").addEventListener("click", function () {
      if (!isActive("home") && Date.now() - screenChanged > 600 / SPEED) showHome();
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (isActive("futures") && $("fs-panel").classList.contains("on")) closeFutureStory();
      else if (isActive("about") || isActive("futures")) showHome();
    });
  }

  // --- Disclaimer ------------------------------------------------------------

  // Play: the Disclaimer fades in, stays 5 s, fades out slowly, and the game begins.
  var DISCLAIMER = { in: 2100, hold: 5000, out: 2200 }; // .disclaimer-inner in styles.css
  async function play() {
    cancelFlow();
    hideTip();
    showStrip(false);
    var box = $("disclaimer");
    box.classList.remove("leaving");
    showScreen("disclaimer");
    if (!(await wait(DISCLAIMER.in + DISCLAIMER.hold))) return;
    box.classList.add("leaving");
    if (!(await wait(DISCLAIMER.out))) return;
    startGame();
  }

  // --- Alternating timelines -------------------------------------------------
  // The player's Timeline: a central spine with entries alternating left and right
  // (one column, spine on the left, on phones). Entries are absolutely positioned;
  // an optional `gapPx(i)` sets the space before entry i.
  // Entries marked `data-balance` (the player's cards and Events) aren't strictly
  // alternating: each goes on whichever side has less content above it so far, like a
  // two-column masonry layout, still in chronological order from top to bottom. Its
  // connector attaches at its date line, or at its middle when that keeps the dots on
  // the spine from bunching up (see `connect()`).

  function layoutAlternating(container, opts) {
    var narrow = isNarrow();
    container.classList.toggle("narrow", narrow);
    var nodes = Array.prototype.slice.call(container.querySelectorAll(".atl-item"));
    var minStep = narrow ? 0 : (opts.minStep || 48);
    var space = opts.space || 26;
    var lastBottom = { left: 0, right: 0 };
    var prevTop = -Infinity;
    var prevSide = "right";
    var prevDot = -Infinity;
    var y = opts.start || 0;
    nodes.forEach(function (n, i) {
      var side = n.dataset.side;
      if (n.dataset.balance && !narrow) {
        var a = lastBottom.left, b = lastBottom.right;
        side = Math.abs(a - b) < 1 ? (prevSide === "left" ? "right" : "left") : (a < b ? "left" : "right");
        n.dataset.side = side;
        n.classList.toggle("left", side === "left");
        n.classList.toggle("right", side === "right");
      }
      if (side === "left" || side === "right") prevSide = side;
      var h = n.offsetHeight;
      var t = i === 0 ? y : prevTop + Math.max(minStep, opts.gapPx ? opts.gapPx(i) : 0);
      if (narrow || side === "center") {
        t = Math.max(t, lastBottom.left + space, lastBottom.right + space);
      } else {
        t = Math.max(t, lastBottom[side] + space);
        // Never start above the last centred entry.
        t = Math.max(t, lastBottom.center || 0);
      }
      n.style.top = t + "px";
      prevTop = t;
      if (n.dataset.balance) prevDot = connect(n, t, h, prevDot);
      var bottom = t + h;
      if (narrow || side === "center") {
        lastBottom.left = lastBottom.right = bottom;
        lastBottom.center = bottom + space;
      } else {
        lastBottom[side] = bottom;
      }
    });
    var end = Math.max(lastBottom.left, lastBottom.right) + (opts.end || 0);
    container.style.height = end + "px";
    return end;
  }

  // Where an entry's dot and connector meet the spine: its date line, unless that
  // would sit within 40px of the previous dot, then its middle if that's roomier.
  function connect(n, top, h, prevDot) {
    var date = n.querySelector(".atl-date");
    var y = 20;
    if (date) {
      var r = date.getBoundingClientRect();
      y = r.top + r.height / 2 - n.getBoundingClientRect().top;
    }
    var mid = h / 2;
    if (top + y - prevDot < 40 && top + mid - prevDot > top + y - prevDot) y = mid;
    n.style.setProperty("--cy", Math.round(y) + "px");
    return top + y;
  }

  // The Future's year (UI TEXT → Future dateline), where the graph's fill ends.
  function futureYear() { return parseInt(ui("Future dateline"), 10) || 2060; }

  function nowWhen() {
    var m = /(\d{4})/.exec(ui("Now marker"));
    var year = m ? +m[1] : 2026;
    var last = story.history.length ? story.history[story.history.length - 1].when : year;
    return Math.max(last + 0.04, year + 0.79);
  }

  function easeInOut(k) { return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; }

  function historyItem(ev, side) {
    var item = el("div", "atl-item atl-history " + side);
    item.dataset.side = side;
    item.appendChild(el("span", "atl-dot"));
    item.appendChild(el("span", "atl-link"));
    var card = el("div", "atl-card");
    card.appendChild(text("p", "atl-date", ev.date));
    card.appendChild(text("h3", "atl-title", ev.title));
    item.appendChild(card);
    item.dataset.source = ev.source;
    return item;
  }

  function nowItem() {
    var now = el("div", "atl-item atl-now",
      '<span class="atl-dot now-dot"></span><div class="atl-card"><p class="now-label"></p></div>');
    now.dataset.side = "center";
    now.querySelector(".now-label").textContent = ui("Now marker");
    return now;
  }

  // --- Timeline strip (stays on screen during the game) ----------------------
  // One continuous, linear time scale (the same years per pixel for history and
  // for the player's future), from the first history entry to 2050 or a little past
  // the latest dated item. Every marker is a real history event, Now, a Scenario, an
  // Event or a milestone. Each marker's year is shown in its own color, and every
  // marker always shows its Timeline label.

  var strip = { start: 2017, end: 2050, marks: [] };

  // An exact year stays as it is; "Late 2030s" -> 2038, "2040s" -> 2045, "Early 2030s" -> 2032.
  function yearOf(date) {
    var y = root.StoryParser.yearOf(date);
    return isNaN(y) ? Math.floor(nowWhen()) + 1 : y;
  }

  function buildStrip() {
    var box = $("strip");
    box.classList.remove("recolor", "tied");
    box.style.removeProperty("--away");
    awayBase = 0;
    $("gauge").style.removeProperty("--away");
    $("strip-bg").style.removeProperty("--away");
    box.innerHTML = '<div class="strip-axis"></div><div class="strip-axis strip-axis-tint"></div>';
    strip.hist = [];
    story.history.forEach(function (ev) {
      var dot = el("span", "s-hist");
      dot.dataset.when = ev.when;
      box.appendChild(dot);
      // The major events (those with a Strip label) are labeled from the start.
      if (!ev.strip) return;
      var hm = el("span", "s-hmark", '<span class="s-lead"></span><span class="s-hlabel"><span class="s-date"></span><span class="s-short"></span></span>');
      hm.dataset.when = ev.when;
      hm.querySelector(".s-date").textContent = String(Math.floor(ev.when));
      hm.querySelector(".s-short").textContent = stripLabel(ev.strip);
      box.appendChild(hm);
      strip.hist.push({ node: hm, when: ev.when });
    });
    var now = el("span", "s-now", '<span class="s-now-label"></span>');
    now.firstChild.textContent = ui("Now marker").split(/\s*·\s*/)[0];
    box.appendChild(now);
    var latest = 0;
    story.scenarios.concat(story.events, story.sota).forEach(function (c) { latest = Math.max(latest, yearOf(c.date)); });
    strip.start = Math.floor(story.history.length ? story.history[0].when : 2017);
    strip.end = Math.max(2050, Math.ceil(latest) + 3);
    strip.marks = [];
    hideTip();
  }

  // x position (px) of a year on the strip. On phones the scale starts just before Now, so
  // the player's own 2027 to 2050 gets the whole width (the history is on Home).
  var PHONE_LEAD = 1.2; // years shown before Now on a phone
  // A Timeline label as the strip shows it. Long labels wrap onto two balanced lines (.s-short
  // in styles.css); a hyphenated word is kept whole ("Recursive / self-improvement").
  function stripLabel(s) { return plain(s).replace(/(\w)-(\w)/g, "$1\u2011$2"); }

  function stripX(year) {
    var W = $("strip").clientWidth;
    var phone = W < 700;
    var left = phone ? 16 : 28;
    var right = W - (phone ? 104 : 348); // the line stops short of the gauge (top right)
    var start = phone ? nowWhen() - PHONE_LEAD : strip.start;
    return left + (year - start) / (strip.end - start) * (right - left);
  }

  function layoutStrip() {
    var box = $("strip");
    var W = box.clientWidth;
    box.classList.toggle("phone", W < 700); // history dots and labels are hidden on phones
    box.querySelectorAll(".s-hist, .s-hmark").forEach(function (d) { d.style.left = stripX(+d.dataset.when) + "px"; });
    box.querySelector(".s-now").style.left = stripX(nowWhen()) + "px";
    layoutMarks(W);
  }

  // Marker positions. Every marker sits on its date on the line, except that it never
  // sits left of an earlier marker (so the strip always reads in date order, and an
  // earlier marker never has to move when a later one arrives), and the first marker
  // stands clear of the Now dot and its glow (NOW_CLEAR, center to center).
  //
  // Labels. Every marker always shows its year and Timeline label. Labels sit in rows
  // above and below the line: a first row close to it and, when space is tight, a second
  // row further out. Within a row, labels keep date order from left to right, so leader
  // lines never cross: a new label goes to the right of the others in its row, as near
  // its marker as it can, and if the row runs out of room the earlier labels in it slide
  // left to make space. Each new label takes the row where it (and anything it nudges)
  // stays closest to its marker, alternating above and below. A thin leader line joins
  // a label to its marker when it can't sit right over it. Labels never overlap one
  // another or the "Now" label, never run off the screen, and keep clear of the gauge.
  // The whole layout is worked out first; labels that move ease to their new places.
  var NOW_CLEAR = 26, NOW_CLEAR_PHONE = 22;
  var NOW_LABEL_LIFT = 14; // the "Now" label's distance above the line (.s-now-label in styles.css)
  function layoutMarks(W) {
    var phone = W < 700;
    var GAPX = phone ? 5 : 10;      // between labels in a row
    var OFF = phone ? 11 : 13;      // from the line to the first row
    var ROW_GAP = phone ? 4 : 6;    // between the rows
    var xNow = stripX(nowWhen());
    // Room in each row: the first row above the line stops short of the gauge; the
    // second sits higher than the gauge, so it only stops short of the mute button.
    var gauge = $("gauge").getBoundingClientRect();
    var mute = $("mute").getBoundingClientRect();
    // The Home button (top left) sits beside the second row above the line, like mute on the right.
    var home = $("home-corner").getBoundingClientRect();
    var bounds = {
      // The gauge sits left of the mute button, beside both rows above the line.
      up: [[4, Math.min(W - 4, (gauge.width ? gauge.left : W) - 8)],
           [home.width ? home.right + 8 : 4, Math.min(W - 4, (gauge.width ? gauge.left : mute.width ? mute.left : W) - 8)]],
      // The gauge reaches below the line, so the rows below that start beside it stop
      // short of it too (each row's top estimated from a label of a year and two lines).
      down: [0, 1, 2].map(function (level) {
        var dot = $("strip").querySelector(".s-now").getBoundingClientRect();
        var axis = dot.top + dot.height / 2;
        var top = axis + OFF + level * ((phone ? 22 : 44) + ROW_GAP);
        var beside = gauge.width && gauge.bottom > top;
        return [4, Math.min(W - 4, beside ? gauge.left - 8 : W - 4)];
      })
    };
    var nowLabel = $("strip").querySelector(".s-now-label");
    var nw = nowLabel ? nowLabel.offsetWidth : 0;
    var hist = phone ? [] : strip.hist || [];
    (strip.hist || []).forEach(function (h) { if (phone) h.node.classList.remove("on"); });
    hist.forEach(function (h) {
      var label = h.node.querySelector(".s-hlabel");
      h.x = stripX(h.when);
      h.w = label.offsetWidth;
      h.h = label.offsetHeight;
    });

    // The labeled history events go in first, each in the row where it sits nearest its dot,
    // all left of "Now". They are fixed: the player's labels go around them. If a player's
    // label ever can't fit (or would need the last-resort row), the history label nearest
    // Now is dropped and the layout redone.
    var rows, drop = 0;
    function placeHistory(keep) {
      var prev = "down";
      hist.forEach(function (h, i) {
        h.side = null;
        if (i >= keep) return;
        var best = null;
        // The first goes below the line (above, it would crowd the Back button), and no
        // history label starts closer to the left edge than the line itself does.
        var sides = i === 0 ? ["down"] : [prev === "up" ? "down" : "up", prev];
        sides.forEach(function (side, k) {
          [0, 1].forEach(function (level) {
            var row = rows[side][level], last = row[row.length - 1];
            var b = [Math.max(bounds[side][level][0], stripX(strip.start)), bounds[side][level][1]];
            var limit = side === "up" && level === 0 ? xNow - nw / 2 - GAPX : xNow - 6;
            var pos = Math.max(b[0], h.x - h.w / 2, last ? last.left + last.w + GAPX : -Infinity);
            if (pos + h.w > Math.min(limit, b[1])) return;
            var cost = Math.abs(pos + h.w / 2 - h.x) + level * 40 + k * 6;
            if (!best || cost < best.cost) best = { side: side, level: level, pos: pos, cost: cost };
          });
        });
        if (!best) return;
        rows[best.side][best.level].push({ left: best.pos, w: h.w, fixed: true });
        h.side = best.side; h.level = best.level; h.left = best.pos;
        prev = best.side;
      });
    }

    // 1. Markers on the line. Two markers never sit closer than MARK_GAP, so an Event dated
    // the same year as a card (or a diamond beside it) is never hidden behind it.
    strip.marks.forEach(function (m, i) {
      var x = stripX(m.year);
      if (i === 0) x = Math.max(x, xNow + (phone ? NOW_CLEAR_PHONE : NOW_CLEAR));
      else x = Math.max(x, strip.marks[i - 1].x + MARK_GAP);
      m.x = x;
      m.node.style.left = x + "px";
    });

    // Try a label at the right end of a row. Returns { pos, lefts (the row's new lefts),
    // cost } or null if it can't fit even with the earlier labels nudged left.
    function tryRow(row, m, w, b) {
      var lefts = row.map(function (r) { return r.left; });
      var last = row[row.length - 1];
      var pos = Math.max(b[0], m.x - w / 2, last ? last.left + last.w + GAPX : -Infinity);
      if (pos + w > b[1]) {
        pos = b[1] - w;
        var limit = pos;
        for (var i = row.length - 1; i >= 0; i--) {
          var most = limit - GAPX - row[i].w;
          if (lefts[i] > most) {
            if (row[i].fixed) return null;
            lefts[i] = most;
          }
          limit = lefts[i];
        }
        if (pos < b[0] || (lefts.length && lefts[0] < b[0])) return null;
      }
      var cost = Math.abs(pos + w / 2 - m.x);
      row.forEach(function (r, i) { cost += Math.abs(lefts[i] - r.left) * 0.75; });
      return { pos: pos, lefts: lefts, cost: cost };
    }

    // 2. Labels into rows, oldest first (after the history labels).
    for (drop = 0; drop <= hist.length; drop++) {
    rows = { up: [[], []], down: [[], [], []] }; // each: [{ left, w, fixed, m }] in order
    placeHistory(hist.length - drop);
    if (nowLabel) rows.up[0].push({ left: xNow - nw / 2, w: nw, fixed: true });
    var prevSide = "up", failed = false;
    strip.marks.forEach(function (m) {
      var label = m.node.querySelector(".s-label");
      m.w = label.offsetWidth;
      m.h = label.offsetHeight;
      var pref = prevSide === "up" ? "down" : "up";
      var best = null;
      [pref, pref === "up" ? "down" : "up"].forEach(function (side, k) {
        rows[side].forEach(function (row, level) {
          var t = tryRow(row, m, m.w, bounds[side][level]);
          if (!t) return;
          t.cost += level * 40 + (level > 1 ? 400 : 0) + k * 6;
          if (!best || t.cost < best.cost) { best = t; best.side = side; best.level = level; }
        });
      });
      if (!best) { // no room anywhere (never expected): the far row, as near as possible
        failed = true;
        best = { side: "down", level: 2, pos: Math.max(4, Math.min(m.x - m.w / 2, W - 4 - m.w)), lefts: rows.down[2].map(function (r) { return r.left; }) };
      }
      // The last-resort row is only for when no history label is left to give way.
      if (best.level > 1 && drop < hist.length) failed = true;
      var row = rows[best.side][best.level];
      row.forEach(function (r, i) { r.left = best.lefts[i]; if (r.m) r.m.left = r.left; });
      row.push({ left: best.pos, w: m.w, m: m });
      m.side = best.side; m.level = best.level; m.left = best.pos;
      prevSide = best.side;
    });
    if (!failed) break;
    }

    // 3. Row heights (the "Now" label counts as part of the first row above the line),
    // then place every label (and its leader line).
    var rowH = { up: [nowLabel ? Math.max(0, nowLabel.offsetHeight + NOW_LABEL_LIFT - OFF) : 0, 0], down: [0, 0, 0] };
    strip.marks.forEach(function (m) { rowH[m.side][m.level] = Math.max(rowH[m.side][m.level], m.h); });
    hist.forEach(function (h) { if (h.side) rowH[h.side][h.level] = Math.max(rowH[h.side][h.level], h.h); });
    hist.forEach(function (h) {
      h.node.classList.toggle("on", !!h.side);
      if (!h.side) return;
      var off = OFF;
      for (var l = 0; l < h.level; l++) off += rowH[h.side][l] + ROW_GAP;
      var dx = h.left - h.x, dy = h.side === "up" ? -(off + h.h) : off;
      h.node.querySelector(".s-hlabel").style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
      h.node.classList.toggle("up", h.side === "up");
      var x2 = dx + h.w / 2, y1 = h.side === "up" ? -3 : 3, y2 = h.side === "up" ? -off + 1 : off - 1;
      var show = Math.abs(x2) > 4 || h.level > 0;
      var lead = h.node.querySelector(".s-lead");
      lead.style.width = (show ? Math.sqrt(x2 * x2 + (y2 - y1) * (y2 - y1)) : 0).toFixed(1) + "px";
      lead.style.transform = "translate(0px," + y1 + "px) rotate(" + Math.atan2(y2 - y1, x2) + "rad)";
    });
    strip.marks.forEach(function (m) {
      var off = OFF;
      for (var l = 0; l < m.level; l++) off += rowH[m.side][l] + ROW_GAP;
      var dx = m.left - m.x;                          // label's left edge, from the marker
      var dy = m.side === "up" ? -(off + m.h) : off;   // label's top edge, from the line
      var label = m.node.querySelector(".s-label");
      label.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
      m.node.classList.toggle("up", m.side === "up");
      m.node.classList.toggle("down", m.side === "down");
      // Leader: from the edge of the marker to the middle of the label's near edge.
      var r = m.node.classList.contains("point") ? 5 : 10;
      var x1 = 0, y1 = m.side === "up" ? -r : r;
      var x2 = dx + m.w / 2, y2 = m.side === "up" ? -off + 1 : off - 1;
      var len = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      var lead = m.node.querySelector(".s-lead");
      var show = Math.abs(x2) > 4 || m.level > 0;
      lead.style.width = (show ? len : 0).toFixed(1) + "px";
      lead.style.transform = "translate(" + x1 + "px," + y1 + "px) rotate(" + Math.atan2(y2 - y1, x2 - x1) + "rad)";
      m.node.classList.toggle("led", show);
    });

    // 4. The strip's background is solid down to just below the lowest label (or the
    // markers, if nothing sits below the line), then fades (--solid-to in styles.css).
    var low = 16;
    strip.marks.forEach(function (m) {
      if (m.side !== "down") return;
      var off = OFF;
      for (var l = 0; l < m.level; l++) off += rowH.down[l] + ROW_GAP;
      low = Math.max(low, off + m.h + 6);
    });
    hist.forEach(function (h) {
      if (h.side !== "down") return;
      var off = OFF;
      for (var l = 0; l < h.level; l++) off += rowH.down[l] + ROW_GAP;
      low = Math.max(low, off + h.h + 6);
    });
    var dot = $("strip").querySelector(".s-now");
    var axisY = dot.offsetTop + dot.offsetHeight / 2; // the Now dot is centered on the line
    $("strip-bg").style.setProperty("--solid-to", Math.round(axisY + low) + "px");
  }

  function showStrip(on) {
    $("strip").classList.toggle("on", on);
    $("gauge").classList.toggle("on", on);
    if (!on) hideTip();
  }

  // At the Future reveal, once the story has been read and the Future card starts to
  // rise toward "See what you chose", the strip (and the gauge) rise and fade with it,
  // tied to the scroll position (--away, 0 to 1), and are gone before the player's
  // Timeline reaches them. Scrolling back up brings them back the same way.
  // v6.0: until See what you chose opens, the strip stays still: the page can scroll only a
  // little past the story, and a strip that moved a few pixels with it looked like a glitch.
  // Once it opens, the rise starts from wherever the scroll already is (awayBase), so it
  // never jumps, and still ends, fully gone, where it did before.
  var awayBase = 0;
  function rawStripAway() {
    var box = $("strip");
    var table = $("table");
    var stripH = box.offsetHeight || 1;
    var col = doc.querySelector(".card-col");
    var cs = root.getComputedStyle(col);
    var view = table.getBoundingClientRect();
    // On desktop the card is sticky, so it starts to rise when the bottom of the stage
    // reaches the bottom of the card. On phones, once the end of the story has scrolled
    // well up the screen (further than the page can go before the Timeline opens).
    var startLine = cs.position === "sticky" ? view.top + parseFloat(cs.top) + col.offsetHeight : view.bottom - 160;
    var p = (startLine - $("stage").getBoundingClientRect().bottom) / stripH;
    if (!$("explain").hidden) p = Math.max(p, 1 - ($("explain").getBoundingClientRect().top - view.top - stripH) / stripH);
    return p;
  }
  function updateStripAway() {
    var box = $("strip");
    if (!$("table").classList.contains("revealing") || !box.classList.contains("tied")) return;
    var p = $("explain").hidden ? 0 : (rawStripAway() - awayBase) / (1 - awayBase);
    var away = Math.max(0, Math.min(1, p)).toFixed(3);
    box.style.setProperty("--away", away);
    $("gauge").style.setProperty("--away", away);
    $("strip-bg").style.setProperty("--away", away);
    if (away > 0) hideTip();
  }

  function markType(item) { return item.kind === "event" ? "event" : item.kind === "sota" ? "milestone" : item.kind === "tipping" ? "tipping" : "scenario"; }

  // A tipping point, as an item for the strip and the results: the beat, at the date of the
  // card whose Choice tipped the world over. On the strip it sits a little after that card
  // (TIP_OFFSET years), so its dark disc isn't hidden behind the card's marker.
  var TIP_OFFSET = 0.4;
  var MARK_GAP = 12; // px between two markers' centers: a 10 px card, or an 11 px diamond, and a hair of space
  function tippingItem(entry) {
    var b = entry.beat;
    return { kind: "tipping", id: b.id, date: entry.date, year: entry.year + TIP_OFFSET, headline: b.headline, label: b.label };
  }
  // A tipping point's symbol (v5.8): a small shattered shape, uneven shards pulled apart
  // from an off-center break, some further than others, never a disc. Fixed points, so it
  // is the same every time: [x, y, how far the shard after it has drifted].
  var SHARDS = [[6.1, 0.2, 0.5], [13.6, 2.9, 1.5], [11.8, 9.8, 0.6], [7.9, 14, 1.2], [0.9, 10.6, 0.4], [1.8, 6.1, 1.8], [0, 3.4, 0.9]];
  function shatterSvg() {
    var cx = 6.4, cy = 7.6, d = '';
    SHARDS.forEach(function (a, i) {
      var b = SHARDS[(i + 1) % SHARDS.length];
      var mx = (a[0] + b[0]) / 2 - cx, my = (a[1] + b[1]) / 2 - cy, k = a[2] / Math.hypot(mx, my);
      var ox = mx * k, oy = my * k; // each shard drifts out from the center along its middle
      d += "M" + (cx + ox).toFixed(2) + " " + (cy + oy).toFixed(2) + "L" + (a[0] + ox).toFixed(2) + " " + (a[1] + oy).toFixed(2) +
        "L" + (b[0] + ox).toFixed(2) + " " + (b[1] + oy).toFixed(2) + "Z";
    });
    return '<svg class="shatter" viewBox="-0.5 -0.5 15 15" aria-hidden="true"><path d="' + d + '"/></svg>';
  }

  // The moment the world tips (v5.8): small fragments of the strip's line burst a little
  // outward from the tipping point's place, and fade. The line itself stays whole.
  function shatterLine(node) {
    if (REDUCED) return;
    var box = $("strip");
    var n = 13;
    for (var i = 0; i < n; i++) {
      var f = el("span", "s-shard");
      f.style.left = node.style.left;
      f.style.width = (2 + Math.random() * 6).toFixed(1) + "px";
      box.appendChild(f);
      var ang = (i / n) * 2 * Math.PI + (Math.random() - 0.5) * 0.5; // cosmetic, so not the seeded draw
      var dist = 12 + Math.random() * 18;
      var spin = (Math.random() - 0.5) * 220;
      var anim = f.animate([
        { transform: "translate(-50%, -50%) rotate(0deg)", opacity: 0.95 },
        { transform: "translate(calc(-50% + " + (Math.cos(ang) * dist).toFixed(1) + "px), calc(-50% + " + (Math.sin(ang) * dist * 0.8).toFixed(1) + "px)) rotate(" + spin.toFixed(0) + "deg)", opacity: 0 }
      ], { duration: 2400 + Math.random() * 900, easing: "cubic-bezier(0.15, 0.7, 0.3, 1)", fill: "forwards" });
      finished(anim).then((function (x) { return function () { x.remove(); }; })(f));
    }
  }

  // An Event's first two sentences, for its hover on the strip.
  function briefOf(item) {
    return sentences(plain((item.summary || []).join(" "))).slice(0, 2).join("").trim();
  }

  // The log entry for a strip item: its Choice, or the milestone as it was reached.
  function logFor(item) {
    if (!state) return null;
    for (var i = state.log.length - 1; i >= 0; i--) {
      var e = state.log[i];
      if ((e.kind === "choice" && e.scenario.id === item.id) || (e.kind === "sota" && e.item.id === item.id)) return e;
    }
    return null;
  }

  // Where an item sits on the strip's time scale.
  function markYear(item) { return item.kind === "tipping" ? item.year : yearOf(item.date); }

  // Add a marker to the strip, invisible until it lands. Scenarios are a tiny copy of
  // the card's face; Events the same in grayscale with a dashed leader; milestones a
  // small diamond (never a card); a tipping point a small dark disc. Each shows its year in its own color and its
  // Timeline label. As it lands, a wash of the marker color (--mark, --mark-event or
  // --mark-sota in styles.css) fades to a 40% tint with a ring.
  function addStripMark(item) {
    var type = markType(item);
    var node = el("div", "s-mark fresh" + (type === "event" ? " event" : "") + (type === "milestone" ? " sota point" : "") + (type === "tipping" ? " tipmark point" : ""),
      '<span class="s-lead"></span><span class="s-card"><span class="cface"><img alt="" draggable="false"></span></span>' +
      '<span class="s-label"><span class="s-date"></span><span class="s-short"></span></span>');
    if (type !== "milestone" && type !== "tipping") setFace(node.querySelector(".cface"), item);
    if (type === "tipping") node.querySelector(".s-card").innerHTML = shatterSvg();
    node.querySelector(".s-date").textContent = item.date;
    node.querySelector(".s-short").textContent = stripLabel(item.label || item.headline);
    node.dataset.id = item.id;
    node.dataset.type = type;
    node.dataset.year = markYear(item);
    setRoundColor(node, cardColor(item));
    // Hover (or tap): a milestone's Short definition and why it happened in this game; a card,
    // the Choice the player made on it; a tipping point, the start of its beat.
    var face = node.querySelector(".s-card");
    if (type === "milestone") bindTip(face, function () { var e = logFor(item); return { text: item.definition, why: e && e.why, color: cardColor(item) }; });
    else if (type === "scenario") bindTip(face, function () { var e = logFor(item); return e ? { head: ui("You chose label"), text: e.choice.text, color: cardColor(item) } : null; });
    else if (type === "event") bindTip(face, function () { return { head: ui("Event label"), text: briefOf(item), color: cardColor(item) }; });
    else if (type === "tipping") bindTip(face, function () { return { head: ui("Tipping point label"), text: item.headline, color: cardColor(item) }; });
    $("strip").appendChild(node);
    strip.marks.push({ node: node, year: markYear(item) });
    layoutStrip();
    // The new label starts in its final place; from now on, moves ease (see .s-label).
    void node.offsetWidth;
    node.classList.remove("fresh");
    return node;
  }

  // A marker that arrives without a flying card (an Event or a milestone): it fades in where it is.
  function landMark(item) {
    var node = addStripMark(item);
    void node.offsetWidth;
    node.classList.add("landed");
    return node;
  }

  // The Future recolors everything that led to it: markers, years and the line
  // fade to its accent over ~1.5 s (see .strip.recolor in styles.css).
  function recolorStrip(color) {
    var box = $("strip");
    setAccent(box, color);
    box.classList.add("recolor");
  }

  // The card shrinks along a gentle curve (~1.4 s, ease-in-out) to the exact spot of
  // its marker, crossfading into the marker's thumbnail as it arrives.
  var FLY_MS = 1400;
  async function flyToStrip(card, mark) {
    var target = mark.querySelector(".s-card");
    if (REDUCED || !card) {
      if (card) { card.style.transition = "opacity 700ms ease"; card.style.opacity = 0; }
      mark.classList.add("landed");
      return wait(700);
    }
    var from = card.getBoundingClientRect();
    var to = target.getBoundingClientRect();
    var ghost = card.cloneNode(true);
    ghost.classList.add("ghost");
    ghost.classList.remove("face-up");
    ghost.style.left = from.left + "px";
    ghost.style.top = from.top + "px";
    ghost.style.width = from.width + "px";
    ghost.style.height = from.height + "px";
    doc.body.appendChild(ghost);
    card.style.visibility = "hidden";

    // Quadratic Bézier from the card to the marker, bowing upward.
    var x0 = from.left + from.width / 2, y0 = from.top + from.height / 2;
    var x2 = to.left + to.width / 2, y2 = to.top + to.height / 2;
    var x1 = (x0 + x2) / 2 + (x2 - x0) * 0.1, y1 = Math.min(y0, y2) - Math.max(50, Math.abs(x2 - x0) * 0.2);
    var endScale = to.width / from.width;
    var CROSS = 0.72; // the crossfade starts here
    var frames = [];
    var STEPS = 30;
    for (var k = 0; k <= STEPS; k++) {
      var t = k / STEPS;
      var e = easeInOut(t);
      var x = (1 - e) * (1 - e) * x0 + 2 * (1 - e) * e * x1 + e * e * x2;
      var y = (1 - e) * (1 - e) * y0 + 2 * (1 - e) * e * y1 + e * e * y2;
      var sc = 1 + (endScale - 1) * e;
      frames.push({
        transform: "translate(" + (x - x0) + "px," + (y - y0) + "px) scale(" + sc + ") rotate(" + (-5 * Math.sin(Math.PI * e)) + "deg)",
        opacity: t <= CROSS ? 1 : 1 - (t - CROSS) / (1 - CROSS),
        offset: t
      });
    }
    var anim = ghost.animate(frames, { duration: FLY_MS, fill: "forwards" });
    var total = FLY_MS / SPEED;
    target.style.transitionDuration = Math.round(total * (1 - CROSS)) + "ms";
    // Start the crossfade on the animation's own clock, so it can't drift from the flight.
    (function check() {
      if (anim.playState === "finished" || anim.currentTime >= total * CROSS) { mark.classList.add("landed"); return; }
      requestAnimationFrame(check);
    })();
    await finished(anim);
    ghost.remove();
    mark.classList.add("landed");
    target.style.transitionDuration = "";
  }

  // --- The capability gauge -------------------------------------------------------
  // Four marks (SETTINGS → Gauge levels), starting at Gauge start. A milestone whose
  // Gauge names a level fills it smoothly to that mark with a soft glow; "hold" gives a
  // gentle pulse. Hovering the gauge, a milestone's diamond or the caption (or tapping
  // them on a phone) shows the milestone's Short definition.

  // The capability gauge is a graph of AI capability over SETTINGS → Gauge years, on a
  // log scale, with the area under it filled in up to the year the game has reached.
  // Its shape follows the real trend (Gauge pace: slow before 2010, about 4 to 5 times a
  // year since), continues at that trend after 2026, and bends with the game: each
  // milestone reached (shown or quiet) multiplies the pace from its date by its Pace, and
  // each Choice by how far it pushed AI's power (Engine.gaugeBends). A runaway curve rescales the chart so it fits.
  var gaugeNow = { level: 0, item: null };
  var gaugeView = { heights: null, g: 0, anim: 0, home: false }; // home: no game's bends
  var captionTimer = null;
  var GAUGE_W = 120, GAUGE_H = 40, GAUGE_STEPS = 256; // a sample every quarter year (see Engine.gaugeHeights)

  // Heights (0 to 1) at GAUGE_STEPS + 1 evenly spaced years (Engine.gaugeHeights), bent by
  // the milestones reached and the Choices made; on Home, the world as it is now.
  // v5.7: a curve that would climb past the top of the chart is scaled down, the whole of it
  // evenly (no knee, so no plateau a decision didn't cause), until its highest point fits.
  function gaugeHeights() {
    var h = Engine.gaugeHeights(state && !gaugeView.home ? state : null, GAUGE_STEPS);
    var top = Math.max.apply(null, h), FIT = 0.97, BASE = 0.03;
    if (top <= FIT) return h;
    var k = (FIT - BASE) / (top - BASE);
    return h.map(function (v) { return BASE + (v - BASE) * k; });
  }

  function gaugeAt(h, g) { // the curve's height at g (0 to 1 across)
    var x = g * GAUGE_STEPS, i = Math.min(GAUGE_STEPS - 1, Math.floor(x)), t = x - i;
    return h[i] + (h[i + 1] - h[i]) * t;
  }

  function paintGauge(h, g) {
    var line = "";
    for (var i = 0; i <= GAUGE_STEPS; i++) {
      line += (i ? " L" : "M") + (i / GAUGE_STEPS * GAUGE_W).toFixed(2) + " " + ((1 - h[i]) * GAUGE_H).toFixed(2);
    }
    var area = line + " L" + GAUGE_W + " " + GAUGE_H + " L0 " + GAUGE_H + " Z";
    var box = $("gauge");
    box.querySelectorAll(".g-line").forEach(function (p) { p.setAttribute("d", line); });
    box.querySelectorAll(".g-area").forEach(function (p) { p.setAttribute("d", area); });
    box.style.setProperty("--g", g.toFixed(4));
    box.style.setProperty("--gy", Math.min(1, gaugeAt(h, g)).toFixed(4));
  }

  // Fill the graph up to `year`, reshaping it for the milestones reached so far. The
  // curve and the fill ease together over 1.4 s, or `ms` (or jump, with `instant` or
  // reduced motion). The fill only moves as time passes (the Interlude and milestones);
  // a major Choice calls this with the year already reached, so only the projection moves.
  // `ease` "out" (v6.1): decelerating, to match the Interlude's count; otherwise in and out.
  function updateGauge(year, instant, ms, ease) {
    var y = story.settings.gaugeYears;
    var to = gaugeHeights(), g1 = Math.max(0, Math.min(1, (year - y[0]) / (y[1] - y[0])));
    var from = gaugeView.heights || to, g0 = gaugeView.g;
    var mine = ++gaugeView.anim;
    gaugeView.heights = to;
    gaugeView.g = g1;
    if (instant || REDUCED) { paintGauge(to, g1); return; }
    var start = null, MS = (ms || 1400) / SPEED;
    function frame(t) {
      if (mine !== gaugeView.anim) return;
      if (start === null) start = t;
      var k = Math.min(1, (t - start) / MS);
      var e = ease === "out" ? 1 - Math.pow(1 - k, 2.2) : k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      paintGauge(from.map(function (v, i) { return v + (to[i] - v) * e; }), g0 + (g1 - g0) * e);
      if (k < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function buildGauge() {
    var names = $("gauge-names");
    names.innerHTML = "";
    story.settings.gaugeLevels.forEach(function (name, i) {
      var n = text("span", "g-name", name);
      n.dataset.i = i;
      names.appendChild(n);
    });
    // v5.7: while a pause holds AI at the line, the level name says so instead.
    var held = text("span", "g-name", ui("Gauge held label"));
    held.dataset.i = "held";
    names.appendChild(held);
    setAccent($("gauge"), cardColor({ kind: "sota" }));
    var g = $("gauge");
    if (g.dataset.drop) return;
    g.dataset.drop = "1";
    var hovered = 0;
    g.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") { openGaugeDrop(true); hovered = Date.now(); } });
    g.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") openGaugeDrop(false); });
    g.addEventListener("click", function (e) {
      e.stopPropagation();
      hideTip();
      var open = g.classList.contains("open");
      openGaugeDrop(!open || Date.now() - hovered < 600);
    });
  }

  // The dropdown under the gauge: the latest milestone ("2031 · AGI achieved") and its
  // Short definition, or, on Home and before the first milestone, where AI is now
  // (UI TEXT → Now marker and Gauge now).
  function openGaugeDrop(on) {
    var g = $("gauge"), item = gaugeNow.item;
    if (on) {
      g.querySelector(".g-drop-head").textContent = item ? item.date + " · " + plain(item.label) : ui("Now marker");
      g.querySelector(".g-drop-text").textContent = plain(item ? item.definition || "" : ui("Gauge now"));
      var e = item ? logFor(item) : null, why = g.querySelector(".g-drop-why");
      why.textContent = e && e.why ? plain(e.why) : "";
      why.hidden = !why.textContent;
      fillAhead(g.querySelector(".g-drop-ahead"));
    }
    g.classList.toggle("open", !!on);
  }

  // v5.6: what the gauge expects next if nothing else changes (Engine.outlook), and why, in
  // this game's own terms (each milestone's Ahead lines); on Home, for the world as it is.
  // With nothing left that moves it: UI TEXT → Gauge ahead beyond, held, level or steady.
  function fillAhead(box) {
    var o = Engine.outlook(state && !gaugeView.home ? state : Engine.newGame(), futureYear());
    box.innerHTML = "";
    box.appendChild(text("p", "g-drop-label", ui("Gauge ahead label")));
    var first = o.next[0];
    if (first) {
      box.appendChild(text("p", "g-drop-head", first.item.date + " \u00b7 " + stripLabel(first.item.label)));
      if (first.text) box.appendChild(text("p", "g-drop-text", plain(first.text)));
      var then = o.next[1];
      if (then) box.appendChild(text("p", "g-drop-then", ui("Gauge ahead then", { next: then.item.date + " \u00b7 " + stripLabel(then.item.label) })));
    } else {
      box.appendChild(text("p", "g-drop-text", ui("Gauge ahead " + o.status)));
    }
  }

  function setGauge(level, how) {
    var g = $("gauge");
    gaugeNow.level = level;
    g.dataset.level = level;
    var held = state && !gaugeView.home && Engine.paceOf(state) === "held";
    g.querySelectorAll(".g-name").forEach(function (e) { e.classList.toggle("on", held ? e.dataset.i === "held" : +e.dataset.i === level); });
    if (how) {
      g.classList.remove("glow", "pulse");
      void g.offsetWidth;
      g.classList.add(how); // "glow" (it moved) or "pulse" (hold), see .gauge in styles.css
    }
  }

  // home: back to where AI is now, easing there (the game's milestones no longer count).
  function resetGauge(home) {
    gaugeNow.item = null;
    gaugeView.home = !!home;
    openGaugeDrop(false);
    updateGauge(nowWhen(), !home);
    clearTimeout(captionTimer);
    $("gauge-caption").classList.remove("on");
    document.body.classList.remove("il-lift");
    $("gauge").classList.remove("glow", "pulse");
    setGauge(state && !home ? state.gauge : Engine.GAUGE_START);
  }

  // "2031 · AGI achieved", near the gauge. v5.8: a stretch's captions stack, one line
  // each, and fade out together 4 s after the last (or when the Interlude ends).
  function caption(item) {
    var c = $("gauge-caption");
    if (!c.classList.contains("on")) c.innerHTML = "";
    var line = text("span", "g-cap", item.date + " · " + plain(item.label));
    c.appendChild(line);
    c.classList.add("on");
    void line.offsetWidth;
    line.classList.add("in");
    clearTimeout(captionTimer);
    captionTimer = setTimeout(function () { c.classList.remove("on"); }, 4000 / SPEED);
  }

  // A short definition on hover, or on tap (phones). opts.anchor: the element to place
  // it by (default the target); opts.above: open above it when there's room.
  // getText returns a string, or { head, text, why, color } (v5.2): a small label in the
  // item's color, the text, and why it happened in this game.
  var tipFor = null;
  function fillTip(tip, t) {
    tip.innerHTML = "";
    if (typeof t === "string") { tip.textContent = plain(t); return; }
    setAccent(tip, t.color || cardColor({ kind: "sota" }));
    if (t.head) tip.appendChild(text("p", "tip-head", t.head));
    if (t.text) tip.appendChild(text("p", "tip-text", plain(t.text)));
    if (t.why) tip.appendChild(text("p", "tip-why", plain(t.why)));
  }
  function bindTip(target, getText, opts) {
    opts = opts || {};
    if (target.dataset.tip) return;
    target.dataset.tip = "1";
    function show() {
      var t = getText();
      if (!t) return;
      var tip = $("tip");
      fillTip(tip, t);
      tip.classList.add("on");
      tipFor = target;
      var r = (opts.anchor || target).getBoundingClientRect();
      var w = tip.offsetWidth, h = tip.offsetHeight;
      var x = Math.max(8, Math.min(r.left + r.width / 2 - w / 2, root.innerWidth - w - 8));
      var y = r.bottom + 10;
      if ((opts.above && r.top - h - 10 >= 8) || y + h > root.innerHeight - 8) y = Math.max(8, r.top - h - 10);
      tip.style.left = x + "px";
      tip.style.top = y + "px";
    }
    // Hover only with a real mouse: a tap on a phone also sends mouse events, and would
    // open the definition and then close it again.
    var hovered = 0;
    target.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") { show(); hovered = Date.now(); } });
    target.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse" && tipFor === target) hideTip(); });
    target.addEventListener("click", function (e) {
      e.stopPropagation();
      // A click just after the hover opened it keeps it open; otherwise a click toggles.
      if (tipFor === target && Date.now() - hovered > 600) hideTip(); else show();
    });
  }
  function hideTip() { $("tip").classList.remove("on"); tipFor = null; openGaugeDrop(false); }

  // --- Interlude: the years count up to the next card, then the lead-in ------------
  // v6.1: a large year counts from the last date shown to the next one, an odometer that
  // moves quickly at first and slows as the last digit falls into place, with a soft tick
  // for each year. When the count reaches a milestone's year it stops for a moment and the
  // milestone's box joins the column on the right (a second one below it), its diamond lands
  // on the strip and the gauge glows or pulses; the graph fills with the count. Then the
  // lead-in, then Continue: nothing moves on by itself. A tap before Continue finishes the
  // count at once.

  // The words shown instead of the count, when it can't run: a date that isn't an exact
  // year, or a next date earlier than the last (counted dates go through setYear).
  function yearsLater(fromDate, toDate) {
    var exact = /^\d{4}$/;
    if (!exact.test(fromDate) || !exact.test(toDate)) return "Years pass.";
    return "That same year.";
  }
  function exactYear(date) { return /^\d{4}$/.test(String(date)) ? +date : null; }

  // Show `year` in the odometer; each digit that changes rolls up into place over `ms`
  // (instantly with no ms, or with reduced motion).
  function setYear(box, year, ms) {
    var digits = String(year).split("");
    if (box.children.length !== digits.length) {
      box.innerHTML = "";
      digits.forEach(function () { box.appendChild(el("span", "od-d", "<span></span>")); });
    }
    box.setAttribute("aria-label", String(year));
    digits.forEach(function (d, i) {
      var slot = box.children[i];
      var cur = slot.lastElementChild;
      if (cur.textContent === d) return;
      if (!ms || REDUCED || !cur.textContent) { slot.innerHTML = ""; slot.appendChild(text("span", "", d)); return; }
      while (slot.children.length > 1) slot.removeChild(slot.firstElementChild); // a digit still leaving
      var next = text("span", "", d);
      slot.appendChild(next);
      var opts = { duration: ms, easing: "cubic-bezier(0.3, 0.6, 0.2, 1)", fill: "forwards" };
      var out = cur.animate([{ transform: "translateY(0)", opacity: 1 }, { transform: "translateY(-100%)", opacity: 0 }], opts);
      out.onfinish = function () { cur.remove(); };
      next.animate([{ transform: "translateY(100%)", opacity: 0 }, { transform: "none", opacity: 1 }], opts);
    });
  }

  // A milestone the count passed: its year and label, its Short definition and why it
  // happened in this game (as on hover).
  function sotaBox(item) {
    var e = logFor(item);
    var b = el("div", "il-sota");
    setAccent(b, cardColor(item));
    b.appendChild(text("p", "il-sota-label", ui("State of the art label")));
    b.appendChild(text("p", "il-sota-head", item.date + " · " + plain(item.label)));
    if (item.definition) b.appendChild(text("p", "il-sota-text", plain(item.definition)));
    if (e && e.why) b.appendChild(text("p", "il-sota-why", plain(e.why)));
    return b;
  }

  // Count from year `from` to `to` (`show`: the odometer is showing; dates that aren't exact
  // years only fill the graph), landing each milestone of `steps` as the count reaches its
  // year. Returns { done, hurry }; hurry() lands the rest at once.
  var COUNT_HOLD = 1500; // the count rests on a milestone's year while its box fades in
  function count(from, to, steps, show) {
    var levels = steps.map(function (step) { Engine.applyStep(state, step); return state.gauge; });
    var yearBox = $("il-year"), col = $("il-sotas");
    var n = show && !REDUCED ? Math.max(0, to - from) : 0; // reduced motion: the year simply appears
    if (show && REDUCED) setYear(yearBox, to, 0);
    var total = 1200 + 500 * Math.sqrt(n);
    // When year k (of n) has fallen into place: the inverse of an ease-out, so the years
    // go by quickly at first and the last one slowly.
    function at(k) { return n ? total * (1 - Math.pow(1 - k / n, 1 / 2.2)) : 0; }
    var rushed = false, rush = null, landed = 0;
    var hurried = new Promise(function (resolve) { rush = resolve; });
    function rest(ms) { return rushed ? Promise.resolve(true) : Promise.race([wait(ms), hurried.then(function () { return true; })]); }
    function land() {
      var b = sotaBox(steps[landed].item);
      // The column is centered, so a new box moves the ones above it up: they glide there.
      var shown = [].slice.call(col.children);
      var before = shown.map(function (c) { return c.getBoundingClientRect().top; });
      col.appendChild(b);
      shown.forEach(function (c, i) {
        var dy = before[i] - c.getBoundingClientRect().top;
        if (dy && !REDUCED) c.animate([{ transform: "translateY(" + dy + "px)" }, { transform: "none" }], { duration: 700, easing: "cubic-bezier(0.4, 0, 0.2, 1)" });
      });
      void b.offsetWidth;
      b.classList.add("in");
      landMilestone(steps[landed].item, levels[landed], true);
      landed++;
    }
    async function landUpTo(year) {
      while (landed < steps.length && (steps[landed].item.year <= year || !n)) {
        land();
        if (!(await rest(COUNT_HOLD))) return false;
      }
      return true;
    }
    // The graph fills to the next milestone (or the end) over the time the count takes to get there.
    function fillFrom(k) {
      var stop = to;
      for (var i = landed; i < steps.length; i++) if (steps[i].item.year > from + k) { stop = Math.min(to, steps[i].item.year); break; }
      var kEnd = Math.max(k + 1, stop - from);
      updateGauge(stop, false, Math.max(400, at(Math.min(n, kEnd)) - at(k)), "out");
    }
    var done = (async function () {
      if (!n) updateGauge(to, false, Math.max(1600, steps.length * COUNT_HOLD), "out");
      if (!(await landUpTo(from))) return false;
      var filling = -1;
      for (var k = 1; k <= n && !rushed; k++) {
        if (filling < 0 || landed > filling) { filling = landed; fillFrom(k - 1); }
        var d = Math.max(120, Math.min(1000, 0.85 * (at(k) - at(k - 1))));
        if (!(await rest(at(k) - at(k - 1) - d))) return false;
        if (rushed) break;
        setYear(yearBox, from + k, d);
        if (!(await rest(d))) return false;
        if (rushed) break;
        Sound.tick(k === n);
        if (landed < steps.length && steps[landed].item.year <= from + k) filling = -1; // refill after the rest
        if (!(await landUpTo(from + k))) return false;
      }
      if (rushed) {
        if (show) setYear(yearBox, to, 0);
        while (landed < steps.length) land();
        updateGauge(to, false, 600, "out");
        return wait(700);
      }
      return true;
    })();
    return { done: done, hurry: function () { rushed = true; rush(); } };
  }

  // opts: { from, to } the dates counted between (from: the last item shown), `lead` the
  // lead-in under the year (none before an Event), `color` the accent of what was just
  // shown, `steps` the stretch's milestones. Ends on Continue.
  async function interlude(opts) {
    var box = $("interlude");
    if (opts.color) setAccent(box, opts.color);
    var yearEl = $("il-year"), gapEl = $("il-gap"), leadEl = $("il-lead"), cont = $("il-continue");
    var lead = opts.lead || "";
    var y0 = exactYear(opts.from), y1 = exactYear(opts.to);
    var show = y0 !== null && y1 !== null && y1 >= y0;
    var fromYear = yearOf(opts.from), toYear = Math.max(yearOf(opts.to), fromYear);
    $("il-sotas").innerHTML = "";
    yearEl.hidden = !show;
    gapEl.hidden = show;
    if (show) setYear(yearEl, y0, 0); else gapEl.textContent = yearsLater(opts.from, opts.to);
    leadEl.innerHTML = inline(lead);
    leadEl.hidden = !lead;
    resetFade([yearEl, gapEl, leadEl, cont]);
    document.body.classList.add("il-lift");
    box.classList.add("on");
    setPhase("busy");
    if (!(await wait(300))) return false;
    (show ? yearEl : gapEl).classList.add("in");
    if (!(await wait(700))) return false;
    var run = count(show ? y0 : fromYear, show ? y1 : toYear, opts.steps || [], show);
    function hurry(e) { if (!cont.contains(e.target)) run.hurry(); }
    box.addEventListener("click", hurry);
    var ok = await run.done;
    box.removeEventListener("click", hurry);
    if (!ok) return false;
    // The last digit has fully settled, and no leaving digit is left behind.
    if (!(await settled([].slice.call(yearEl.querySelectorAll("span"))))) return false;
    [].forEach.call(yearEl.children, function (slot) { while (slot.children.length > 1) slot.removeChild(slot.firstElementChild); });
    if (lead) {
      if (!(await wait(500))) return false;
      leadEl.classList.add("in");
      if (!(await wait(900))) return false;
    }
    cont.classList.add("in");
    if (!(await settled([yearEl, gapEl, leadEl, cont]))) return false;
    setPhase("interlude");
    if (!(await waitForTap(cont))) return false;
    setPhase("busy");
    box.classList.remove("on");
    ok = await wait(1000);
    document.body.classList.remove("il-lift");
    $("gauge-caption").classList.remove("on");
    return ok;
  }

  // --- Rounds, Events and milestones ----------------------------------------------
  // Each Scenario is drawn and flipped, and its summary appears beside it (the full
  // story on request). The player chooses and reads "As a result…", and the card flies
  // onto the strip. Then the transition: any Event (a panel, "Out of your hands") and
  // the milestones up to the next card's date, in date order; then the interlude and
  // the next card.

  var state = null;
  // Every Scenario and Event shown this session ({ id: true }), so replays favor new
  // cards. In memory only: it resets when the page reloads.
  var sessionSeen = {};
  var picks = [];   // test mode: each card drawn, with the unseen candidates it was drawn from
  var gameNumber = 0;
  var current = null;
  var locked = false;

  // The game fades in after the Disclaimer: the strip and gauge fade
  // in at the top, the deck slides in, and the first card is dealt. Play again comes
  // straight here too. The deck holds one card per Round, plus the Future.
  async function startGame() {
    cancelFlow();
    gameLive = true;
    showStrip(false);
    setPhase("busy");
    state = Engine.newGame(sessionSeen);
    picks = [];
    gameNumber++;
    result = null;
    futureStory = null;
    buildStrip();
    resetGauge();
    buildDeck(Engine.ROUNDS + 1);
    resetTable();
    Sound.dip(false);
    var deck = $("deck");
    deck.classList.remove("arrive");
    deck.classList.add("waiting");
    showScreen("table");
    $("table").scrollTop = 0;
    layoutStrip();
    if (!(await wait(300))) return;
    showStrip(true);
    if (!(await wait(400))) return;
    deck.classList.remove("waiting");
    deck.classList.add("arrive");
    if (!(await wait(REDUCED ? 900 : 1500))) return;
    playRound(Engine.selectScenario(state));
  }

  function resetTable() {
    $("card-slot").querySelectorAll(".tcard").forEach(function (c) { c.remove(); });
    $("card-glow").classList.remove("in", "strong");
    resetFade([$("round-marker")]);
    $("round-view").hidden = true;
    $("future-view").hidden = true;
    $("explain").hidden = true;
    $("table").classList.remove("revealing");
    $("event-panel").classList.remove("on");
    $("interlude").classList.remove("on");
    $("tipping").classList.remove("on");
    hideTip();
  }

  function fillParagraphs(box, paras) {
    box.innerHTML = "";
    paras.forEach(function (p) { box.appendChild(richEl("p", "", p)); });
  }

  // "2040s · Geneva": the date exactly as written; small caps only on the place.
  function fillDateline(node, item) {
    node.innerHTML = "";
    node.appendChild(text("span", "dl-date", item.date));
    if (item.place) {
      node.appendChild(doc.createTextNode(" · "));
      node.appendChild(text("span", "dl-place", item.place));
    }
  }

  // A "Read the full story" (or "Read more") toggle: the full story opens below the
  // summary with a smooth height and fade (.expand in styles.css), and closes again
  // ("Show less"). Collapsed on every new card.
  // `onToggle(open)` (optional) is told each time it opens or closes.
  function setupToggle(button, box, openKey, onToggle) {
    function render(open) {
      box.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));
      button.textContent = ui(open ? "Show less button" : openKey);
      if (onToggle) onToggle(open);
    }
    render(false);
    button.onclick = function () { render(!box.classList.contains("open")); };
  }

  // v5.7: an Event panel sits just below the strip; with Read more open it glides up to
  // the middle of the window, as tall as it needs (up to the window less EP_MARGIN above
  // and below), and glides back down on Show less, in step with the story opening.
  var EP_MARGIN = 48;
  function placeEventPanel(open) {
    var panel = $("event-panel"), inner = $("ep-inner");
    panel.classList.toggle("ep-open", open);
    if (!open) { panel.style.paddingTop = ""; return; }
    var vh = root.innerHeight;
    var clip = $("ep-more").querySelector(".expand-clip");
    var opened = inner.offsetHeight - clip.offsetHeight + $("ep-body").offsetHeight;
    var h = Math.min(opened, vh - 2 * EP_MARGIN);
    panel.style.paddingTop = Math.max(EP_MARGIN, Math.round((vh - h) / 2)) + "px";
  }

  // Set up the reading column for a Scenario.
  function prepareView(item) {
    var table = $("table");
    setAccent(table, cardColor(item));
    table.scrollTo({ top: 0 });
    var view = $("round-view");
    fillDateline($("dateline"), item);
    $("headline").innerHTML = inline(item.headline);
    fillParagraphs($("summary"), item.summary.length ? item.summary : item.story.slice(0, 1));
    fillParagraphs($("body"), item.story);
    setupToggle($("story-toggle"), $("story-more"), "Read full story button");
    view.classList.remove("out");
    $("reading").style.minHeight = "";
    $("choices").style.height = "";
    $("result").hidden = true;
    $("btn-continue").hidden = true;
    $("choices").innerHTML = "";
    $("question").textContent = "";
    view.hidden = false;
    return view;
  }

  // `pick` is { scenario, lead, fresh } from the engine.
  async function playRound(pick) {
    var s = pick.scenario;
    current = s;
    sessionSeen[s.id] = true;
    picks.push({ round: state.round, id: s.id, fresh: pick.fresh || [], afterHumanity: !!s.afterHumanity, tipped: !!state.flags.after_humanity, lead: pick.lead || "" });
    locked = false;
    prepareView(s);
    var marker = $("round-marker");             // above the card, not in the reading column
    var parts = [$("dateline"), $("headline"), $("summary"), $("story-toggle")];
    var question = $("question");
    marker.textContent = ui("Round marker", { n: state.round, total: Engine.ROUNDS });
    question.innerHTML = inline(s.question);
    resetFade([marker, question].concat(parts));

    var box = $("choices");
    box.classList.remove("locked");
    var cards = Engine.shuffle(s.choices).map(function (choice) {
      var b = el("button", "choice fade");
      b.type = "button";
      b.innerHTML = inline(choice.text);
      b.addEventListener("click", function () { onChoose(b, choice); }, { once: true });
      box.appendChild(b);
      return b;
    });

    // Draw and flip; the summary fades in beside the card as the flip ends.
    updateGauge(s.year);
    if (!(await drawCard(s, { glow: true }))) return;
    if (!(await stagger([marker].concat(parts), GAP))) return;
    if (!(await wait(1100))) return;
    question.classList.add("in");
    if (!(await wait(600))) return;
    if (!(await stagger(cards, GAP))) return;
    if (await settled(cards.concat([question, $("summary"), $("headline"), $("dateline")]))) setPhase("choose"); // once everything has faded in
  }

  // Show the Continue button and wait for it (one tap only).
  async function continueButton() {
    var cont = $("btn-continue");
    resetFade([cont]);
    cont.hidden = false;
    void cont.offsetWidth;
    cont.classList.add("in");
    gentleScroll(cont);
    setPhase("continue");
    if (!(await waitForTap(cont))) return false;
    setPhase("busy");
    cont.classList.remove("in");
    return true;
  }

  // The current card flies to the strip and the reading column fades away.
  async function cardToStrip(item) {
    $("round-view").classList.add("out");
    $("round-marker").classList.remove("in");
    $("card-glow").classList.remove("in");
    var card = $("card-slot").querySelector(".tcard");
    var mark = addStripMark(item);
    await flyToStrip(card, mark);
    if (card) card.remove();
    if (!(await wait(400))) return false;
    $("round-view").hidden = true;
    return true;
  }

  var CHOICE_FADE = 700; // matches .choice.dim in styles.css
  var CHOICE_MOVE = 800;

  // Picking a Choice, without any jump: the other two fade out in place (the
  // container keeps its height, and the reading column can't get shorter, so the
  // page never scrolls by itself). Only then are they taken out of layout, and the
  // chosen card glides up to its new place (FLIP, transform only). The result
  // panel then fades in below it. Only opacity and transform animate.
  async function settleChoice(button) {
    var box = $("choices");
    var reading = $("reading");
    reading.style.minHeight = reading.offsetHeight + "px"; // released in prepareView
    box.style.height = box.offsetHeight + "px";
    box.classList.add("locked");
    box.querySelectorAll(".choice").forEach(function (c) { c.classList.add(c === button ? "picked" : "dim"); });
    if (!(await wait(CHOICE_FADE + 50))) return false;

    var first = button.getBoundingClientRect().top;
    box.querySelectorAll(".choice.dim").forEach(function (c) { c.hidden = true; });
    box.style.height = "";
    var shift = first - button.getBoundingClientRect().top;
    if (shift && !REDUCED) {
      await finished(button.animate(
        [{ transform: "translateY(" + shift + "px)" }, { transform: "none" }],
        { duration: CHOICE_MOVE, easing: "cubic-bezier(0.22, 0.8, 0.3, 1)" }));
    }
    return wait(120);
  }

  async function onChoose(button, choice) {
    if (locked) return;
    locked = true;
    setPhase("busy");
    Sound.confirm();
    var scenario = current;
    var beat = Engine.choose(state, scenario, choice);
    if (!(await settleChoice(button))) return;

    // A tipping point: the beat, full screen, in place of "As a result…"; then the card
    // goes to the strip and the dark marker lands beside it.
    if (beat) {
      if (!(await showTipping(beat))) return;
      if (!(await cardToStrip(scenario))) return;
      var tip = state.log.filter(function (e) { return e.kind === "tipping"; })[0];
      shatterLine(landMark(tippingItem(tip)));
      if (!(await wait(2600))) return;
      transition(scenario);
      return;
    }

    // "As a result…": sentences fade in one after another.
    var result = $("result");
    var resultText = $("result-text");
    resultText.innerHTML = "";
    var spans = [];
    choice.result.forEach(function (para) {
      var p = el("p");
      sentences(para).forEach(function (str) {
        var sp = richEl("span", "fade", str);
        p.appendChild(sp);
        spans.push(sp);
      });
      resultText.appendChild(p);
    });
    resetFade([result]);
    result.hidden = false;
    void result.offsetWidth;
    result.classList.add("in");
    // A major Choice (a Brake of 1 or more either way) bends the projection now, slowly;
    // the filled part, the past, stays where it is.
    if (Math.abs(choice.brake || 0) >= 1) updateGauge(scenario.year, false, 3000);
    if (!(await wait(300))) return;
    gentleScroll(result);
    if (!(await wait(600))) return;
    if (!(await stagger(spans, 900))) return; // slow, one sentence at a time
    if (!(await wait(1400))) return;
    if (!(await continueButton())) return;
    if (!(await cardToStrip(scenario))) return;
    transition(scenario);
  }

  // The tipping beat: a full-screen interstitial with no card and no image. Its sentences
  // fade in slowly, one at a time, then Continue.
  // v5.6: the beat in three parts, each under its own title: what happened (the beat's
  // Text), why this decision tipped it (the Choice's Tipping why) and whether it could have
  // been stopped (the beat's Prevented line, naming one of the player's earlier decisions).
  // v5.8: slow, like a soft mourning, a paragraph at a time, and it never scrolls by itself.
  async function showTipping(beat) {
    var box = $("tipping");
    var label = $("tp-label");
    var head = $("tp-headline");
    var textBox = $("tp-text");
    var cont = $("tp-continue");
    var entry = state.log.filter(function (e) { return e.kind === "tipping"; })[0] || {};
    label.textContent = ui("Tipping point label") + " \u00b7 " + (entry.date || "");
    head.innerHTML = inline(beat.headline);
    textBox.innerHTML = "";
    // v5.8: a paragraph at a time, like the Future's story: each part's title comes in just
    // before its first paragraph, and after each paragraph a tap goes on (or, after a slow
    // reading of it, it goes on by itself).
    var steps = []; // [{ title, para, text }]
    function section(key, paras) {
      if (!paras.length) return;
      var sec = el("section", "tp-section");
      var h = text("p", "tp-sub fade", ui(key));
      sec.appendChild(h);
      paras.forEach(function (para, i) {
        var p = richEl("p", "fade", para);
        sec.appendChild(p);
        steps.push({ title: i === 0 ? h : null, para: p, text: para });
      });
      textBox.appendChild(sec);
    }
    section("What happened label", entry.text || beat.text);
    section("Why this decision label", entry.why || []);
    section("Could it have been stopped label", entry.prevented ? [entry.prevented] : []);
    var hint = $("tp-hint");
    setAccent(box, cardColor({ kind: "tipping" }));
    resetFade([label, head, cont, hint]);
    box.scrollTop = 0;
    box.classList.add("on");
    Sound.dip(true);
    if (!(await wait(2200))) return false;
    label.classList.add("in");
    if (!(await wait(1500))) return false;
    head.classList.add("in");
    if (!(await wait(3000))) return false;
    for (var i = 0; i < steps.length; i++) {
      if (steps[i].title) {
        if (i > 0 && !(await wait(600))) return false; // a breath before each new part
        steps[i].title.classList.add("in");
        if (!(await wait(1400))) return false;
      }
      steps[i].para.classList.add("in");
      if (i === steps.length - 1) break;
      if (!(await wait(1600))) return false;
      hint.classList.add("in");
      // Generous: a slow reading of the paragraph just shown (as the Future's story).
      if (!(await waitForTap(box, 3000 + plain(steps[i].text).length * 45))) return false;
      hint.classList.remove("in");
      if (!(await wait(250))) return false;
    }
    if (!(await wait(2200))) return false;
    cont.classList.add("in");
    var all = [label, head, cont, box];
    steps.forEach(function (st) { all = all.concat(st.title ? [st.title, st.para] : [st.para]); });
    if (!(await settled(all))) return false;
    setPhase("tipping");
    if (!(await waitForTap(cont))) return false;
    setPhase("busy");
    box.classList.remove("on");
    Sound.dip(false);
    return wait(2400); // the overlay fades out slowly (see .tipping)
  }

  // After a Choice: any Event and the milestones up to the next card, in date order
  // (planned by the engine), then the interlude and the next card, or the Future.
  async function transition(scenario) {
    var plan = Engine.planTransition(state);
    var last = scenario;
    // v5.8: the milestones of a stretch are shown together, in one motion of the graph
    // (v6.1: the Interlude's count): those before an Event in a count up to it, the rest before the next card.
    var run = [];
    for (var i = 0; i < plan.steps.length; i++) {
      var step = plan.steps[i];
      if (step.kind === "event") {
        // v6.1: the years count up to the Event when milestones lie on the way.
        if (run.length && !(await interlude({ from: last.date, to: step.event.date, color: cardColor(last), steps: run }))) return;
        run = [];
        if (!(await showEventPanel(step))) return;
        last = step.event;
      } else if (step.kind === "milestone") run.push(step);
      else Engine.applyStep(state, step); // a milestone passed (Condition or Slot) or reached quietly
    }
    var color = cardColor(last);
    if (!plan.next) {
      // "7 years pass.": the Future's year less the last date shown, which the count runs from.
      var gap = futureYear() - yearOf(last.date);
      if (!(await interlude({ from: last.date, to: String(futureYear()), lead: ui("Before the Future", { n: gap }), color: color, steps: run }))) return;
      revealFuture();
      return;
    }
    // The years pass, and the graph fills to them.
    if (!(await interlude({ from: last.date, to: plan.next.scenario.date, lead: plan.next.lead, color: color, steps: run }))) return;
    playRound(plan.next);
  }

  // An Event: "Out of your hands", as a lighter panel between rounds (never a card):
  // the date and place, the headline, the summary with "Read more", and Continue.
  // Its Effects apply as it appears; after Continue, its marker joins the strip.
  async function showEventPanel(step) {
    var ev = step.event;
    Engine.applyStep(state, step); // the graph doesn't move for an Event: it shows what AI can do now
    sessionSeen[ev.id] = true;
    var panel = $("event-panel");
    setAccent(panel, cardColor(ev));
    fillDateline($("ep-dateline"), ev);
    $("ep-headline").innerHTML = inline(ev.headline);
    fillParagraphs($("ep-summary"), ev.summary.length ? ev.summary : ev.story.slice(0, 1));
    fillParagraphs($("ep-body"), ev.story);
    setupToggle($("event-toggle"), $("ep-more"), "Read more button", placeEventPanel);
    var label = panel.querySelector(".event-label");
    var cont = $("event-continue");
    var parts = [label, $("ep-dateline"), $("ep-headline"), $("ep-summary"), $("event-toggle")];
    resetFade(parts.concat([cont]));
    $("ep-inner").scrollTop = 0;
    panel.classList.add("on");
    if (!(await wait(500))) return false;
    if (!(await stagger(parts, GAP))) return false;
    // v6.1: a Certain Event (the world agreeing to pause) opens in full, and Continue
    // waits for a reading of it.
    if (ev.certain) {
      if (!(await wait(600))) return false;
      $("event-toggle").click();
      if (!(await wait(Math.min(12000, 3000 + 30 * plain(ev.summary.join(" ")).length)))) return false;
    }
    if (!(await wait(900))) return false;
    cont.classList.add("in");
    if (!(await settled(parts.concat([cont, $("ep-inner"), panel])))) return false;
    setPhase("event");
    if (!(await waitForTap(cont))) return false;
    setPhase("busy");
    panel.classList.remove("on");
    if (!(await wait(800))) return false;
    landMark(ev);
    return wait(900);
  }

  // Milestones: never cards, and they never stop play. v6.1: they land as the Interlude's
  // count passes their year (count()), each with its box there instead of a caption by the gauge.
  function landMilestone(item, level, boxed) {
    gaugeNow.item = item;
    landMark(item);
    if (!boxed) caption(item);
    setGauge(level, level !== gaugeNow.level ? "glow" : "pulse");
  }

  // --- Future reveal ---------------------------------------------------------

  var result = null;
  var futureStory = null;

  // A random story for this Future, avoiding the one shown last time.
  // Only among the stories that fit this game's world (Engine.storiesFor); their index in
  // f.stories is what's remembered.
  // v6.0: a story the game's own path points to (Drawn by) comes first (Engine.chooseStory).
  function pickStory(f) {
    var last = -1;
    try { last = parseInt(root.localStorage.getItem(STORY_KEY + f.id), 10); } catch (e) { /* storage blocked */ }
    var st = Engine.chooseStory(state, f, last);
    try { if (st) root.localStorage.setItem(STORY_KEY + f.id, String(f.stories.indexOf(st))); } catch (e) { /* storage blocked */ }
    return st || { text: [], image: null };
  }

  async function revealFuture() {
    result = Engine.chooseFuture(state);
    var f = result.future;
    updateGauge(futureYear()); // to the Future's year, leaving a sliver of projection after it
    futureStory = pickStory(f);
    rememberFuture(f, futureStory);
    var table = $("table");
    setAccent(table, f.accent);
    table.classList.add("revealing");
    table.scrollTo({ top: 0 });
    Sound.dip(true);

    var view = $("future-view");
    var dateline = $("future-date");
    var title = $("future-title");
    var tagline = $("future-tagline");
    var textBox = $("future-text");
    var hint = $("future-hint");
    var actions = $("reveal-actions");
    // "How we got here": up to three sentences from the player's own decisions.
    var past = $("future-past");
    var pastLabel = $("future-past-label");
    var pastLines = result.lookingBack.map(function (m) { return richEl("p", "fade", m.text); });
    var pastBox = $("future-past-text");
    pastBox.innerHTML = "";
    pastLines.forEach(function (p) { pastBox.appendChild(p); });
    past.hidden = !pastLines.length;
    title.textContent = f.title;
    tagline.textContent = f.tagline;
    textBox.innerHTML = "";
    resetFade([dateline, title, tagline, pastLabel, hint, actions]);
    actions.style.visibility = "hidden";
    view.hidden = false;

    // The final card: slower and more ceremonial, with a glow in the Future's colour.
    $("strip").classList.add("tied"); // from here the strip follows the scroll (updateStripAway)
    updateStripAway();
    if (!(await wait(600))) return;
    // The card shows the image of the story that was picked.
    await drawCard({ kind: "future", image: futureStory.image }, { slide: 900, pause: 1000, flip: 1400, glow: "strong" });
    recolorStrip(f.accent); // everything that led here takes on the Future's color
    if (!(await wait(700))) return;
    dateline.classList.add("in");
    if (!(await wait(900))) return;
    title.classList.add("in");
    if (!(await wait(1600))) return;
    tagline.classList.add("in");
    if (!(await wait(1800))) return;

    // How we got here: slowly, one sentence after the other, with room to read each.
    if (pastLines.length) {
      pastLabel.classList.add("in");
      if (!(await wait(1100))) return;
      for (var j = 0; j < pastLines.length; j++) {
        pastLines[j].classList.add("in");
        gentleScroll(pastLines[j]);
        if (!(await wait(2600 + plain(result.lookingBack[j].text).length * 35))) return;
      }
      if (!(await wait(600))) return;
    }

    // The story, one paragraph at a time. Tap to continue, or wait.
    var paras = Engine.storyText(state, futureStory);
    for (var i = 0; i < paras.length; i++) {
      var p = richEl("p", "fade", paras[i]);
      textBox.appendChild(p);
      void p.offsetWidth;
      p.classList.add("in");
      if (i > 0) gentleScroll(p);
      if (i === paras.length - 1) break;
      if (!(await wait(1200))) return;
      hint.classList.add("in");
      // Generous: roughly a slow reading pace for the paragraph just shown.
      if (!(await waitForTap(table, 3000 + plain(paras[i]).length * 45))) return;
      hint.classList.remove("in");
      if (!(await wait(250))) return;
    }
    if (!(await wait(2200))) return;
    actions.style.visibility = "";
    actions.classList.add("in");
    // Only once every paragraph (and the buttons) has fully faded in.
    if (!(await settled([].slice.call(textBox.children).concat([actions])))) return;
    setPhase("reveal-done");
    gentleScroll(actions);
  }

  // --- "See what you chose" --------------------------------------------------
  // The player's Timeline from Now (recent history fading out above it) to the
  // Future in 2060, then the six hidden Values as coloured, expandable bars.

  var BAR_SCALE = 6; // ±6 fills half the track
  var RECENT_HISTORY = 3;

  function showExplain() {
    var box = $("explain");
    if (!box.hidden) { gentleScroll($("bars"), "values"); return; }
    awayBase = Math.max(0, Math.min(0.9, rawStripAway())); // the strip rises from here on (updateStripAway)
    buildPlayerTimeline();
    buildBars();
    resetFade([box]);
    box.hidden = false;
    layoutPlayerTimeline();
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(layoutPlayerTimeline);
    void box.offsetWidth;
    box.classList.add("in");
    gentleScroll($("bars"), "values", 1400); // v5.8: down far enough to show every Value
    // Starts in each round's color, then slowly takes on the Future's (~1.5 s).
    setTimeout(function () { $("ptl").classList.add("recolor"); }, 1200);
  }

  function entryCard(entry) { return entry.kind === "event" ? entry.event : entry.kind === "sota" ? entry.item : entry.kind === "tipping" ? tippingItem(entry) : entry.scenario; }

  // A Choice, an Event or a milestone on the player's Timeline. Events and milestones
  // are quieter: a tag, the dateline and the headline; milestones have no card.
  function decisionItem(entry, side) {
    var isEvent = entry.kind === "event";
    var isSota = entry.kind === "sota";
    var isTip = entry.kind === "tipping";
    var card = entryCard(entry);
    var isPoint = isSota || isTip;
    var item = el("div", "atl-item seen " + side + (isEvent ? " atl-event" : isSota ? " atl-event atl-sota atl-point" : isTip ? " atl-event atl-tip atl-point" : " atl-decision"));
    item.dataset.side = side;
    item.dataset.balance = "1";
    item.dataset.id = card.id;
    item.dataset.year = yearOf(card.date);
    setRoundColor(item, cardColor(card));
    var dot = item.appendChild(el("span", "atl-dot"));
    if (isTip) dot.innerHTML = shatterSvg();
    item.appendChild(el("span", "atl-link"));
    var box = el("div", "atl-card");
    // An Event is never a card: a small grey rectangle, like its marker on the strip.
    if (isEvent) box.appendChild(el("span", "atl-evmark"));
    else if (!isPoint) box.appendChild(thumb(card, "atl-thumb"));
    var body = el("div", "atl-body");
    if (isEvent) body.appendChild(text("p", "atl-tag", ui("Event label")));
    if (isSota) body.appendChild(text("p", "atl-tag", ui("State of the art label")));
    if (isTip) body.appendChild(text("p", "atl-tag", ui("Tipping point label")));
    var date = el("p", "atl-date");
    fillDateline(date, card);
    body.appendChild(date);
    body.appendChild(text("h3", "atl-title", plain(card.headline)));
    if (isSota && entry.why) body.appendChild(text("p", "atl-why", plain(entry.why)));
    // v6.0: an Event shows what it moved too, so the Values add up.
    if (isEvent) { var evPills = valuePills(entry); if (evPills) body.appendChild(evPills); }
    if (entry.kind === "choice") {
      body.appendChild(text("p", "atl-label", ui("You chose label")));
      body.appendChild(text("p", "atl-choice", plain(entry.choice.text)));
      body.appendChild(text("p", "atl-label", ui("Result label")));
      body.appendChild(richEl("p", "atl-consequence", entry.choice.result.join(" ")));
      var pills = valuePills(entry);
      if (pills) body.appendChild(pills);
    }
    if (isTip) {
      (entry.why || []).forEach(function (p) { body.appendChild(richEl("p", "atl-why", p)); });
      var more = el("div", "expand", '<div class="expand-clip"><div class="body-text atl-tip-more"></div></div>');
      var inner = more.querySelector(".atl-tip-more");
      [[ui("What happened label"), entry.text || entry.beat.text], [ui("Could it have been stopped label"), entry.prevented ? [entry.prevented] : []]].forEach(function (sec) {
        if (!sec[1].length) return;
        inner.appendChild(text("p", "atl-label", sec[0]));
        sec[1].forEach(function (p) { inner.appendChild(richEl("p", "atl-why", p)); });
      });
      var btn = el("button", "read-toggle");
      btn.type = "button";
      body.appendChild(btn);
      body.appendChild(more);
      setupToggle(btn, more, "Read more button");
      // The entry grows or shrinks as it opens, so the Timeline follows it while it moves.
      var toggle = btn.onclick;
      btn.onclick = function () { toggle(); relayoutFor(900); };
    }
    box.appendChild(body);
    item.appendChild(box);
    return item;
  }

  // The Timeline's entries are placed absolutely (layoutAlternating), so while one opens or
  // closes, the layout is redone every frame for `ms`.
  function relayoutFor(ms) {
    var until = performance.now() + ms / SPEED;
    (function frame() {
      if ($("explain").hidden) return;
      layoutPlayerTimeline();
      if (performance.now() < until) requestAnimationFrame(frame);
    })();
  }

  // "+1.5", "−0.75": a Value's change in quarter points, with no trailing zeros.
  function signed(n) {
    var r = Math.round(n * 4) / 4;
    return (r < 0 ? "\u2212" : "+") + String(Math.abs(r));
  }
  function valueTint(node, v) {
    if (!v.color) return;
    node.style.setProperty("--vc", v.color);
    node.style.setProperty("--vc-text", readable(v.color, mix(v.color, "#000000", 0.2)));
  }
  // v5.6: under "As a result…", what the Choice did to each Value: a pill in the Value's
  // color with its name, then the change. After a tipping point, the Values that no longer
  // count (SETTINGS → Values lost at the tipping point) are struck through.
  function valuePills(entry) {
    var applied = entry.applied || {};
    var ids = story.values.filter(function (v) { return applied[v.id]; });
    if (!ids.length) return null;
    var row = el("div", "vchips");
    ids.forEach(function (v) {
      var lost = (entry.lost || []).indexOf(v.id) !== -1;
      var chip = el("span", "vchip" + (lost ? " lost" : ""));
      valueTint(chip, v);
      chip.appendChild(text("span", "vchip-name", v.name));
      chip.appendChild(text("span", "vchip-n", signed(applied[v.id])));
      if (lost) chip.title = ui("Value lost note");
      row.appendChild(chip);
    });
    return row;
  }

  function buildPlayerTimeline() {
    var f = result.future;
    var box = $("ptl");
    box.innerHTML = "";
    setAccent(box, f.accent);
    box.classList.remove("recolor");
    box.appendChild(el("div", "atl-spine"));

    var side = 0;
    function nextSide() { return side++ % 2 === 0 ? "left" : "right"; }

    // Only the most recent history, fading out upward (see .ptl in styles.css).
    story.history.slice(-RECENT_HISTORY).forEach(function (ev) {
      var item = historyItem(ev, nextSide());
      setRoundColor(item, "#c9c2b5");
      item.classList.add("seen");
      box.appendChild(item);
    });
    var now = nowItem();
    now.classList.add("seen");
    box.appendChild(now);

    // Sides are chosen at layout time (balanced, see layoutAlternating). In date order
    // (the game already shows everything in date order; the stable sort is a safeguard).
    state.log.slice()
      .sort(function (a, b) { return yearOf(entryCard(a).date) - yearOf(entryCard(b).date); })
      .forEach(function (entry) { box.appendChild(decisionItem(entry, "left")); });

    var end = el("div", "atl-item atl-future seen");
    end.dataset.side = "center";
    end.appendChild(el("span", "atl-dot future-dot"));
    var endCard = el("div", "atl-card");
    endCard.appendChild(thumb(futureStory, "atl-thumb future-thumb"));
    endCard.appendChild(text("p", "atl-date", ui("Future dateline")));
    endCard.appendChild(text("p", "future-name", f.title));
    endCard.appendChild(text("p", "future-tag", f.tagline));
    end.appendChild(endCard);
    box.appendChild(end);
  }

  function layoutPlayerTimeline() {
    var box = $("ptl");
    if (!box.children.length) return;
    layoutAlternating(box, { start: 0, minStep: 40, space: 22, end: 0 });
    var now = box.querySelector(".atl-now");
    if (now) box.style.setProperty("--fade-to", now.offsetTop + "px");
    // The spine stops at the middle of the Future card, tucked behind it.
    var card = box.querySelector(".future-thumb");
    if (card) {
      var top = box.getBoundingClientRect().top;
      var r = card.getBoundingClientRect();
      endSpine(box, r.top + r.height / 2 - top);
    }
  }

  // Whether any Choice this game moved a Value (a Value left at 0 says which it was).
  function movedByChoice(id) {
    return state.log.some(function (l) { return l.kind === "choice" && l.applied && l.applied[id]; });
  }
  // v6.0: how far the player's Choices moved a Value (as their pills show it), and so how
  // much came from elsewhere: Events, near misses, milestones and era drift.
  function choiceSum(id) {
    return state.log.reduce(function (n, l) {
      return l.kind === "choice" && l.applied && l.applied[id] && (l.lost || []).indexOf(id) === -1 ? n + l.applied[id] : n;
    }, 0);
  }

  function buildBars() {
    var bars = $("bars");
    bars.innerHTML = "";
    // The Values as the Future was matched: scaled to a 4-round game (see Engine.scaled).
    var values = Engine.scaled(state);
    // v5.6: after a tipping point, the Values that stopped counting show where they stood
    // the moment before (state.snapshot), grayed out, and say why they no longer matter.
    var lostIds = state.snapshot ? story.settings.valuesLost || [] : [];
    story.values.forEach(function (v) {
      var lost = lostIds.indexOf(v.id) !== -1;
      var n = (lost ? state.snapshot[v.id] : values[v.id]) || 0;
      var row = el("div", "vrow" + (lost ? " lost" : ""));
      row.dataset.id = v.id;
      // Pill text sits on a 20% tint of the color.
      valueTint(row, v);
      var id = "vdetail-" + v.id;

      // The whole row is the control: pill, bar and end labels.
      var headRow = el("div", "vhead");
      headRow.setAttribute("role", "button");
      headRow.tabIndex = 0;
      headRow.setAttribute("aria-expanded", "false");
      headRow.setAttribute("aria-controls", id);
      var top = el("div", "vtop", '<span class="vpill"></span><span class="vchev" aria-hidden="true">+</span>');
      top.querySelector(".vpill").textContent = v.name;
      headRow.appendChild(top);

      var track = el("div", "vtrack", '<span class="vcentre"></span><span class="vfill"></span>');
      var fill = track.querySelector(".vfill");
      var w = Math.min(1, Math.abs(n) / BAR_SCALE) * 50;
      fill.classList.add(n < 0 ? "neg" : "pos");
      fill.dataset.width = w + "%";
      headRow.appendChild(track);

      var ends = el("div", "vends");
      ends.appendChild(text("span", "", v.left));
      ends.appendChild(text("span", "", v.right));
      headRow.appendChild(ends);
      row.appendChild(headRow);

      var detail = el("div", "vdetail");
      detail.id = id;
      var inner = el("div", "vdetail-inner");
      inner.appendChild(text("p", "vd-label", v.left));
      inner.appendChild(richEl("p", "vd-text", v.leftMeans));
      inner.appendChild(text("p", "vd-label", v.right));
      inner.appendChild(richEl("p", "vd-text", v.rightMeans));
      inner.appendChild(text("p", "vd-label", ui("Why it matters label")));
      inner.appendChild(richEl("p", "vd-text", v.why));
      if (lost && v.afterTipping) {
        inner.appendChild(text("p", "vd-label", ui("After the tipping point label")));
        inner.appendChild(richEl("p", "vd-text", v.afterTipping));
      }
      // v6.0: what the player's Choices did (the pills), then what moved it besides them, so
      // the sentences agree with the pills even where the bar ends up somewhere else.
      function toward(node, key, sign) {
        var parts = ui(key).split("{end}");
        node.appendChild(doc.createTextNode(parts[0].replace("{n}", String(Math.abs(Math.round(outside * 4) / 4)))));
        node.appendChild(text("em", "", sign < 0 ? v.left : v.right));
        node.appendChild(doc.createTextNode(parts.slice(1).join("")));
      }
      var mine = lost ? n : Math.round(choiceSum(v.id) * 4) / 4;
      var outside = lost ? 0 : (state.values[v.id] || 0) - choiceSum(v.id);
      var landed = el("p", "vd-landed");
      if (mine === 0) landed.textContent = ui(movedByChoice(v.id) ? "Left balanced" : "Left untouched");
      else toward(landed, lost ? "Pushed toward before" : "Pushed toward", mine);
      inner.appendChild(landed);
      if (Math.abs(outside) >= 0.5) {
        var also = el("p", "vd-landed");
        toward(also, "Moved besides your choices", outside);
        inner.appendChild(also);
      }
      detail.appendChild(el("div", "vdetail-clip")).appendChild(inner);
      row.appendChild(detail);

      function toggle() {
        if (String(root.getSelection && root.getSelection()).length) return; // selecting text, not clicking
        var open = !row.classList.contains("open");
        bars.querySelectorAll(".vrow.open").forEach(function (r) {
          r.classList.remove("open");
          r.querySelector(".vhead").setAttribute("aria-expanded", "false");
        });
        if (open) {
          row.classList.add("open");
          headRow.setAttribute("aria-expanded", "true");
        }
      }
      row.addEventListener("click", function (e) {
        if (e.target.closest && e.target.closest("a")) return; // a source link, not the row
        Sound.click();
        toggle();
      });
      headRow.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); Sound.click(); toggle(); }
      });
      bars.appendChild(row);
    });

    // Grow the bars once they're on screen.
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        bars.querySelectorAll(".vfill").forEach(function (f, i) {
          setTimeout(function () { f.style.width = f.dataset.width; }, i * 90);
        });
        obs.disconnect();
      });
    }, { threshold: 0.2 });
    obs.observe(bars);
  }

  // Skips the Disclaimer: the table clears and the game-start
  // transition plays (strip fades in, deck slides in, first card is dealt).
  async function playAgain() {
    var inner = $("table").querySelector(".table-inner");
    if (inner.classList.contains("clearing")) return; // already on its way (a double-click)
    cancelFlow();
    $("card-glow").classList.remove("in");
    inner.classList.add("clearing");
    setPhase("busy");
    $("strip").classList.remove("tied"); // it fades from wherever the scroll left it
    showStrip(false); // the recolored strip fades away too, before it's rebuilt
    if (!(await wait(1200))) { inner.classList.remove("clearing"); return; }
    state = null;
    resetTable();
    $("table").scrollTop = 0;
    inner.classList.remove("clearing");
    startGame();
  }

  // --- Test mode: a read-only view of the game for tools/play-test.js -------------
  // The expected timeline comes from the engine's log, not from the page, so the
  // harness can compare the two.

  function logItem(entry) {
    var c = entryCard(entry);
    return { type: markType(c), id: c.id, date: c.date, year: markYear(c), label: plain(c.label || c.headline) };
  }

  function exposeTestState() {
    var view = {};
    Object.defineProperties(view, {
      seed: { get: function () { return Engine.seed; } },
      phase: { get: function () { return phase; } },
      phaseId: { get: function () { return phaseId; } },
      game: { get: function () { return gameNumber; } },
      round: { get: function () { return state ? state.round : 0; } },
      values: { get: function () { return state ? Engine.scaled(state) : null; } },
      rawValues: { get: function () { return state ? Object.assign({}, state.values) : null; } },
      flags: { get: function () { return state ? Object.keys(state.flags) : []; } },
      agents: { get: function () { return state ? state.agents : 0; } },
      tipping: { get: function () {
        if (!state || !state.tipping) return null;
        var e = state.log.filter(function (x) { return x.kind === "tipping"; })[0] || {};
        return { id: state.tipping.id, type: state.tipping.type, text: (e.text || state.tipping.text).map(plain), why: (e.why || []).map(plain), prevented: plain(e.prevented || "") };
      } },
      snapshot: { get: function () { return state && state.snapshot ? Object.assign({}, state.snapshot) : null; } },
      valuesLost: { get: function () { return (story.settings.valuesLost || []).slice(); } },
      timeline: { get: function () { return state ? state.log.map(logItem) : []; } },
      gauge: { get: function () { return state ? state.gauge : null; } },
      future: { get: function () { return result ? { id: result.future.id, title: result.future.title, story: futureStory ? result.future.stories.indexOf(futureStory) : -1, lookingBack: result.lookingBack.map(function (m) { return m.text; }), paragraphs: futureStory ? Engine.storyText(state, futureStory).length : 0 } : null; } },
      picks: { get: function () { return picks.map(function (p) { return { round: p.round, id: p.id, fresh: p.fresh.slice(), afterHumanity: p.afterHumanity, tipped: p.tipped, lead: p.lead }; }); } },
      sessionSeen: { get: function () { return Object.keys(sessionSeen); } },
      futures: { get: function () { return story.futures.map(function (f) { return { id: f.id, title: f.title, stories: f.stories.length, values: f.targets ? Object.keys(f.targets).length : 0 }; }); } }
    });
    root.__game = Object.freeze(view);
  }

  // --- Wiring ----------------------------------------------------------------

  function initMute() {
    var btn = $("mute");
    function render() {
      var m = Sound.isMuted();
      btn.classList.toggle("muted", m);
      btn.setAttribute("aria-pressed", String(m));
      btn.setAttribute("aria-label", m ? "Unmute sound" : "Mute sound");
    }
    btn.addEventListener("click", function () {
      Sound.setMuted(!Sound.isMuted());
      render();
    });
    render();
  }

  function initResize() {
    var resizeTimer;
    root.addEventListener("resize", function () {
      if (homeTl.built && isActive("home")) placeHomeTimeline();
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (!story) return;
        layoutStrip();
        if (!$("explain").hidden) layoutPlayerTimeline();
        updateStripAway();
        if ($("event-panel").classList.contains("ep-open")) placeEventPanel(true);
      }, 200);
    });
  }

  function start() {
    fillUiText();
    // Optional sound files (SETTINGS → Audio files), e.g. "ambient, click"; "none" by default.
    if (!TEST) Sound.useFiles(String(story.settings["Audio files"] || "").split(",").map(function (s) { return s.trim().toLowerCase(); }).filter(function (s) { return s && s !== "none"; }));
    preloadCards();

    $("btn-explain").addEventListener("click", showExplain);
    $("btn-again").addEventListener("click", playAgain);
    $("btn-again-2").addEventListener("click", playAgain);
    initHome();

    // A soft "tok" on every button (Choices play their own two-note confirm).
    doc.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("button");
      if (b && !b.classList.contains("choice")) Sound.click();
    });

    $("table").addEventListener("scroll", updateStripAway, { passive: true });
    // A gentle scroll stops the moment the player scrolls for themselves, instead of
    // pulling the page back toward where it was going.
    ["wheel", "touchstart"].forEach(function (type) {
      $("table").addEventListener(type, function () { scrollToken++; }, { passive: true });
    });
    doc.addEventListener("keydown", function (e) {
      if (/^(ArrowUp|ArrowDown|PageUp|PageDown|Home|End| )$/.test(e.key)) scrollToken++;
    });
    // Milestone diamonds take their tint from story.md.
    if (story.settings.sotaColor) doc.documentElement.style.setProperty("--mark-sota", story.settings.sotaColor);
    if (story.settings.tippingColor) doc.documentElement.style.setProperty("--mark-tip", story.settings.tippingColor);
    buildGauge();
    doc.addEventListener("click", hideTip); // a tap elsewhere closes a definition

    initMute();
    initResize();
    buildStrip();
    if (TEST) { exposeTestState(); startGame(); } // no Home, no Disclaimer, no audio
    else { Sound.start(); showHome(); } // the music begins as the site opens (or at the first click, if the browser holds it)
  }

  // Load and check content/story.md, then start. Problems are logged; the game
  // still runs if it can, skipping broken links.
  function boot() {
    fetch(STORY_URL, { cache: "no-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error(STORY_URL + ": HTTP " + r.status);
        return r.text();
      })
      .then(function (src) {
        story = root.StoryParser.parse(src);
        var problems = root.StoryParser.validate(story);
        if (problems.length) {
          console.warn("story.md: " + problems.length + " problem(s). Run node tools/check-story.js for details.");
          problems.forEach(function (p) { console.warn("story.md: " + p.id + ": " + p.message); });
        }
        Engine = root.createEngine(story, { seed: SEED });
        root.Engine = Engine; // handy in the console
        start();
      })
      .catch(function (err) {
        console.error("Could not load " + STORY_URL + ".", err);
        showScreen("nostory");
      });
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();

})(window);
