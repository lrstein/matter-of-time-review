// A Matter of Time — sound.
// Everything is generated with the Web Audio API. Real files at assets/audio/ambient.mp3,
// click.mp3 or flip.mp3 are used instead only if story.md lists them (SETTINGS → Audio
// files), so a missing file never logs a 404.
// Exposes window.Sound: unlock(), start(), click(), confirm(), flip(flipMs), dip(on), setMuted(bool),
// isMuted(), useFiles(["ambient", …]).

(function (root) {
  "use strict";

  var STORAGE_KEY = "amot-muted";
  var AMBIENT_LEVEL = 0.06;   // master level for the ambient music
  var DIPPED_LEVEL = 0.035;   // during the Future reveal

  // Slow progression: Am(add9) → Fmaj7 → Cmaj7 → Em7 (Hz).
  var CHORDS = [
    [110.00, 164.81, 246.94, 261.63],  // A2 E3 B3 C4
    [87.31, 130.81, 164.81, 220.00],   // F2 C3 E3 A3
    [130.81, 196.00, 246.94, 329.63],  // C3 G3 B3 E4
    [82.41, 123.47, 146.83, 196.00]    // E2 B2 D3 G3
  ];
  var CHORD_FADE = 4;                  // seconds of crossfade between chords
  var BELLS = [440.00, 523.25, 587.33, 659.25, 783.99, 880.00]; // A minor pentatonic, A4–A5

  var ctx = null;
  var master = null;   // everything
  var ambientBus = null;
  var padIn = null;    // the pad's filter input
  var verbIn = null;   // reverb send
  var sfxBus = null;
  var started = false;
  var dipped = false;
  var muted = false;
  var noiseBuf = null;
  var files = { ambient: null, click: null, flip: null };

  try { muted = root.localStorage.getItem(STORAGE_KEY) === "1"; } catch (e) { /* storage blocked */ }

  // Optional audio files, played through plain <audio> elements. Only the listed ones load.
  function useFiles(names) {
    (names || []).forEach(function (name) { if (name in files) probe(name); });
  }
  function probe(name) {
    var a = new Audio();
    var settled = false;
    a.preload = "auto";
    a.addEventListener("canplaythrough", function () { if (!settled) { settled = true; files[name] = a; } }, { once: true });
    a.addEventListener("error", function () { settled = true; }, { once: true });
    a.src = "assets/audio/" + name + ".mp3";
  }

  // A stereo impulse response: decaying noise, for a soft generated reverb.
  function impulse(seconds, decay) {
    var rate = ctx.sampleRate;
    var length = Math.floor(rate * seconds);
    var buf = ctx.createBuffer(2, length, rate);
    for (var ch = 0; ch < 2; ch++) {
      var data = buf.getChannelData(ch);
      for (var i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
    return buf;
  }

  // Pink noise (Paul Kellet's filter): softer than white, for the flip swoosh.
  function pinkNoise(seconds) {
    var length = Math.floor(ctx.sampleRate * seconds);
    var buf = ctx.createBuffer(1, length, ctx.sampleRate);
    var d = buf.getChannelData(0);
    var b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (var i = 0; i < length; i++) {
      var w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520; b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.0168980;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
    }
    return buf;
  }

  function panner(value) {
    if (ctx.createStereoPanner) {
      var p = ctx.createStereoPanner();
      p.pan.value = value;
      return p;
    }
    return ctx.createGain(); // very old browsers: no panning
  }

  // --- Ambient music ---------------------------------------------------------
  // Chords change every 14–18 s with ~4 s crossfades. Each chord tone is a slightly
  // detuned sine + triangle pair, panned gently apart. A slow low-pass LFO breathes,
  // and sparse bell notes drift in every 5–12 s.

  function startPad() {
    var filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.5;
    var lfo = ctx.createOscillator();
    var lfoDepth = ctx.createGain();
    lfo.frequency.value = 0.04;
    lfoDepth.gain.value = 450;
    lfo.connect(lfoDepth).connect(filter.frequency);
    lfo.start();

    var verb = ctx.createConvolver();
    verb.buffer = impulse(5, 2.4);
    var wet = ctx.createGain();
    wet.gain.value = 0.75;
    verb.connect(wet).connect(ambientBus);
    verbIn = verb;

    var dry = ctx.createGain();
    dry.gain.value = 0.5;
    filter.connect(dry).connect(ambientBus);
    filter.connect(verb);
    padIn = filter;

    playChord(0);
    scheduleBell();
  }

  function playChord(index) {
    var now = ctx.currentTime;
    var hold = 14 + Math.random() * 4;
    var voice = ctx.createGain();
    voice.gain.setValueAtTime(0, now);
    voice.gain.linearRampToValueAtTime(1, now + CHORD_FADE);
    voice.gain.setValueAtTime(1, now + hold);
    voice.gain.linearRampToValueAtTime(0, now + hold + CHORD_FADE);
    voice.connect(padIn);

    CHORDS[index].forEach(function (freq, i) {
      var pan = panner((i % 2 === 0 ? -1 : 1) * (0.25 + 0.1 * i));
      pan.connect(voice);
      [["sine", -5, 0.15], ["triangle", 5, 0.09]].forEach(function (o) {
        var osc = ctx.createOscillator();
        var g = ctx.createGain();
        osc.type = o[0];
        osc.frequency.value = freq;
        osc.detune.value = o[1];
        g.gain.value = o[2];
        osc.connect(g).connect(pan);
        osc.start(now);
        osc.stop(now + hold + CHORD_FADE + 0.1);
      });
    });
    // The next chord starts fading in as this one starts fading out.
    setTimeout(function () { playChord((index + 1) % CHORDS.length); }, hold * 1000);
  }

  function scheduleBell() {
    setTimeout(function () { bell(); scheduleBell(); }, 5000 + Math.random() * 7000);
  }

  function bell() {
    var now = ctx.currentTime;
    var freq = BELLS[Math.floor(Math.random() * BELLS.length)];
    var g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.09, now + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0008, now + 3.2);
    var pan = panner(Math.random() * 1.4 - 0.7);
    [[1, 1], [2.76, 0.18]].forEach(function (partial) { // a faint inharmonic overtone, like a small bell
      var osc = ctx.createOscillator();
      var pg = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq * partial[0];
      pg.gain.value = partial[1];
      osc.connect(pg).connect(g);
      osc.start(now);
      osc.stop(now + 3.4);
    });
    g.connect(pan);
    var dry = ctx.createGain();
    dry.gain.value = 0.35;
    pan.connect(dry).connect(ambientBus);
    pan.connect(verbIn); // long tail
  }

  function ambientTarget() { return dipped ? DIPPED_LEVEL : AMBIENT_LEVEL; }

  function setAmbient(level, seconds) {
    if (files.ambient) {
      // File volumes are relative to a quiet master; scale to roughly match the pad.
      var el = files.ambient;
      var from = el.volume;
      var to = Math.min(1, level * 6);
      var t0 = performance.now();
      (function step() {
        var k = Math.min(1, (performance.now() - t0) / (seconds * 1000));
        el.volume = from + (to - from) * k;
        if (k < 1) requestAnimationFrame(step);
      })();
      return;
    }
    if (!ambientBus) return;
    var now = ctx.currentTime;
    ambientBus.gain.cancelScheduledValues(now);
    ambientBus.gain.setValueAtTime(ambientBus.gain.value, now);
    ambientBus.gain.linearRampToValueAtTime(level, now + seconds);
  }

  // Makes the audio context (and resumes it, which only works during a user gesture:
  // browsers block sound until then). Plays nothing; start() begins the music.
  function unlock() {
    if (ctx) { if (ctx.state === "suspended") ctx.resume(); return; }
    var AC = root.AudioContext || root.webkitAudioContext;
    if (AC) {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 1;
      master.connect(ctx.destination);
      ambientBus = ctx.createGain();
      ambientBus.gain.value = 0;
      ambientBus.connect(master);
      sfxBus = ctx.createGain();
      sfxBus.gain.value = 1; // effect levels below are absolute
      sfxBus.connect(master);
      noiseBuf = pinkNoise(1.5);
      if (ctx.state === "suspended") ctx.resume();
    }
    if (files.ambient) {      // started silently now, while the gesture counts; start() fades it in
      files.ambient.loop = true;
      files.ambient.volume = 0;
      files.ambient.muted = muted;
      files.ambient.play().catch(function () {});
    }
  }

  // The music: a 4 s fade-in, called as the site opens. Browsers keep sound suspended
  // until the visitor's first click, tap or key, so if it can't play yet the music waits
  // for that first gesture anywhere on the page (nothing is scheduled while suspended,
  // so nothing piles up).
  var WAKE_EVENTS = ["pointerdown", "keydown", "touchend", "click"];
  function start() {
    if (started) return;
    started = true;
    // Make the context now only if the browser would let it run (otherwise Chrome warns
    // that it "was not allowed to start"); else the first gesture makes it.
    var nav = root.navigator || {};
    var allowed = nav.getAutoplayPolicy ? nav.getAutoplayPolicy("audiocontext") === "allowed"
      : !(nav.userActivation && !nav.userActivation.hasBeenActive);
    if (allowed) unlock();
    var begun = false;
    function go() {
      if (begun) return;
      begun = true;
      WAKE_EVENTS.forEach(function (t) { root.removeEventListener(t, wake, true); });
      if (!files.ambient && ctx) startPad();
      setAmbient(ambientTarget(), 4);
    }
    function wake() {
      unlock();
      if (files.ambient) files.ambient.play().catch(function () {});
      if (ctx && ctx.state !== "running") ctx.resume().then(go, function () {}); else go();
    }
    if (ctx && ctx.state === "running" && !files.ambient) { go(); return; }
    WAKE_EVENTS.forEach(function (t) { root.addEventListener(t, wake, true); });
    if (ctx) ctx.addEventListener("statechange", function () { if (ctx.state === "running") go(); });
  }

  function playFile(a) {
    if (muted) return;
    var c = a.cloneNode();
    c.volume = 0.6;
    c.play().catch(function () {});
  }

  // --- Effects ---------------------------------------------------------------

  // A soft tap click, like a fingertip on a wooden button: a very short burst of noise
  // through a band-pass around 2 kHz (softened by a 4.5 kHz low-pass), 1 ms attack and
  // ~40 ms decay, peak 0.03, over a tiny low "body" (a 170 Hz sine, ~50 ms, peak 0.008).
  // A slightly different slice of noise and pitch each time, so repeats don't sound mechanical.
  function click() {
    if (files.click) return playFile(files.click);
    if (!ctx || muted || !noiseBuf) return;
    var now = ctx.currentTime;
    var jitter = 0.94 + Math.random() * 0.12;

    var src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    var bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2000 * jitter;
    bp.Q.value = 1.1;
    var lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 4500;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.03, now + 0.001);
    g.gain.exponentialRampToValueAtTime(0.0003, now + 0.04);
    src.connect(bp).connect(lp).connect(g).connect(sfxBus);
    var offset = Math.random() * Math.max(0, noiseBuf.duration - 0.1);
    src.start(now, offset, 0.06);

    var body = ctx.createOscillator();
    var bg = ctx.createGain();
    body.type = "sine";
    body.frequency.setValueAtTime(170 * jitter, now);
    body.frequency.exponentialRampToValueAtTime(130, now + 0.05);
    bg.gain.setValueAtTime(0, now);
    bg.gain.linearRampToValueAtTime(0.008, now + 0.002);
    bg.gain.exponentialRampToValueAtTime(0.0002, now + 0.055);
    body.connect(bg).connect(sfxBus);
    body.start(now);
    body.stop(now + 0.07);
  }

  // Confirming a Choice: the soft tap, then a single warm, muted note, like a felt
  // mallet on a wooden bar. A3 with a much quieter E4 sounding together (never one
  // after the other, which reads as a chime or signal). Triangle waves through a
  // low-pass that closes from 1,800 to 450 Hz, so the note starts woody and goes dark;
  // 6 ms attack, ~0.9 s decay, peak 0.014, with a little reverb.
  function confirm() {
    if (files.click) return playFile(files.click);
    if (!ctx || muted) return;
    click();
    var now = ctx.currentTime + 0.012;
    var lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.Q.value = 0.6;
    lp.frequency.setValueAtTime(1800, now);
    lp.frequency.exponentialRampToValueAtTime(450, now + 0.35);
    var g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.014, now + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0003, now + 0.9);
    lp.connect(g).connect(sfxBus);
    if (verbIn) g.connect(verbIn);
    [[220, 1], [329.63, 0.3]].forEach(function (n) {
      var osc = ctx.createOscillator();
      var lvl = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = n[0];
      lvl.gain.value = n[1];
      osc.connect(lvl).connect(lp);
      osc.start(now);
      osc.stop(now + 0.95);
    });
  }

  // A soft, mellow swoosh for a card flip: noise through a low-pass sweeping
  // ~250 → 900 → 400 Hz, 250 ms attack and 500 ms release, peak 0.025. The peak
  // lands at the midpoint of the visual flip (`flipMs`), when the card is edge-on.
  var FLIP_ATTACK = 0.25, FLIP_RELEASE = 0.5;
  function flip(flipMs) {
    var ms = flipMs || 900;
    var delay = Math.max(0, ms / 2000 - FLIP_ATTACK); // seconds until the swoosh starts
    if (files.flip) { setTimeout(function () { playFile(files.flip); }, delay * 1000); return; }
    if (!ctx || muted) return;
    var start = ctx.currentTime + delay;
    var src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    var lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.Q.value = 0.7;
    lp.frequency.setValueAtTime(250, start);
    lp.frequency.exponentialRampToValueAtTime(900, start + FLIP_ATTACK);
    lp.frequency.exponentialRampToValueAtTime(400, start + FLIP_ATTACK + FLIP_RELEASE);
    var g = ctx.createGain();
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(0.025, start + FLIP_ATTACK);
    g.gain.exponentialRampToValueAtTime(0.0003, start + FLIP_ATTACK + FLIP_RELEASE);
    src.connect(lp).connect(g).connect(sfxBus);
    src.start(start, Math.random() * 0.4);
    src.stop(start + FLIP_ATTACK + FLIP_RELEASE + 0.05);
  }

  // v6.1: a year passing in the Interlude's count. A tiny, quiet tick, like a clock's
  // escapement: noise through a band-pass around 3.2 kHz, ~25 ms, peak 0.012, slightly
  // different each time. `last`: the final year settling, lower and a little longer.
  function tick(last) {
    if (!ctx || muted || !noiseBuf) return;
    var now = ctx.currentTime;
    var jitter = 0.95 + Math.random() * 0.1;
    var src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    var bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = (last ? 1700 : 3200) * jitter;
    bp.Q.value = last ? 2.2 : 1.6;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(last ? 0.016 : 0.012, now + 0.001);
    g.gain.exponentialRampToValueAtTime(0.0002, now + (last ? 0.07 : 0.025));
    src.connect(bp).connect(g).connect(sfxBus);
    src.start(now, Math.random() * Math.max(0, noiseBuf.duration - 0.1), 0.1);
  }

  // Lower the ambient slightly (the Future reveal), or bring it back.
  function dip(on) {
    dipped = !!on;
    if (started) setAmbient(ambientTarget(), 2.5);
  }

  function setMuted(m) {
    muted = !!m;
    try { root.localStorage.setItem(STORAGE_KEY, muted ? "1" : "0"); } catch (e) { /* storage blocked */ }
    if (master) {
      var now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(muted ? 0 : 1, now + 0.3);
    }
    if (files.ambient) files.ambient.muted = muted;
  }

  root.Sound = {
    unlock: unlock,
    start: start,
    click: click,
    confirm: confirm,
    flip: flip,
    tick: tick,
    dip: dip,
    setMuted: setMuted,
    isMuted: function () { return muted; },
    useFiles: useFiles
  };
})(window);
