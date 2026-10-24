// A Matter of Time — ambient particles.
// A full-screen canvas behind everything: a field of stars drifting and pulsing,
// pushed gently away from the pointer (or touch point). Three layers give depth:
// a far layer (many, small, dim, slow, barely pushed), a near layer (larger, pushed more),
// and a few bright stars with a soft halo. Each star pulses at its own pace and depth.

(function (root) {
  "use strict";

  var canvas = document.getElementById("particles");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var reduced = root.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var RADIUS = 120;     // pointer influence, px
  var PUSH = 900;       // strength of the push, px/s² at the pointer
  var RETURN = 1.6;     // how quickly pushed particles settle back to their drift
  var COLORS = ["236, 231, 222", "236, 231, 222", "222, 228, 238", "214, 186, 120"]; // off-white, cool white, faint gold

  var W = 0, H = 0, dpr = 1;
  var particles = [];
  var pointer = null;
  var raf = null;
  var last = 0;

  function count() { return W < 760 ? 280 : 620; }

  var LAYERS = {
    //          radius        speed px/s     opacity        push   pulse depth
    far:    { r: [0.4, 1],    v: [0.8, 2.5], a: [0.12, 0.38], push: 0.35, pulse: [0.25, 0.55] },
    near:   { r: [0.9, 1.8],  v: [2, 5],     a: [0.3, 0.65],  push: 1,    pulse: [0.3, 0.6] },
    bright: { r: [1.4, 2.3],  v: [1, 3],     a: [0.75, 1],    push: 0.6,  pulse: [0.35, 0.7], halo: true }
  };

  // The bright stars' halo, drawn once per color and reused (a gradient per star per
  // frame is costly with hundreds of stars).
  var halos = {};
  function halo(color) {
    if (halos[color]) return halos[color];
    var c = document.createElement("canvas"), R = 32;
    c.width = c.height = R * 2;
    var x = c.getContext("2d");
    var g = x.createRadialGradient(R, R, 0, R, R, R);
    g.addColorStop(0, "rgba(" + color + ",1)");
    g.addColorStop(1, "rgba(" + color + ",0)");
    x.fillStyle = g;
    x.fillRect(0, 0, R * 2, R * 2);
    return (halos[color] = c);
  }

  function between(range) { return range[0] + Math.random() * (range[1] - range[0]); }

  function make() {
    var roll = Math.random();
    var L = roll < 0.04 ? LAYERS.bright : roll < 0.7 ? LAYERS.far : LAYERS.near;
    var angle = Math.random() * Math.PI * 2;
    var speed = between(L.v);
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: between(L.r),
      dx: Math.cos(angle) * speed,        // drift velocity
      dy: Math.sin(angle) * speed,
      px: 0, py: 0,                        // extra velocity from the pointer
      push: L.push,
      base: between(L.a),
      phase: Math.random() * Math.PI * 2,
      tw: 0.6 + Math.random() * 1.2,      // pulse speed (rad/s: one pulse every 3 to 10 s)
      depth: between(L.pulse),            // how far the pulse dims it
      halo: !!L.halo,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }

  function resize() {
    dpr = Math.min(2, root.devicePixelRatio || 1);
    W = root.innerWidth;
    H = root.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = count();
    while (particles.length < n) particles.push(make());
    particles.length = n;
    particles.forEach(function (p) { p.x = Math.min(p.x, W); p.y = Math.min(p.y, H); });
    if (reduced) draw(0);
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var pulse = 0.5 + 0.5 * Math.sin(p.phase + t * 0.001 * p.tw);
      var a = reduced ? p.base : p.base * (1 - p.depth + p.depth * pulse);
      if (p.halo) {
        // A soft glow around the bright stars, breathing with the pulse.
        var hr = p.r * (5 + 2 * pulse);
        ctx.globalAlpha = a * 0.32;
        ctx.drawImage(halo(p.color), p.x - hr, p.y - hr, hr * 2, hr * 2);
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = "rgba(" + p.color + "," + a.toFixed(3) + ")";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function step(t) {
    var dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      if (pointer) {
        var ox = p.x - pointer.x;
        var oy = p.y - pointer.y;
        var d = Math.sqrt(ox * ox + oy * oy);
        if (d < RADIUS && d > 0.01) {
          var f = (1 - d / RADIUS);
          f = f * f * PUSH * p.push * dt; // soft falloff; the far layer barely moves
          p.px += (ox / d) * f;
          p.py += (oy / d) * f;
        }
      }
      // Ease the push away again.
      var k = Math.exp(-RETURN * dt);
      p.px *= k;
      p.py *= k;
      p.x += (p.dx + p.px) * dt;
      p.y += (p.dy + p.py) * dt;
      // Wrap softly around the edges.
      if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;
    }
    draw(t);
    raf = requestAnimationFrame(step);
  }

  function play() {
    if (reduced || raf || document.hidden) return;
    last = 0;
    raf = requestAnimationFrame(step);
  }
  function pause() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
  }

  root.addEventListener("resize", resize);
  root.addEventListener("pointermove", function (e) { pointer = { x: e.clientX, y: e.clientY }; }, { passive: true });
  root.addEventListener("pointerdown", function (e) { pointer = { x: e.clientX, y: e.clientY }; }, { passive: true });
  root.addEventListener("pointerup", function (e) { if (e.pointerType !== "mouse") pointer = null; }, { passive: true });
  document.addEventListener("pointerleave", function () { pointer = null; });
  root.addEventListener("blur", function () { pointer = null; });
  document.addEventListener("visibilitychange", function () { if (document.hidden) pause(); else play(); });

  resize();
  play();
})(window);
