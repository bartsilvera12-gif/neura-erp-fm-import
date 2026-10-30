(() => {
const TAU = Math.PI * 2;
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
const sprite = (stops, size = 64) => {
  const s = document.createElement('canvas'); s.width = s.height = size; const g = s.getContext('2d');
  const r = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([o, c]) => r.addColorStop(o, c)); g.fillStyle = r; g.fillRect(0, 0, size, size); return s;
};
const lin = (c, x0, y0, x1, y1, stops) => { const g = c.createLinearGradient(x0, y0, x1, y1); stops.forEach(([o, col]) => g.addColorStop(o, col)); return g; };

class PerfumeSpray extends HTMLElement {
  connectedCallback() {
    if (this._init) return; this._init = true;
    Object.assign(this.style, { display: 'block', position: 'relative', width: '100%', height: '100%' });
    const c = this.cv = document.createElement('canvas');
    c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;cursor:pointer;touch-action:pan-y';
    c.setAttribute('role', 'img'); c.setAttribute('aria-label', 'Frasco de perfume de cristal. Tocá para rociar.');
    this.appendChild(c); this.ctx = c.getContext('2d');
    this.P = []; this.emit = 0; this.press = 0; this.slosh = 0; this.t = 0; this.hold = false; this.acc = 0;
    this.lastY = scrollY; this.visible = false; this.auto = false;
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.sDot = sprite([[0, 'rgba(255,250,240,1)'], [.22, 'rgba(255,242,222,.55)'], [1, 'rgba(255,236,210,0)']]);
    this.sPlume = sprite([[0, 'rgba(250,244,234,.9)'], [.45, 'rgba(244,236,222,.35)'], [1, 'rgba(240,230,214,0)']], 128);
    this.sBokeh = sprite([[0, 'rgba(255,240,214,.28)'], [.66, 'rgba(255,238,206,.34)'], [.84, 'rgba(255,236,200,.62)'], [.93, 'rgba(255,232,196,.2)'], [1, 'rgba(255,230,190,0)']]);
    this.sGold = sprite([[0, 'rgba(232,196,128,.3)'], [.66, 'rgba(226,186,112,.36)'], [.84, 'rgba(236,200,130,.6)'], [.93, 'rgba(230,190,120,.2)'], [1, 'rgba(230,190,120,0)']]);
    this.ro = new ResizeObserver(() => this.resize()); this.ro.observe(this); this.resize();
    c.addEventListener('pointerdown', () => { this.hold = true; this.spray(.36); });
    this.up = () => { this.hold = false; };
    addEventListener('pointerup', this.up); c.addEventListener('pointerleave', this.up); c.addEventListener('pointercancel', this.up);
    this.onScroll = () => {
      const y = scrollY, d = Math.abs(y - this.lastY); this.lastY = y;
      if (!this.visible) return; this.acc += d;
      if (this.acc > 140) { this.acc = 0; this.spray(.2); }
    };
    addEventListener('scroll', this.onScroll, { passive: true });
    this.io = new IntersectionObserver(es => {
      this.visible = es[0].isIntersecting;
      if (this.visible && !this.auto) { this.auto = true; setTimeout(() => this.spray(.45), 650); }
      if (this.visible) this.start();
    }, { threshold: .3 });
    this.io.observe(this);
  }
  disconnectedCallback() {
    removeEventListener('scroll', this.onScroll); removeEventListener('pointerup', this.up);
    this.ro && this.ro.disconnect(); this.io && this.io.disconnect(); cancelAnimationFrame(this.raf); this.raf = 0; this._init = false; this.innerHTML = '';
  }
  resize() {
    const r = this.getBoundingClientRect(); if (!r.width || !r.height) return;
    this.dpr = Math.min(devicePixelRatio || 1, 2); this.W = r.width; this.H = r.height;
    this.cv.width = Math.round(r.width * this.dpr); this.cv.height = Math.round(r.height * this.dpr);
    const W = this.W, H = this.H, narrow = W < 520, panel = W < 760, mid = !panel && W < 1200;
    const bh = panel ? Math.min(H * .56, W * .62, 420) : Math.min(H * (mid ? .52 : .6), mid ? 360 : 440);
    const bw = bh * .6, bodyH = bh * .64, colH = bh * .06;
    const bx = W * (panel ? .62 : mid ? .76 : .68), base = H * (panel ? .82 : .84);
    this.g = { bx, base, bh, bw, bodyH, colH, colW: bw * .34, ah: bh * .13, aw: bw * .27, bodyTop: base - bodyH, colTop: base - bodyH - colH, s: bh / 400, narrow };
    this.draw();
  }
  spray(d) { this.emit = Math.max(this.emit, d); this.slosh = Math.min(1, this.slosh + .5); this.start(); }
  start() {
    if (this.raf || !this.g) return; this.last = performance.now();
    const loop = n => {
      const dt = Math.min(.033, (n - this.last) / 1000); this.last = n;
      this.step(dt); this.draw();
      const idle = !this.P.length && this.emit <= 0 && this.press < .002 && this.slosh < .003 && !this.hold;
      if (idle || (!this.visible && !this.P.length)) { this.raf = 0; return; }
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }
  actY() { const g = this.g; return g.colTop - g.ah + this.press * g.bh * .02; }
  nozzle() { const g = this.g; return { x: g.bx - g.aw / 2 - 1, y: this.actY() + g.ah * .36 }; }
  add(type) {
    const g = this.g, s = g.s * (g.narrow ? .75 : 1), nz = this.nozzle();
    const spread = type === 'd' ? .085 : type === 'p' ? .15 : .2;
    const a = Math.PI + .08 + gauss() * spread;
    const sp = (type === 'd' ? 520 + Math.random() * 620 : type === 'p' ? 260 + Math.random() * 380 : 300 + Math.random() * 520) * s;
    const p = { x: nz.x + gauss(), y: nz.y + gauss(), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, age: 0, type, seed: Math.random() * TAU };
    if (type === 'd') Object.assign(p, { life: 1.6 + Math.random() * 1.9, r: (.35 + Math.random() * .75) * Math.max(.85, s), drag: 3.1, grav: 6 + Math.random() * 10, turb: 24, tw: Math.random() < .16 });
    else if (type === 'p') Object.assign(p, { life: 2.6 + Math.random() * 2.2, r: (7 + Math.random() * 12) * s, drag: 2.3, grav: -3, turb: 30 });
    else Object.assign(p, { life: 2.4 + Math.random() * 2, r: (2.2 + Math.random() * 4.6) * s, drag: 2.6, grav: 3, turb: 18, gold: Math.random() < .4 });
    this.P.push(p);
  }
  step(dt) {
    this.t += dt;
    if (this.hold) this.emit = Math.max(this.emit, .06);
    const on = this.emit > 0; this.emit -= dt;
    this.press += ((on ? 1 : 0) - this.press) * Math.min(1, dt * (on ? 30 : 10));
    this.slosh *= Math.exp(-dt * 1.4);
    if (on && this.press > .55) {
      const f = this.reduced ? .2 : 1;
      [['d', 1150], ['p', 130], ['b', 26]].forEach(([k, rate]) => {
        let n = rate * dt * f; while (n > 0) { if (n < 1 && Math.random() > n) break; n--; this.add(k); }
      });
    }
    const P = this.P, t = this.t;
    for (let i = P.length - 1; i >= 0; i--) {
      const p = P[i]; p.age += dt;
      if (p.age > p.life) { P[i] = P[P.length - 1]; P.pop(); continue; }
      const k = Math.exp(-p.drag * dt); p.vx *= k; p.vy *= k;
      const fx = Math.sin(p.y * .008 + t * .9 + p.seed) + .5 * Math.sin(p.y * .021 - t * 1.3);
      const fy = Math.cos(p.x * .007 + t * .7 + p.seed) + .5 * Math.cos(p.x * .019 + t * 1.1);
      p.vx += fx * p.turb * dt; p.vy += fy * p.turb * dt + p.grav * dt;
      p.x += p.vx * dt; p.y += p.vy * dt;
    }
    if (P.length > 3600) P.splice(0, P.length - 3600);
  }
  draw() {
    if (!this.g) return;
    const c = this.ctx, d = this.dpr;
    c.setTransform(d, 0, 0, d, 0, 0); c.clearRect(0, 0, this.W, this.H);
    this.bottle(c);
    c.globalCompositeOperation = 'lighter';
    if (this.press > .05) {
      const nz = this.nozzle(), r = 16 * this.g.s; c.globalAlpha = .3 * this.press;
      c.drawImage(this.sPlume, nz.x - r * 1.6, nz.y - r, r * 2, r * 2);
    }
    for (const p of this.P) {
      const u = p.age / p.life; let a, r, img;
      if (p.type === 'p') { a = .05 * (u < .1 ? u / .1 : Math.pow(1 - (u - .1) / .9, 1.2)); r = p.r * (1 + u * 3.4); img = this.sPlume; }
      else if (p.type === 'b') { a = .9 * (u < .15 ? u / .15 : Math.pow(1 - (u - .15) / .85, 1.5)); a *= .7 + .3 * Math.sin(this.t * 3 + p.seed); r = p.r * (1 + u * .5); img = p.gold ? this.sGold : this.sBokeh; }
      else { a = .7 * (u < .04 ? u / .04 : Math.pow(1 - u, 1.6)); if (p.tw) a *= .4 + .6 * Math.max(0, Math.sin(this.t * 9 + p.seed)); r = p.r * 3; img = this.sDot; }
      c.globalAlpha = a; c.drawImage(img, p.x - r, p.y - r, r * 2, r * 2);
    }
    c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
  }
  bottle(c) {
    const g = this.g, { bx, base, bw, bodyH, colH, colW, ah, aw } = g;
    const L = bx - bw / 2, R = bx + bw / 2, T = g.bodyTop, rad = bw * .1;
    const wall = bw * .085, iL = L + wall, iR = R - wall, iT = T + wall * .9, iB = base - bodyH * .17;
    const body = new Path2D(); body.roundRect(L, T, bw, bodyH, [rad * 1.3, rad * 1.3, rad * .7, rad * .7]);
    const inner = new Path2D(); inner.roundRect(iL, iT, iR - iL, iB - iT, [rad * .8, rad * .8, rad * .35, rad * .35]);

    // floor: contact shadow, reflection, caustic
    let gr = c.createRadialGradient(bx, base, 0, bx, base, bw * 1.4);
    gr.addColorStop(0, 'rgba(0,0,0,.65)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = gr; c.beginPath(); c.ellipse(bx, base + 2, bw * 1.4, bw * .11, 0, 0, TAU); c.fill();
    c.save(); c.beginPath(); c.rect(L - 4, base + 1, bw + 8, bodyH * .5); c.clip();
    c.fillStyle = lin(c, 0, base, 0, base + bodyH * .42, [[0, 'rgba(190,140,66,.16)'], [.25, 'rgba(160,110,50,.06)'], [1, 'rgba(160,110,50,0)']]);
    c.beginPath(); c.roundRect(L + wall, base + bodyH * .03, bw - wall * 2, bodyH * .5, 2); c.fill();
    c.fillStyle = lin(c, 0, base, 0, base + bodyH * .3, [[0, 'rgba(255,255,255,.1)'], [1, 'rgba(255,255,255,0)']]);
    c.fillRect(L + bw * .05, base + 1, 1.5, bodyH * .3); c.fillRect(R - bw * .04, base + 1, 1, bodyH * .22);
    c.restore();
    c.globalCompositeOperation = 'lighter';
    gr = c.createRadialGradient(bx + bw * .55, base + bw * .05, 0, bx + bw * .55, base + bw * .05, bw);
    gr.addColorStop(0, 'rgba(230,176,90,.2)'); gr.addColorStop(.5, 'rgba(220,160,80,.07)'); gr.addColorStop(1, 'rgba(220,160,80,0)');
    c.fillStyle = gr; c.beginPath(); c.ellipse(bx + bw * .55, base + bw * .05, bw * 1.05, bw * .085, 0, 0, TAU); c.fill();
    c.globalCompositeOperation = 'source-over';

    // glass body tint
    c.fillStyle = lin(c, L, 0, R, 0, [[0, 'rgba(255,255,255,.04)'], [.09, 'rgba(255,255,255,.012)'], [.5, 'rgba(255,255,255,0)'], [.91, 'rgba(255,255,255,.01)'], [1, 'rgba(255,255,255,.035)']]);
    c.fill(body);

    // liquid
    const lv = iT + (iB - iT) * .3, amp = this.slosh * bw * .035, pts = [];
    for (let i = 0; i <= 30; i++) {
      const u = i / 30;
      pts.push([iL + (iR - iL) * u, lv + amp * Math.sin(this.t * 6.2) * (u - .5) * 2 + amp * .28 * Math.sin(u * TAU * 1.5 + this.t * 9)]);
    }
    const sh = bw * .045;
    c.save(); c.clip(inner);
    c.beginPath(); c.moveTo(iL, iB); for (const [x, y] of pts) c.lineTo(x, y); c.lineTo(iR, iB); c.closePath();
    c.fillStyle = lin(c, 0, lv, 0, iB, [[0, 'rgba(244,194,104,.5)'], [.55, 'rgba(214,136,46,.62)'], [1, 'rgba(158,84,22,.78)']]); c.fill();
    c.save(); c.clip();
    c.fillStyle = lin(c, iL, 0, iR, 0, [[0, 'rgba(18,8,0,.72)'], [.07, 'rgba(18,8,0,.16)'], [.18, 'rgba(255,214,140,0)'], [.82, 'rgba(255,214,140,0)'], [.93, 'rgba(18,8,0,.16)'], [1, 'rgba(18,8,0,.72)']]);
    c.fillRect(iL, lv - amp - 2, iR - iL, iB - lv + amp + 4);
    c.globalCompositeOperation = 'lighter';
    const luz = c.createRadialGradient(bx + bw * .1, iB - (iB - lv) * .3, 0, bx + bw * .1, iB - (iB - lv) * .3, bw * .55);
    luz.addColorStop(0, 'rgba(255,196,96,.42)'); luz.addColorStop(.5, 'rgba(255,170,70,.14)'); luz.addColorStop(1, 'rgba(255,170,70,0)');
    c.fillStyle = luz; c.fillRect(iL, lv - amp - 2, iR - iL, iB - lv + amp + 4);
    c.globalCompositeOperation = 'source-over';
    c.restore();
    c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y));
    for (let i = pts.length - 1; i >= 0; i--) c.lineTo(pts[i][0], pts[i][1] - sh);
    c.closePath();
    c.fillStyle = lin(c, 0, lv - sh, 0, lv, [[0, 'rgba(240,206,140,.16)'], [1, 'rgba(240,206,140,.4)']]); c.fill();
    c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y));
    c.strokeStyle = 'rgba(255,238,200,.75)'; c.lineWidth = 1; c.stroke();
    c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y - sh) : c.moveTo(x, y - sh));
    c.strokeStyle = 'rgba(255,238,200,.22)'; c.stroke();
    c.fillStyle = lin(c, 0, iT, 0, lv, [[0, 'rgba(255,255,255,.05)'], [1, 'rgba(255,255,255,.015)']]);
    c.fillRect(iL, iT, iR - iL, lv - sh - iT);
    c.restore();

    // dip tube
    const tx = bx + bw * .03;
    c.fillStyle = 'rgba(255,255,255,.07)'; c.fillRect(tx, T, .8, iB - T - 3);

    // cristal grueso: paredes oscuras por refracción con filos brillantes finos
    c.save(); c.clip(body);
    c.fillStyle = lin(c, L, 0, iL, 0, [[0, 'rgba(0,0,0,.5)'], [.1, 'rgba(255,255,255,.55)'], [.2, 'rgba(255,255,255,.04)'], [.72, 'rgba(0,0,0,.28)'], [.95, 'rgba(255,255,255,.34)'], [1, 'rgba(255,255,255,0)']]);
    c.fillRect(L, T, wall, bodyH);
    c.fillStyle = lin(c, iR, 0, R, 0, [[0, 'rgba(255,255,255,0)'], [.05, 'rgba(255,255,255,.26)'], [.28, 'rgba(0,0,0,.28)'], [.8, 'rgba(255,255,255,.03)'], [.9, 'rgba(255,255,255,.42)'], [1, 'rgba(0,0,0,.5)']]);
    c.fillRect(iR, T, wall, bodyH);
    c.fillStyle = lin(c, 0, T, 0, iT, [[0, 'rgba(255,255,255,.42)'], [.25, 'rgba(255,255,255,.03)'], [.8, 'rgba(0,0,0,.2)'], [1, 'rgba(255,255,255,.2)']]);
    c.fillRect(L, T, bw, iT - T);

    // base maciza: el líquido se refracta y brilla en el fondo del vidrio
    c.fillStyle = lin(c, 0, iB, 0, base, [[0, 'rgba(255,238,200,.85)'], [.03, 'rgba(255,200,112,.34)'], [.32, 'rgba(190,116,40,.12)'], [.78, 'rgba(0,0,0,.2)'], [.95, 'rgba(255,255,255,.08)'], [1, 'rgba(255,255,255,.5)']]);
    c.fillRect(L, iB, bw, base - iB);
    c.globalCompositeOperation = 'lighter';
    const cuna = (x0, x1, x2, a) => {
      c.fillStyle = lin(c, 0, iB, 0, base, [[0, `rgba(255,210,130,${a})`], [1, 'rgba(255,210,130,0)']]);
      c.beginPath(); c.moveTo(x0, iB); c.lineTo(x1, iB); c.lineTo(x2, base); c.closePath(); c.fill();
    };
    cuna(iL, iL + bw * .2, L + bw * .05, .3); cuna(iR, iR - bw * .2, R - bw * .05, .22); cuna(bx - bw * .1, bx + bw * .12, bx + bw * .02, .16);
    c.globalCompositeOperation = 'source-over';
    c.strokeStyle = 'rgba(255,255,255,.22)'; c.lineWidth = .7;
    c.beginPath(); c.moveTo(iL, iB); c.lineTo(L, base); c.moveTo(iR, iB); c.lineTo(R, base); c.stroke();

    // reflejos finos y afilados, en lugar de bandas anchas
    const veta = (x, ancho, y0, y1, a) => {
      c.fillStyle = lin(c, 0, y0, 0, y1, [[0, 'rgba(255,255,255,0)'], [.12, `rgba(255,255,255,${a})`], [.6, `rgba(255,255,255,${a * .55})`], [1, 'rgba(255,255,255,0)']]);
      c.beginPath(); c.moveTo(x, y0); c.lineTo(x + ancho, y0); c.lineTo(x + ancho * .35, y1); c.lineTo(x, y1); c.closePath(); c.fill();
    };
    veta(iL + bw * .05, bw * .022, iT, iB, .75);
    veta(iL + bw * .09, bw * .006, iT + bodyH * .04, iB - bodyH * .1, .5);
    veta(iR - bw * .06, bw * .01, iT + bodyH * .1, iB - bodyH * .04, .4);
    c.restore();

    c.strokeStyle = 'rgba(255,255,255,.1)'; c.lineWidth = .6; c.stroke(inner);
    c.strokeStyle = lin(c, 0, T, 0, base, [[0, 'rgba(255,255,255,.85)'], [.15, 'rgba(255,255,255,.3)'], [.85, 'rgba(255,255,255,.2)'], [1, 'rgba(255,255,255,.7)']]);
    c.lineWidth = .8; c.stroke(body);
    c.strokeStyle = lin(c, L, 0, R, 0, [[0, 'rgba(255,255,255,0)'], [.2, 'rgba(255,255,255,.75)'], [.55, 'rgba(255,255,255,.3)'], [1, 'rgba(255,255,255,0)']]);
    c.beginPath(); c.moveTo(L + rad, T + 1.5); c.lineTo(R - rad, T + 1.5); c.stroke();

    // collar
    const cL = bx - colW / 2;
    c.fillStyle = lin(c, cL, 0, cL + colW, 0, [[0, '#2e2312'], [.18, '#8c6c32'], [.36, '#e9d6a2'], [.44, '#fff3d0'], [.55, '#c8a45c'], [.8, '#5e4720'], [1, '#22190b']]);
    c.fillRect(cL, g.colTop, colW, colH);
    c.fillStyle = 'rgba(0,0,0,.3)'; for (let i = 1; i < 5; i++) c.fillRect(cL, g.colTop + colH * i / 5, colW, .7);
    c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(cL, g.colTop, colW, .8);

    // actuator
    const ay = this.actY(), aL = bx - aw / 2;
    const ap = new Path2D(); ap.roundRect(aL, ay, aw, g.colTop - ay, [aw * .16, aw * .16, 0, 0]);
    c.fillStyle = lin(c, aL, 0, aL + aw, 0, [[0, '#030303'], [.22, '#1d1d1d'], [.38, '#5a5a5a'], [.44, '#2a2a2a'], [.8, '#0d0d0d'], [1, '#020202']]);
    c.fill(ap);
    c.fillStyle = lin(c, 0, ay, 0, ay + ah * .3, [[0, 'rgba(255,255,255,.18)'], [1, 'rgba(255,255,255,0)']]); c.fill(ap);
    const nr = Math.max(1.2, aw * .05), nz = this.nozzle();
    c.fillStyle = '#000'; c.beginPath(); c.ellipse(aL + nr * .6, nz.y, nr * .55, nr, 0, 0, TAU); c.fill();
    c.strokeStyle = 'rgba(255,255,255,.28)'; c.lineWidth = .8; c.stroke();
  }
}
if (!customElements.get('perfume-spray')) customElements.define('perfume-spray', PerfumeSpray);
})();
