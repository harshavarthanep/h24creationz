/* H24 Creationz, studio edition. Hand-written, no framework. */
(function () {
'use strict';
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var root = document.documentElement;
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var WA = '918667701001', MAIL = 'harshavarthanep@gmail.com';
var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
var esc = function (t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
var isMac = /Mac|iPhone|iPad/.test(navigator.platform || '');
if (isMac) $$('.kmod').forEach(function (k) { k.textContent = '⌘'; });
var ICHECK = '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6.2l2.3 2.3 4.7-5"/></svg>';
var IARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';

/* ---------- Smooth scroll ---------- */
var lenis = null;
function startLenis() {
  if (lenis || reduce || !window.Lenis) return;
  try { lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true }); (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now()); } catch (e) { lenis = null; }
}
if (window.Lenis) startLenis(); else window.addEventListener('load', startLenis);
function lockScroll(on) { if (lenis) { on ? lenis.stop() : lenis.start(); } document.body.style.overflow = on ? 'hidden' : ''; }
function goTo(sel) {
  var el = typeof sel === 'string' ? $(sel) : sel; if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.3 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: reduce ? 'auto' : 'smooth' });
}
document.addEventListener('click', function (e) {
  var a = e.target.closest('a[href^="#"]'); if (!a) return;
  var h = a.getAttribute('href'); if (h.length < 2) return;
  var t = document.getElementById(h.slice(1)); if (!t) return;
  e.preventDefault(); goTo(t); if (history.replaceState) history.replaceState(null, '', h);
});

/* ---------- Toast + copy ---------- */
var toastEl = $('#toast'), toastT;
function toast(m) { toastEl.textContent = m; toastEl.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('on'); }, 2200); }
function copy(text, msg) {
  function fb() { var t = document.createElement('textarea'); t.value = text; t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); toast(msg); } catch (e) { toast('Copy failed. Select the text and copy it.'); } t.remove(); }
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { toast(msg); }, fb); else fb();
}
function loadScript(src) { return new Promise(function (res, rej) { var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }

/* ---------- Theme: circular reveal + fire/water ambience ---------- */
function effTheme() { return root.getAttribute('data-eff') || 'dark'; }
function setTheme(nx, x, y) {
  function apply() {
    root.setAttribute('data-theme', nx); root.setAttribute('data-eff', nx);
    try { localStorage.setItem('h24-theme', nx); } catch (e) {}
    var m = $$('meta[name="theme-color"]'); m.forEach(function (t) { t.setAttribute('content', nx === 'light' ? '#F2EAE0' : '#170B0C'); });
    Amb.mode(nx);
  }
  if (document.startViewTransition && !reduce) {
    var w = window.innerWidth, h = window.innerHeight;
    root.style.setProperty('--vx', x + 'px'); root.style.setProperty('--vy', y + 'px');
    root.style.setProperty('--vr', Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) + 'px');
    root.classList.add('vt');
    var t = document.startViewTransition(apply);
    t.finished.then(function () { root.classList.remove('vt'); }, function () { root.classList.remove('vt'); });
  } else apply();
  toast(nx === 'light' ? 'Light: the water side of H24' : 'Dark: the fire side of H24');
}
$('#themeBtn').addEventListener('click', function (e) {
  var r = this.getBoundingClientRect();
  setTheme(effTheme() === 'light' ? 'dark' : 'light', e.clientX || r.left + r.width / 2, e.clientY || r.top + r.height / 2);
});
if (window.matchMedia) matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
  if (!root.getAttribute('data-theme')) { root.setAttribute('data-eff', e.matches ? 'light' : 'dark'); Amb.mode(effTheme()); }
});

/* ---------- Ambient: embers in dark, rising water in light ---------- */
var Amb = (function () {
  var cv = $('#amb'), hero = $('#hero'); if (!cv) return { mode: function () {} };
  var ctx = cv.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 1.5), W = 0, H = 0, P = [], raf = 0, vis = true, mode = effTheme();
  function sprite(c1, c2, r, ring) {
    var s = document.createElement('canvas'); s.width = s.height = r * 2; var g = s.getContext('2d');
    var gr = g.createRadialGradient(r, r, 0, r, r, r);
    if (ring) { gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(.62, 'rgba(255,255,255,.05)'); gr.addColorStop(.82, c1); gr.addColorStop(1, 'rgba(255,255,255,0)'); }
    else { gr.addColorStop(0, c1); gr.addColorStop(.35, c2); gr.addColorStop(1, 'rgba(0,0,0,0)'); }
    g.fillStyle = gr; g.fillRect(0, 0, r * 2, r * 2); return s;
  }
  var EMB = [sprite('rgba(255,230,150,1)', 'rgba(244,93,10,.55)', 24), sprite('rgba(255,200,90,1)', 'rgba(211,34,15,.5)', 24)];
  var BUB = [sprite('rgba(13,102,208,.55)', '', 32, true), sprite('rgba(37,184,244,.6)', '', 32, true)];
  function size() { var r = cv.getBoundingClientRect(); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); var n = Math.round(clamp(W * H / 26000, 14, 56)); while (P.length < n) P.push(spawn(true)); P.length = n; }
  function spawn(any) {
    var light = mode === 'light';
    return { x: Math.random() * W, y: any ? Math.random() * H : H + 20, s: light ? 6 + Math.random() * 16 : 1.5 + Math.random() * 3.5, v: light ? .25 + Math.random() * .5 : .4 + Math.random() * 1.1, a: 0, ta: light ? .25 + Math.random() * .45 : .35 + Math.random() * .6, ph: Math.random() * 6.28, sw: .3 + Math.random() * .9, k: Math.random() < .5 ? 0 : 1, light: light };
  }
  function tick(t) {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < P.length; i++) {
      var p = P[i]; p.y -= p.v; p.x += Math.sin(t / 900 + p.ph) * p.sw * (p.light ? .4 : .6); p.a += (p.ta - p.a) * .03;
      var life = clamp(p.y / H, 0, 1); var al = p.a * (p.light ? Math.min(1, life * 1.6) : life * (0.75 + 0.25 * Math.sin(t / 120 + p.ph)));
      if (p.y < -30) { P[i] = spawn(false); continue; }
      ctx.globalAlpha = al; var spr = p.light ? BUB[p.k] : EMB[p.k]; var d = p.s * (p.light ? 2 : 6);
      ctx.drawImage(spr, p.x - d / 2, p.y - d / 2, d, d);
    }
    ctx.globalAlpha = 1;
    raf = vis && !document.hidden ? requestAnimationFrame(tick) : 0;
  }
  function wake() { if (!raf && !reduce && vis) raf = requestAnimationFrame(tick); }
  if (!reduce) {
    size(); window.addEventListener('resize', function () { size(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { vis = en[0].isIntersecting; wake(); }).observe(hero);
    document.addEventListener('visibilitychange', wake); wake();
  }
  return { mode: function (m) { mode = m; P.forEach(function (p, i) { var n = spawn(true); n.y = p.y; n.a = 0; P[i] = n; }); } };
})();

/* ---------- Headline split ---------- */
(function () { var h = $('#h1'); var w = h.textContent.trim().split(/\s+/); h.setAttribute('aria-label', h.textContent.trim()); h.innerHTML = w.map(function (x, i) { return '<span class="w" aria-hidden="true"><span style="--i:' + i + '">' + x + '</span></span>'; }).join(' '); })();

/* ---------- Studio monitor ---------- */
var Monitor = (function () {
  var mon = $('#monitor'), scenes = $$('.scene', mon), tabs = $$('.tab', mon), urlEl = $('#monUrl'), pauseBtn = $('#monPause'), typed = $('#typed'), vtc = $('#vtc');
  var cur = 0, userPaused = false, hoverPaused = false, inView = true, typeT, vtcRaf, started = false, QUERY = 'best clinic near me';
  function setPaused() { mon.classList.toggle('paused', userPaused || hoverPaused || !inView || document.hidden); }
  function typeIt() { clearTimeout(typeT); typed.textContent = ''; var i = 0; (function step() { typed.textContent = QUERY.slice(0, i++); if (i <= QUERY.length) typeT = setTimeout(step, reduce ? 0 : 55); })(); }
  function timecode() { cancelAnimationFrame(vtcRaf); var t0 = performance.now(); (function f(n) { var ms = n - t0, fr = Math.floor(ms / 1000 * 24), s = Math.floor(fr / 24); vtc.textContent = '00:00:' + (s < 10 ? '0' : '') + s + ':' + ((fr % 24) < 10 ? '0' : '') + (fr % 24); if (cur === 3 && ms < 5600) vtcRaf = requestAnimationFrame(f); })(t0); }
  function show(n) {
    cur = (n + scenes.length) % scenes.length;
    scenes.forEach(function (s) { s.classList.remove('on'); }); tabs.forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
    void mon.offsetWidth; scenes[cur].classList.add('on'); tabs[cur].setAttribute('aria-selected', 'true');
    urlEl.textContent = scenes[cur].dataset.url; if (cur === 2) typeIt(); if (cur === 3) timecode();
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { show(+t.dataset.i); }); $('u', t).addEventListener('animationend', function () { if (started && !reduce) show(cur + 1); }); });
  pauseBtn.addEventListener('click', function () {
    userPaused = !userPaused; pauseBtn.setAttribute('aria-pressed', userPaused ? 'true' : 'false'); pauseBtn.setAttribute('aria-label', userPaused ? 'Play the demo' : 'Pause the demo');
    pauseBtn.innerHTML = userPaused ? '<svg viewBox="0 0 12 12" fill="currentColor"><path d="M3 1.5v9l7-4.5z"/></svg>' : '<svg viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="1.5" width="2.6" height="9" rx=".6"/><rect x="7.4" y="1.5" width="2.6" height="9" rx=".6"/></svg>'; setPaused();
  });
  if (matchMedia('(hover:hover) and (pointer:fine)').matches && !reduce) {
    mon.addEventListener('pointerenter', function () { hoverPaused = true; setPaused(); });
    mon.addEventListener('pointerleave', function () { hoverPaused = false; setPaused(); mon.style.setProperty('--rx', '0deg'); mon.style.setProperty('--ry', '0deg'); });
    mon.addEventListener('pointermove', function (e) { var r = mon.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; mon.style.setProperty('--ry', (x * 7).toFixed(2) + 'deg'); mon.style.setProperty('--rx', (-y * 5).toFixed(2) + 'deg'); });
  }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { inView = en[0].isIntersecting; setPaused(); }).observe(mon);
  document.addEventListener('visibilitychange', setPaused);
  return { start: function () { started = true; show(0); setPaused(); } };
})();

/* ---------- Intro ---------- */
(function () {
  var ld = $('#leader'), seen = false, done = false; try { seen = sessionStorage.getItem('h24-intro') === '1'; } catch (e) {}
  function start() { if (done) return; done = true; root.classList.add('ready'); Monitor.start(); }
  function finish() { if (!ld) return; ld.classList.add('out'); setTimeout(function () { if (ld) ld.remove(); ld = null; }, 650); start(); }
  if (reduce || seen) { ld.remove(); ld = null; requestAnimationFrame(start); return; }
  try { sessionStorage.setItem('h24-intro', '1'); } catch (e) {}
  ld.addEventListener('click', finish); setTimeout(finish, 1800);
})();

/* ---------- Header, menu, scrollspy ---------- */
var topBar = $('#top'), lastY = window.scrollY, menuBtn = $('#menuBtn'), mnav = $('#mnav'), fab = $('#fab');
function header() {
  var y = window.scrollY, solid = y > window.innerHeight * .6;
  topBar.classList.toggle('solid', solid);
  if (y > lastY + 4 && y > window.innerHeight) topBar.classList.add('tuck'); else if (y < lastY - 4 || y < 200) topBar.classList.remove('tuck');
  lastY = y; fab.classList.toggle('on', y > window.innerHeight * .9 && !ctVisible);
}
function menu(o) { mnav.hidden = !o; menuBtn.setAttribute('aria-expanded', o ? 'true' : 'false'); lockScroll(o); if (o) $('a', mnav).focus(); else menuBtn.focus(); }
menuBtn.addEventListener('click', function () { menu(true); });
$('#menuClose').addEventListener('click', function () { menu(false); });
$$('a', mnav).forEach(function (a) { a.addEventListener('click', function () { mnav.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); lockScroll(false); }); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !mnav.hidden) menu(false); });
if ('IntersectionObserver' in window) {
  var links = $$('.nav a');
  var spy = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) links.forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id ? 'true' : 'false'); }); }); }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) spy.observe(s); });
}

/* ---------- Manifesto ---------- */
var mani = $('#mani'), mws = [];
(function () {
  Array.prototype.slice.call(mani.childNodes).forEach(function (n) {
    if (n.nodeType === 3) { var f = document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(function (p) { if (!p) return; if (/^\s+$/.test(p)) f.appendChild(document.createTextNode(p)); else { var s = document.createElement('span'); s.className = 'mw'; s.textContent = p; f.appendChild(s); mws.push(s); } }); mani.replaceChild(f, n); }
    else if (n.nodeType === 1) { n.classList.add('mw'); mws.push(n); }
  });
})();
function manifesto() { if (reduce) return; var r = mani.getBoundingClientRect(), vh = window.innerHeight, p = clamp((vh * .82 - r.top) / (r.height + vh * .25), 0, 1), k = Math.floor(p * mws.length * 1.05); mws.forEach(function (w, i) { w.classList.toggle('lit', i < k); }); }

/* ---------- Brief state (shared) ---------- */
var SVC_GROUPS = [
  ['Brand', [['brand', 'Brand identity'], ['logo', 'Logo design'], ['tagline', 'Name and tagline'], ['cards', 'Business cards with QR'], ['brochure', 'Brochure'], ['design', 'Graphic design'], ['pack', 'Packaging']]],
  ['Online', [['web', 'Website or redesign'], ['store', 'Online store'], ['landing', 'Landing page for ads'], ['booking', 'Online booking'], ['app', 'App for phones']]],
  ['Get found', [['maps', 'Google Maps listing', 1], ['seo', 'SEO'], ['geo', 'AI search visibility (GEO)', 1]]],
  ['Grow', [['video', 'AI video and reels', 1], ['social', 'Social media setup'], ['wa', 'WhatsApp automation', 1], ['bot', 'AI chat assistant', 1], ['tools', 'Dashboard or tool']]]
];
var SVCS = {}, ORD = [];
SVC_GROUPS.forEach(function (g) { g[1].forEach(function (s) { SVCS[s[0]] = s[1]; ORD.push(s[0]); }); });
var brief = {}, goals = {}, when = '', stage = '', kitList = [], extras = {}, ctVisible = false;
var STAGES = { 'new': 'Starting a brand', re: 'Rebranding', grow: 'Growing', launch: 'Launching a product' };
var tray = $('#tray'), trayCnt = $('#trayCnt'), trayTxt = $('#trayTxt');
function picked() { return ORD.filter(function (k) { return brief[k]; }); }
function setSvc(k, on) { if (!SVCS[k]) return; if (on) brief[k] = 1; else delete brief[k]; sync(); }
function sync() {
  $$('[data-svc]').forEach(function (b) { var on = !!brief[b.dataset.svc]; b.setAttribute('aria-pressed', on ? 'true' : 'false'); var t = $('.t', b); if (t) t.textContent = on ? 'Added to brief' : 'Add to brief'; });
  var n = picked().length + kitList.length; trayCnt.textContent = n; trayTxt.textContent = n === 1 ? 'item in your brief' : 'items in your brief';
  tray.classList.toggle('on', n > 0 && !ctVisible); compose();
}
(function chips() {
  var box = $('#svcChips'), h = '';
  SVC_GROUPS.forEach(function (g) { h += '<span class="cgrp">' + g[0] + '</span>'; g[1].forEach(function (s) { h += '<button type="button" class="chip" data-svc="' + s[0] + '" aria-pressed="false">' + (s[2] ? '<span class="hot" aria-hidden="true"></span>' : '') + s[1] + '</button>'; }); });
  box.innerHTML = h;
})();
document.addEventListener('click', function (e) {
  var b = e.target.closest('[data-svc]'); if (!b || b.closest('#items')) return;
  var k = b.dataset.svc, on = !brief[k]; setSvc(k, on); if (on && !b.classList.contains('chip')) toast(SVCS[k] + ' added to your brief');
});

/* ---------- Pain points ---------- */
var PAINS = [
  { q: "I'm starting a business and don't know where to begin.", svc: 'brand', title: 'Start with a complete brand kit', text: 'Name, logo, tagline, website, cards with QR, social handles and a Google Maps listing, designed together so you look established from day one.', inc: ['A name and tagline that fit', 'Logo, colours and type', 'Website and Google Maps listing', 'Cards, social profiles and templates'], proof: ['#builder', 'Build your kit now'] },
  { q: 'Customers find my competitor first on Google.', svc: 'seo', title: 'Get found first, on Google and Maps', text: 'When someone nearby searches for what you do, you should be the first business they see, with your hours, photos and reviews right there.', inc: ['Google Business Profile set up and tuned', 'Service pages written around real searches', 'Consistent business details everywhere', 'Monthly checks on where you rank'], proof: ['dap', 'See DAP Fitness'] },
  { q: 'ChatGPT never mentions my business.', svc: 'geo', title: 'Become the business AI recommends', text: "More people now ask ChatGPT, Gemini and Google's AI for recommendations. AI tools recommend businesses they can clearly understand and verify.", inc: ['Clear, structured facts about your business', 'Answers to the questions customers ask AI', 'Structured data machines can read', 'Consistent details across the web'], proof: ['#check', 'Take the free check'] },
  { q: 'My website looks old and breaks on phones.', svc: 'web', title: 'A fast site that works on every phone', text: 'Most visitors arrive on a phone. A slow or broken site sends them to a competitor before they read a word.', inc: ['Mobile-first design and build', 'Installs on a phone like an app', 'One-tap call and WhatsApp buttons', 'Hosting, updates and fixes handled'], proof: ['rmax', 'See Rmax'] },
  { q: "People don't trust us before they visit.", svc: 'brand', title: 'Look trustworthy before they meet you', text: 'People decide whether to trust you in seconds. A clear, consistent brand does that work for you everywhere they see you.', inc: ['Positioning and tagline', 'Logo and visual identity', 'One look across web, social and signage', 'Templates your team can reuse'], proof: ['arjuna', 'See Arjuna Hospital'] },
  { q: 'Ads and reels cost too much to shoot.', svc: 'video', title: 'Premium ads, without a film crew', text: 'Festival offers, launches and reels need fresh video every month. AI production gives you that quality at a fraction of a shoot.', inc: ['Concept, script and storyboard', 'Multi-scene AI video', 'Festival and launch campaigns', 'Every size: reels, shorts, ads'], proof: ['ocb', 'See OCB'] },
  { q: 'Enquiries come in, then get lost on WhatsApp.', svc: 'wa', title: 'Never lose a lead in your chats again', text: 'Enquiries that wait for a reply go cold. Every one should get an instant answer and land somewhere your team can track.', inc: ['Website forms that open in WhatsApp', 'Instant replies and follow-up reminders', 'Leads collected in one sheet', 'An AI assistant for common questions'], proof: ['blend', 'See Blend Infra'] },
  { q: 'My team copies data between sheets all day.', svc: 'tools', title: 'Let tools do the copying', text: 'Hours spent moving data between sheets is time not spent with customers. Small, focused tools give those hours back every week.', inc: ['Google Sheets dashboards', 'Custom web tools for your team', 'Automations between your apps', 'Private by design'], proof: ['#lab', 'See our own apps'] }
];
var plist = $('#plist'), fix = $('#fix'), painGrid = $('.pains-grid'), curPain = 0;
plist.innerHTML = PAINS.map(function (p, i) { return '<button class="pain" role="tab" aria-selected="' + (i === 0) + '" data-p="' + i + '"><span class="pk"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h6M6.5 3.5L9 6 6.5 8.5"/></svg></span>' + p.q + '</button>'; }).join('');
var pains = $$('.pain', plist);
function placeFix() { if (window.innerWidth <= 1024) { if (fix.previousElementSibling !== pains[curPain]) pains[curPain].after(fix); } else if (fix.parentNode !== painGrid) painGrid.appendChild(fix); }
function renderPain(i) {
  curPain = i; placeFix(); pains.forEach(function (p, k) { p.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
  var d = PAINS[i], on = !!brief[d.svc];
  var proof = d.proof[0].charAt(0) === '#' ? '<a class="proof-l" href="' + d.proof[0] + '">' + d.proof[1] + '</a>' : '<button class="proof-l" data-open="' + d.proof[0] + '">' + d.proof[1] + '</button>';
  fix.innerHTML = '<div class="fix-in"><span class="lab">Here\'s what we do about it</span><h3>' + d.title + '</h3><p>' + d.text + '</p><ul>' + d.inc.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul><div class="acts"><button class="add" data-svc="' + d.svc + '" aria-pressed="' + on + '"><span class="bx">' + ICHECK + '</span><span class="t">' + (on ? 'Added to brief' : 'Add to brief') + '</span></button>' + proof + '</div></div>';
}
pains.forEach(function (p, i) {
  p.addEventListener('click', function () { renderPain(i); });
  p.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); var n = (i + (e.key === 'ArrowDown' ? 1 : -1) + pains.length) % pains.length; pains[n].focus(); renderPain(n); } });
});

/* ---------- QR helper (library loads on demand) ---------- */
var qrReady = null;
function qrLib() { if (!qrReady) qrReady = window.qrcode ? Promise.resolve() : loadScript('assets/js/qrcode.min.js'); return qrReady; }
function drawQR(canvas, text, fg, bg, quiet) {
  if (!window.qrcode || !text) return;
  var q = window.qrcode(0, 'M'); q.addData(unescape(encodeURIComponent(text))); q.make();
  var n = q.getModuleCount(), qz = quiet == null ? 2 : quiet, size = canvas.width, cell = size / (n + qz * 2), c = canvas.getContext('2d');
  c.fillStyle = bg || '#fff'; c.fillRect(0, 0, size, size); c.fillStyle = fg || '#1C0C0D';
  for (var r = 0; r < n; r++) for (var k = 0; k < n; k++) if (q.isDark(r, k)) c.fillRect(Math.floor((k + qz) * cell), Math.floor((r + qz) * cell), Math.ceil(cell), Math.ceil(cell));
}

/* ---------- Brand builder ---------- */
var PALS = [['Fire', '#F45D0A', '#1C0C0D', '#FFD640'], ['Ocean', '#0D66D0', '#0B1B33', '#8BE8FF'], ['Forest', '#1F7A63', '#0E2A22', '#E9C46A'], ['Berry', '#B5179E', '#2B0A3D', '#FFB3E6'], ['Mono', '#E3262E', '#111111', '#F2EAE0']];
var KIT = [
  ['name', 'Brand name', 's31', 'tagline'], ['logo', 'Logo', 's22', 'logo'], ['tag', 'Tagline', 's31', 'tagline'], ['col', 'Colours and type', 's21', 'brand'],
  ['web', 'Website', 's32', 'web'], ['card', 'Business cards with QR', 's21', 'cards'], ['soc', 'Social media handles', 's23', 'social'], ['maps', 'Google Maps listing', 's22', 'maps'],
  ['bro', 'Brochure', 's22', 'brochure'], ['let', 'Letterhead', 's12', 'design'], ['pack', 'Packaging', 's22', 'pack'], ['sign', 'Signage', 's31', 'design'],
  ['mail', 'Email signature', 's21', 'design'], ['deck', 'Pitch deck', 's21', 'design'], ['vid', 'AI brand video', 's21', 'video'], ['des', 'Graphic design', 's12', 'design']
];
var KMAP = {}; KIT.forEach(function (k) { KMAP[k[0]] = k; });
var PRESET = { 'new': ['name', 'logo', 'tag', 'col', 'web', 'card', 'soc', 'maps'], re: ['logo', 'col', 'web', 'card', 'soc', 'sign', 'let'], grow: ['web', 'maps', 'soc', 'vid', 'bro', 'mail'], launch: ['pack', 'web', 'vid', 'soc', 'deck', 'des'] };
var TAGS = { 'new': 'Made to be remembered.', re: 'Same heart. New look.', grow: 'Now easier to find.', launch: 'Something new is here.' };
var bb = { stage: 'new', pal: 0, sel: PRESET['new'].slice() };
var kgrid = $('#kgrid'), kit = $('#kit'), bbName = $('#bbName'), itemsBox = $('#items');
$('#pals').innerHTML = PALS.map(function (p, i) { return '<button role="radio" aria-checked="' + (i === 0) + '" aria-label="' + p[0] + '" data-pal="' + i + '" style="background:conic-gradient(' + p[1] + ' 0 50%,' + p[2] + ' 50% 80%,' + p[3] + ' 80%)"></button>'; }).join('');
itemsBox.innerHTML = KIT.map(function (k) { return '<button class="it" data-kit="' + k[0] + '" aria-pressed="false"><span class="tk">' + ICHECK + '</span>' + k[1] + '</button>'; }).join('');
function bind() {
  var nm = (bbName.value || 'Your Brand').trim() || 'Your Brand';
  var words = nm.split(/\s+/), init = (words[0][0] + (words[1] ? words[1][0] : (words[0][1] || ''))).toUpperCase();
  var slug = nm.toLowerCase().replace(/[^a-z0-9]+/g, '');
  var vals = { name: nm, init: init, handle: '@' + slug, domain: slug + '.in', tagline: TAGS[bb.stage] };
  $$('[data-b]', kgrid).forEach(function (el) { el.textContent = vals[el.dataset.b]; });
  var kt = $('#kitTitle'); if (kt) kt.textContent = nm + ' kit';
  $$('canvas.kqr', kgrid).forEach(function (c) { qrLib().then(function () { drawQR(c, 'https://' + vals.domain, PALS[bb.pal][2], '#fff', 1); }); });
  return vals;
}
function mock(id) {
  var P = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>';
  switch (id) {
    case 'name': return '<span data-b="name"></span>';
    case 'logo': return '<span data-b="init"></span>';
    case 'tag': return '<span>“<span data-b="tagline"></span>”</span>';
    case 'col': return '<span></span><span></span><span></span><span></span>';
    case 'web': return '<div class="bar"><i></i><i></i><i></i><u data-b="domain"></u></div><div class="bd"><div><b data-b="name"></b><em>Book a visit</em></div><span></span></div>';
    case 'card': return '<div><b data-b="name"></b><small data-b="domain"></small></div><div class="qr"><canvas class="kqr" width="88" height="88"></canvas></div>';
    case 'soc': return '<div class="pf"><span data-b="init"></span><b data-b="handle"></b></div><div class="gr"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>';
    case 'maps': return '<div class="pin">' + P + '<span><b data-b="name"></b> · <em>Open now</em></span></div>';
    case 'bro': return '<i></i><i></i><i></i>';
    case 'let': return '<b data-b="name"></b><i></i><i></i><i></i><i></i><i></i><i></i>';
    case 'pack': return '<div class="box"><i data-t=""></i><i></i><i></i></div>';
    case 'sign': return '<span data-b="name"></span>';
    case 'mail': return '<span data-b="init"></span><div><b data-b="name"></b><small data-b="domain"></small></div>';
    case 'deck': return '<small>Investor deck</small><b data-b="name"></b><i></i>';
    case 'vid': return '<span></span>';
    case 'des': return '<i></i><i></i>';
  }
  return '';
}
var CLS = { name: 'm-name', logo: 'm-logo', tag: 'm-tag', col: 'm-col', web: 'm-web', card: 'm-card', soc: 'm-soc', maps: 'm-map', bro: 'm-bro', let: 'm-let', pack: 'm-pack', sign: 'm-sign', mail: 'm-mail', deck: 'm-deck', vid: 'm-vid', des: 'm-des' };
function renderKit(animateNew) {
  var have = {}; $$('.kp', kgrid).forEach(function (el) { if (!el.classList.contains('out')) have[el.dataset.k] = el; });
  Object.keys(have).forEach(function (k) { if (bb.sel.indexOf(k) < 0) { var el = have[k]; el.classList.add('out'); setTimeout(function () { el.remove(); emptyState(); }, reduce ? 0 : 340); } });
  var order = KIT.map(function (k) { return k[0]; }).filter(function (k) { return bb.sel.indexOf(k) > -1; });
  order.forEach(function (k, idx) {
    var el = have[k];
    if (!el) {
      el = document.createElement('div'); el.className = 'kp ' + CLS[k] + ' ' + KMAP[k][2]; el.dataset.k = k;
      el.style.setProperty('--r', ((Math.random() * 14) - 7).toFixed(1) + 'deg'); el.style.animationDelay = animateNew ? (idx * 60) + 'ms' : '0ms';
      el.innerHTML = mock(k) + '<data class="lbl">' + KMAP[k][1] + '</data>';
      if (k === 'pack') { var i0 = $('i', el); i0.setAttribute('data-t', ''); }
    }
    kgrid.appendChild(el);
  });
  var v = bind(); $$('.m-pack .box i:first-child', kgrid).forEach(function (i) { i.setAttribute('data-t', v.init); });
  $$('.it', itemsBox).forEach(function (b) { b.setAttribute('aria-pressed', bb.sel.indexOf(b.dataset.kit) > -1 ? 'true' : 'false'); });
  var c = $('#kitCount'); c.textContent = bb.sel.length; c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
  $('#kitTitle').textContent = v.name + ' kit';
  emptyState();
}
function emptyState() { var e = $('.k-empty', kgrid); if (!$('.kp:not(.out)', kgrid)) { if (!e) { e = document.createElement('div'); e.className = 'k-empty'; e.textContent = 'Your kit is empty. Tap any piece on the left to add it.'; kgrid.appendChild(e); } } else if (e) e.remove(); }
function setPal(i) { bb.pal = i; var p = PALS[i]; kit.style.setProperty('--c1', p[1]); kit.style.setProperty('--c2', p[2]); kit.style.setProperty('--c3', p[3]); $('#palName').textContent = p[0]; $$('#pals button').forEach(function (b) { b.setAttribute('aria-checked', +b.dataset.pal === i ? 'true' : 'false'); }); bind(); }
$$('#stageSeg button').forEach(function (b) { b.addEventListener('click', function () { bb.stage = b.dataset.stage; bb.sel = PRESET[bb.stage].slice(); $$('#stageSeg button').forEach(function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); }); renderKit(true); }); });
$$('#pals button').forEach(function (b) { b.addEventListener('click', function () { setPal(+b.dataset.pal); }); });
itemsBox.addEventListener('click', function (e) { var b = e.target.closest('.it'); if (!b) return; var k = b.dataset.kit, i = bb.sel.indexOf(k); if (i > -1) bb.sel.splice(i, 1); else bb.sel.push(k); renderKit(false); });
bbName.addEventListener('input', bind);
$('#kitSend').addEventListener('click', function () {
  if (!bb.sel.length) { toast('Add at least one piece to your kit first.'); return; }
  kitList = bb.sel.map(function (k) { return KMAP[k][1]; });
  bb.sel.forEach(function (k) { if (KMAP[k][3]) brief[KMAP[k][3]] = 1; });
  setStage(bb.stage); if (!fBiz.value.trim() && bbName.value.trim()) fBiz.value = bbName.value.trim();
  sync(); toast('Kit added to your brief'); goTo('#contact'); setTimeout(function () { fName.focus({ preventScroll: true }); }, 1300);
});
setPal(0); renderKit(true);

/* ---------- Covers ---------- */
function coverOf(id) { var f = $('.frame[data-id="' + id + '"] .cover'); return f ? f.cloneNode(true) : null; }

/* ---------- Work reel ---------- */
var Reel = (function () {
  var sec = $('#work'), track = $('#track'), frames = $$('.frame', track), bar = $('#reelBar'), nameEl = $('#reelName'), dist = 0, native = false;
  function measure() {
    native = reduce || window.innerWidth < 760 || (window.innerHeight < 520 && window.innerWidth > window.innerHeight);
    sec.classList.toggle('native', native);
    if (native) { sec.style.height = ''; track.style.transform = ''; return; }
    track.style.transform = ''; dist = Math.max(0, track.scrollWidth - window.innerWidth); sec.style.height = (dist + window.innerHeight) + 'px'; update();
  }
  function update() {
    if (native) return; var tp = sec.getBoundingClientRect().top, p = dist ? clamp(-tp / dist, 0, 1) : 0;
    track.style.transform = 'translate3d(' + (-p * dist).toFixed(1) + 'px,0,0)'; bar.style.transform = 'scaleX(' + p.toFixed(3) + ')';
    var cx = window.innerWidth / 2, best = 0, bd = 1e9;
    frames.forEach(function (f, i) { var r = f.getBoundingClientRect(), dx = Math.abs(r.left + r.width / 2 - cx); if (dx < bd) { bd = dx; best = i; } f.style.setProperty('--d', Math.min(1, dx / (window.innerWidth * .8)).toFixed(3)); });
    nameEl.textContent = frames[best].dataset.name + '  ' + (best + 1) + ' of ' + frames.length;
  }
  return { measure: measure, update: update };
})();

/* ---------- Dialog helpers ---------- */
var lastFocus = null;
function openDlg(d) { lastFocus = document.activeElement; if (d.showModal) d.showModal(); else d.setAttribute('open', ''); lockScroll(true); }
function closeDlg(d) { if (!d.open) return; d.classList.add('closing'); setTimeout(function () { d.classList.remove('closing'); if (d.close) d.close(); else d.removeAttribute('open'); }, reduce ? 0 : 200); }
function wireDlg(d) {
  d.addEventListener('close', function () { lockScroll(false); if (lastFocus) lastFocus.focus(); });
  d.addEventListener('cancel', function (e) { e.preventDefault(); closeDlg(d); });
  d.addEventListener('click', function (e) { if (e.target === d || e.target.closest('[data-close]')) closeDlg(d); });
}
/* project stories */
var pd = $('#pd'), pdCover = $('#pdCover'), pdBody = $('#pdBody');
wireDlg(pd);
function openProject(id) { var f = $('.frame[data-id="' + id + '"]'); if (!f) return; pdCover.innerHTML = ''; pdBody.innerHTML = ''; pdCover.appendChild(coverOf(id)); pdBody.appendChild($('.detail', f).cloneNode(true)); if ($('#svcSheet').open) $('#svcSheet').close(); openDlg(pd); }
pd.addEventListener('click', function (e) { var s = e.target.closest('[data-similar]'); if (s) { s.dataset.similar.split(',').forEach(function (k) { brief[k] = 1; }); sync(); closeDlg(pd); setTimeout(function () { goTo('#contact'); }, 230); } });
document.addEventListener('click', function (e) { var h = e.target.closest('.frame .hit'); if (h) { openProject(h.closest('.frame').dataset.id); return; } var o = e.target.closest('[data-open]'); if (o) openProject(o.dataset.open); });

/* ---------- Services + service sheets ---------- */
var SERV = [
  { svc: 'brand', peek: 'arjuna', theme: '', title: 'Branding and rebranding', sub: 'From a new name to a full refresh. A look customers remember and trust.', pain: 'For when you are starting out, or your look no longer fits.', incl: ['Name and tagline', 'Logo', 'Colours and type', 'Brochure', 'Business cards with QR', 'Social media handles'],
    dels: ['Brand name', 'Tagline', 'Logo', 'Colour and type system', 'Brand guidelines', 'Brochure', 'Business cards with QR', 'Letterhead and stationery', 'Social media handles and kit', 'Packaging', 'Signage'], steps: ['Learn your story and customers', 'Explore directions together', 'Refine the chosen look', 'Hand over every file you need'], proof: ['arjuna', 'See Arjuna Hospital'],
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/></svg>' },
  { svc: 'web', peek: 'rmax', theme: 'water', title: 'Websites and web apps', sub: 'Fast sites that install on a phone like an app.', pain: 'For when your site is slow, old, or hard to use on a phone.', incl: ['Design and build', 'Installable web app', 'Online stores and booking', 'Hosting and updates'],
    dels: ['Website design and build', 'Installable web app (PWA)', 'Online store', 'Booking system', 'Landing pages for ads', 'WhatsApp and call buttons', 'Hosting and updates', 'Speed and security'], steps: ['Plan pages around what customers ask', 'Design for phones first', 'Build, test on every device', 'Launch, host and keep it updated'], proof: ['rmax', 'See Rmax'],
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 8h18M8 21h8"/></svg>' },
  { svc: 'seo', peek: 'dap', theme: 'ink', title: 'SEO, GEO and Google Maps', sub: 'Found on Google, on Maps and in AI answers.', pain: 'For when customers find your competitor first.', incl: ['Google Maps listing', 'On-page and technical SEO', 'Structured data for AI', 'Content that answers real questions'],
    dels: ['Google Maps listing', 'On-page SEO', 'Technical SEO', 'Structured data for AI search', 'Review strategy', 'Content that answers questions', 'Local listings and citations', 'Monthly ranking report'], steps: ['Check how you show up today', 'Fix your details everywhere', 'Publish pages people search for', 'Track and improve every month'], proof: ['dap', 'See DAP Fitness'],
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>' },
  { svc: 'video', peek: 'ocb', theme: '', title: 'AI video campaigns', sub: 'Festival, launch and product ads, without a film shoot.', pain: 'For when every reel needs a crew you can not afford.', incl: ['Concept and script', 'Multi-scene AI video', 'Reels, shorts and ads', 'Sizes for every platform'],
    dels: ['Concept and script', 'Storyboard', 'Multi-scene AI video', 'Festival campaigns', 'Product launch ads', 'Reels and shorts', 'Every aspect ratio', 'Captions and voice-over'], steps: ['Agree the idea and script', 'Storyboard every scene', 'Produce and edit', 'Deliver every size you need'], proof: ['ocb', 'See OCB'],
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="13" height="14" rx="2"/><path d="M16 10l5-3v10l-5-3"/></svg>' },
  { svc: 'tools', peek: 'blend', theme: 'paper', title: 'Tools and automation', sub: 'Less repetitive work for your team.', pain: 'For when leads, sheets and follow-ups eat your day.', incl: ['WhatsApp automation', 'AI chat assistant', 'Google Sheets dashboards', 'Custom web tools'],
    dels: ['WhatsApp automation', 'AI chat assistant', 'Lead tracking sheet', 'Google Sheets dashboard', 'Custom web tool', 'Chrome extension'], steps: ['Map the work you repeat', 'Pick the simplest fix', 'Build and test with your team', 'Hand over with a short guide'], proof: ['#lab', 'See our own apps'],
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/></svg>' }
];
$('#svcList').innerHTML = SERV.map(function (s, i) {
  return '<li class="svc-row" data-peek="' + s.peek + '"><div><h3><button data-sheet="' + i + '">' + s.title + '</button></h3><p class="sub">' + s.sub + '</p><p class="pain-l">' + s.pain + '</p></div>' +
    '<ul class="incl">' + s.incl.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' +
    '<div class="svc-act"><button class="add" data-svc="' + s.svc + '" aria-pressed="false"><span class="bx">' + ICHECK + '</span><span class="t">Add to brief</span></button><button class="explore" data-sheet="' + i + '">Explore ' + IARROW + '</button></div></li>';
}).join('');
var sheet = $('#svcSheet'); wireDlg(sheet);
function openSheet(i) {
  var s = SERV[i];
  sheet.innerHTML = '<div class="sh-hero ' + s.theme + '"><button class="pd-x" data-close aria-label="Close"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 5l10 10M15 5L5 15"/></svg></button><div class="ic">' + s.icon + '</div><h3>' + s.title + '</h3><p>' + s.sub + '</p></div>' +
    '<div class="sh-body"><h4>Pick what you want. We\'ll add it to your brief.</h4><div class="dels">' + s.dels.map(function (d) { return '<button type="button" class="chip" data-del="' + esc(d) + '" aria-pressed="' + (!!extras[d]) + '">' + d + '</button>'; }).join('') + '</div>' +
    '<h4>How it works</h4><ol class="steps-mini">' + s.steps.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>' +
    '<div class="sh-acts"><button class="btn btn-red" data-sheet-go="' + s.svc + '">Add to brief and continue</button>' + (s.proof[0].charAt(0) === '#' ? '<a class="btn btn-ghost" href="' + s.proof[0] + '" data-close>' + s.proof[1] + '</a>' : '<button class="btn btn-ghost" data-open="' + s.proof[0] + '">' + s.proof[1] + '</button>') + '</div></div>';
  openDlg(sheet);
}
sheet.addEventListener('click', function (e) {
  var d = e.target.closest('[data-del]'); if (d) { var k = d.dataset.del; if (extras[k]) delete extras[k]; else extras[k] = 1; d.setAttribute('aria-pressed', extras[k] ? 'true' : 'false'); compose(); return; }
  var g = e.target.closest('[data-sheet-go]'); if (g) { brief[g.dataset.sheetGo] = 1; sync(); closeDlg(sheet); toast('Added to your brief'); setTimeout(function () { goTo('#contact'); }, 250); }
});
document.addEventListener('click', function (e) { var b = e.target.closest('[data-sheet]'); if (b) openSheet(+b.dataset.sheet); });
(function () {
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches || reduce) return;
  var pk = $('#peek'), x = 0, y = 0, tx = 0, ty = 0, on = false, raf = 0, cid = '';
  function loop() { x += (tx - x) * .18; y += (ty - y) * .18; pk.style.left = x + 'px'; pk.style.top = y + 'px'; raf = on || Math.abs(tx - x) > .5 ? requestAnimationFrame(loop) : 0; }
  $$('.svc-row').forEach(function (row) {
    row.addEventListener('pointerenter', function (e) { var id = row.dataset.peek; if (id !== cid) { pk.innerHTML = ''; var c = coverOf(id); if (c) pk.appendChild(c); cid = id; } tx = e.clientX + 180; ty = e.clientY; if (!on) { x = tx; y = ty; } on = true; pk.classList.add('on'); if (!raf) raf = requestAnimationFrame(loop); });
    row.addEventListener('pointermove', function (e) { tx = e.clientX + 180; ty = e.clientY; });
    row.addEventListener('pointerleave', function () { on = false; pk.classList.remove('on'); });
  });
  $$('.svc-row button').forEach(function (b) { b.addEventListener('pointerenter', function () { pk.classList.remove('on'); }); b.addEventListener('pointerleave', function () { if (on) pk.classList.add('on'); }); });
})();

/* ---------- QR business card ---------- */
(function () {
  var type = 'wa', cv = $('#qrCanvas'), cardIn = $('#cardIn'), fields = { name: $('#qName'), role: $('#qRole'), phone: $('#qPhone'), web: $('#qWeb') };
  var HEAD = { wa: ['Scan to chat', 'Opens WhatsApp with your number, ready to message.'], web: ['Scan to visit', 'Opens your website straight away.'], vcard: ['Scan to save', 'Adds your name, number and website to their contacts.'] };
  function data() {
    var ph = fields.phone.value.replace(/[^\d+]/g, ''), digits = ph.replace(/\D/g, ''), w = fields.web.value.trim();
    if (w && !/^https?:\/\//i.test(w)) w = 'https://' + w;
    if (type === 'wa') return digits ? 'https://wa.me/' + digits : '';
    if (type === 'web') return w;
    return 'BEGIN:VCARD\nVERSION:3.0\nFN:' + fields.name.value.trim() + '\nTITLE:' + fields.role.value.trim() + '\nTEL;TYPE=CELL:' + ph + (w ? '\nURL:' + w : '') + '\nEND:VCARD';
  }
  function render() {
    var nm = fields.name.value.trim() || 'Your name', w = nm.split(/\s+/);
    $('#cName').textContent = nm; $('#cRole').textContent = fields.role.value.trim() || 'Your role'; $('#cPhone').textContent = fields.phone.value.trim();
    $('#cMono').textContent = (w[0][0] + (w[1] ? w[1][0] : '')).toUpperCase();
    $('#qrHead').textContent = HEAD[type][0]; $('#qrSub').textContent = HEAD[type][1];
    qrLib().then(function () { drawQR(cv, data(), '#1C0C0D', '#fff', 2); });
  }
  Object.keys(fields).forEach(function (k) { fields[k].addEventListener('input', render); });
  $$('#qrSeg button').forEach(function (b) { b.addEventListener('click', function () { type = b.dataset.q; $$('#qrSeg button').forEach(function (x) { x.setAttribute('aria-checked', x === b ? 'true' : 'false'); }); render(); cardIn.classList.add('flip'); }); });
  function flip() { cardIn.classList.toggle('flip'); }
  cardIn.addEventListener('click', flip); cardIn.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
  $('#qrDl').addEventListener('click', function () {
    qrLib().then(function () {
      var big = document.createElement('canvas'); big.width = big.height = 1024; drawQR(big, data(), '#1C0C0D', '#fff', 4);
      big.toBlob(function (b) { var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'qr-' + (fields.name.value.trim() || 'card').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.png'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000); toast('QR downloaded. Want print-ready cards? Tap “Design my cards”.'); });
    }, function () { toast('Could not load the QR tool. Check your connection.'); });
  });
  if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { render(); io.disconnect(); } }, { rootMargin: '400px' }); io.observe($('#card')); } else render();
})();

/* ---------- Contact form ---------- */
var fName = $('#fName'), fBiz = $('#fBiz'), fCity = $('#fCity'), fMsg = $('#fMsg'), bubble = $('#bubble'), err = $('#err');
function setStage(s) { stage = s; $$('#stageChips [data-stage]').forEach(function (x) { x.setAttribute('aria-checked', x.dataset.stage === s ? 'true' : 'false'); }); compose(); }
$$('#stageChips [data-stage]').forEach(function (b) { b.addEventListener('click', function () { setStage(stage === b.dataset.stage ? '' : b.dataset.stage); }); });
$$('#goals [data-goal]').forEach(function (b) { b.addEventListener('click', function () { var g = b.dataset.goal; if (goals[g]) delete goals[g]; else goals[g] = 1; b.setAttribute('aria-pressed', goals[g] ? 'true' : 'false'); compose(); }); });
$$('#when [data-when]').forEach(function (b) { b.addEventListener('click', function () { when = when === b.dataset.when ? '' : b.dataset.when; $$('#when [data-when]').forEach(function (x) { x.setAttribute('aria-checked', x.dataset.when === when ? 'true' : 'false'); }); compose(); }); });
if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { ctVisible = en[0].isIntersecting; tray.classList.toggle('on', (picked().length + kitList.length) > 0 && !ctVisible); fab.classList.toggle('on', !ctVisible && window.scrollY > window.innerHeight * .9); }, { threshold: .15 }).observe($('#contact'));
function message() {
  var name = fName.value.trim(), biz = fBiz.value.trim(), city = fCity.value.trim(), msg = fMsg.value.trim(), list = picked().map(function (k) { return SVCS[k]; }), gl = Object.keys(goals), ex = Object.keys(extras);
  var L = ['Hi H24 Creationz,', "I'm " + (name || '[your name]') + (biz ? ' from ' + biz : '') + (city ? ' in ' + city : '') + '.'];
  if (stage) L.push('Where I am: ' + STAGES[stage].toLowerCase() + '.');
  if (gl.length) L.push('I want to: ' + gl.join(', ').toLowerCase() + '.');
  if (list.length) L.push('I need: ' + list.join(', ') + '.');
  if (kitList.length) L.push('Brand kit: ' + kitList.join(', ') + '.');
  if (ex.length) L.push('Details: ' + ex.join(', ') + '.');
  if (when) L.push('Timing: ' + when + '.');
  if (msg) L.push('', msg);
  return L.join('\n');
}
function compose() { var d = new Date(), h = d.getHours(), m = d.getMinutes(); bubble.innerHTML = ''; bubble.appendChild(document.createTextNode(message())); var tm = document.createElement('time'); tm.textContent = ((h + 11) % 12 + 1) + ':' + (m < 10 ? '0' : '') + m + (h < 12 ? ' am' : ' pm'); bubble.appendChild(tm); }
[fName, fBiz, fCity, fMsg].forEach(function (i) { i.addEventListener('input', function () { err.textContent = ''; compose(); }); });
function valid() {
  if (!fName.value.trim()) { err.textContent = 'Add your name so we know who is writing.'; fName.focus(); return false; }
  if (!picked().length && !kitList.length && !fMsg.value.trim() && !Object.keys(goals).length && !stage) { err.textContent = 'Pick what you need, or write a line about your project.'; return false; }
  err.textContent = ''; return true;
}
var via = 'wa'; $$('#brief [data-via]').forEach(function (b) { b.addEventListener('click', function () { via = b.dataset.via; }); });
$('#brief').addEventListener('submit', function (e) {
  e.preventDefault(); if (!valid()) return; var msg = message();
  if (via === 'mail') { var biz = fBiz.value.trim(); location.href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent('Project enquiry' + (biz ? ': ' + biz : '')) + '&body=' + encodeURIComponent(msg); }
  else window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  via = 'wa';
});
$('#copyMsg').addEventListener('click', function () { if (valid()) copy(message(), 'Message copied'); });
$('#copyMail').addEventListener('click', function () { copy(MAIL, 'Email address copied'); });

/* ---------- Findability check ---------- */
(function () {
  var qs = $$('#qs .q'), val = $('#dialVal'), num = $('#scoreNum'), ttl = $('#scoreTitle'), txt = $('#scoreText'), gaps = $('#gaps'), cta = $('#gapCta'), C = 339.3, shown = 0, touched = false, an = 0;
  function countTo(n) { cancelAnimationFrame(an); var from = shown, st = performance.now(); (function f(now) { var t = reduce ? 1 : Math.min(1, (now - st) / 500); shown = Math.round(from + (n - from) * t); num.firstChild.nodeValue = shown; if (t < 1) an = requestAnimationFrame(f); })(performance.now()); }
  function yes() { return qs.filter(function (q) { return q.getAttribute('aria-pressed') === 'true'; }); }
  function render() {
    var y = yes(), n = y.length, miss = qs.filter(function (q) { return y.indexOf(q) < 0; }); val.style.strokeDashoffset = (C * (1 - n / 8)).toFixed(1); countTo(n); if (!touched) return;
    if (n <= 3) { ttl.textContent = 'Customers will struggle to find you.'; txt.textContent = 'Start with these fixes. They make the biggest difference fastest.'; }
    else if (n <= 6) { ttl.textContent = 'You can be found, but you are not the obvious choice yet.'; txt.textContent = 'Close these gaps and you are far more likely to show up on Google, on Maps and in AI answers.'; }
    else if (n === 7) { ttl.textContent = 'Nearly there.'; txt.textContent = 'One gap left between you and a complete presence.'; }
    else { ttl.textContent = "You're in great shape."; txt.textContent = 'Keep it that way with fresh content and regular updates. We can look after it for you.'; }
    gaps.innerHTML = ''; miss.slice(0, 3).forEach(function (q) { var li = document.createElement('li'); li.textContent = q.dataset.fix; gaps.appendChild(li); }); cta.hidden = false; cta.textContent = miss.length ? 'Get a plan for these gaps' : 'Keep it this way';
  }
  qs.forEach(function (q) { q.addEventListener('click', function () { touched = true; q.setAttribute('aria-pressed', q.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); render(); }); });
  cta.addEventListener('click', function () {
    var y = yes().length, miss = qs.filter(function (q) { return q.getAttribute('aria-pressed') !== 'true'; }); brief.seo = 1; brief.geo = 1; brief.maps = 1; sync();
    var note = 'My findability check score: ' + y + ' of 8.' + (miss.length ? '\nWhat I want to fix:\n' + miss.map(function (q) { return '- ' + q.dataset.fix; }).join('\n') : '');
    if (!fMsg.value.trim() || fMsg.dataset.auto === '1') { fMsg.value = note; fMsg.dataset.auto = '1'; }
    compose(); goTo('#contact'); setTimeout(function () { fName.focus({ preventScroll: true }); }, 1300);
  });
  fMsg.addEventListener('input', function () { fMsg.dataset.auto = ''; });
})();

/* ---------- Testimonials ---------- */
(function () {
  var items = $$('#tqStage .tq'), dots = $('#tqDots'), i = 0, t = null, hold = false;
  items.forEach(function (_, k) { var b = document.createElement('button'); b.setAttribute('aria-label', 'Show quote ' + (k + 1)); b.addEventListener('click', function () { go(k, true); }); dots.appendChild(b); });
  var db = $$('button', dots);
  function go(n, user) { i = (n + items.length) % items.length; items.forEach(function (x, k) { x.classList.toggle('on', k === i); x.setAttribute('aria-hidden', k === i ? 'false' : 'true'); }); db.forEach(function (d, k) { d.setAttribute('aria-current', k === i ? 'true' : 'false'); }); if (user) restart(); }
  function restart() { clearInterval(t); if (!reduce) t = setInterval(function () { if (!hold && !document.hidden) go(i + 1); }, 7500); }
  $('#tqPrev').addEventListener('click', function () { go(i - 1, true); }); $('#tqNext').addEventListener('click', function () { go(i + 1, true); });
  var st = $('#tqStage'); st.addEventListener('pointerenter', function () { hold = true; }); st.addEventListener('pointerleave', function () { hold = false; });
  var sx = 0; st.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true }); st.addEventListener('touchend', function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1), true); });
  go(0); restart();
})();

/* ---------- Decode H24: exploded logo ---------- */
var Decode = (function () {
  var sec = $('#decode'), stack = $('#stack'), layers = $$('img', stack), steps = $$('.dec-step'), bars = $$('#decBar i'), glow = $('#decGlow'), last = -1;
  var ease = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  function update() {
    var r = sec.getBoundingClientRect(), vh = window.innerHeight, total = r.height - vh; if (total <= 0) return;
    var p = clamp(-r.top / total, 0, 1);
    var e = p < .12 ? ease(p / .12) : p > .8 ? 1 - ease(clamp((p - .8) / .14, 0, 1)) : 1;
    var idx = p < .12 ? 0 : p >= .82 ? 6 : 1 + Math.min(4, Math.floor((p - .12) / .136));
    var mob = window.innerWidth < 760, gap = mob ? 70 : 115;
    stack.style.transform = 'rotateX(' + (56 * e).toFixed(2) + 'deg) rotateZ(' + (-36 * e).toFixed(2) + 'deg) scale(' + (1 - .14 * e).toFixed(3) + ')';
    layers.forEach(function (l, i) {
      var act = idx >= 1 && idx <= 5 && i === idx - 1;
      var z = (i - 2) * gap * e + (act ? 50 * e : 0);
      l.style.transform = 'translateZ(' + z.toFixed(1) + 'px)';
      l.style.opacity = (idx >= 1 && idx <= 5 && e > .5 && !act && i !== 0) ? '.35' : '1';
    });
    glow.style.opacity = idx === 6 ? '1' : '0';
    if (idx !== last) { last = idx; steps.forEach(function (s, k) { s.classList.toggle('on', k === idx); }); bars.forEach(function (b, k) { b.classList.toggle('on', k === idx); }); }
  }
  if (reduce) { steps.forEach(function (s, k) { s.classList.toggle('on', k === 6); }); }
  return { update: reduce ? function () {} : update };
})();

/* ---------- How we value a brand ---------- */
(function () {
  var V = [
    ['Clarity', 'Customers understand what you do in five seconds.', ['One clear promise', 'A simple name and tagline', 'Service pages that answer real questions']],
    ['Consistency', 'You look and sound the same everywhere.', ['One logo, colour palette and typeface', 'Templates for social and print', 'The same details on web, Maps and socials']],
    ['Credibility', 'Proof that you deliver what you promise.', ['Real reviews, and replies to them', 'Case stories with real results', 'A fast, secure, working website']],
    ['Character', 'A personality people remember and talk about.', ['A voice that sounds like you', 'Visuals that stand apart', 'Stories only you can tell']]
  ];
  var btns = $$('#eq button'), card = $('#valCard'), i = 0, t = null, user = false;
  function show(n) { i = n; btns.forEach(function (b, k) { b.setAttribute('aria-selected', k === n ? 'true' : 'false'); }); var v = V[n]; card.innerHTML = '<div class="val-in"><h3>' + v[0] + '</h3><p>' + v[1] + '</p></div><ul class="val-in">' + v[2].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; }
  btns.forEach(function (b, k) { b.addEventListener('click', function () { user = true; clearInterval(t); show(k); }); });
  show(0);
  if (!reduce && 'IntersectionObserver' in window) new IntersectionObserver(function (en) { clearInterval(t); if (en[0].isIntersecting && !user) t = setInterval(function () { show((i + 1) % V.length); }, 4200); }).observe(card);
})();

/* ---------- Velocity marquee ---------- */
var Marq = (function () {
  var el = $('#marq'), rows = $$('.mrow', el), off = [0, 0], w = [0, 0], vis = false, v = 0, ly = window.scrollY, raf = 0, dir = 1;
  function measure() { rows.forEach(function (r, k) { w[k] = r.scrollWidth / 2; }); }
  function loop() {
    var y = window.scrollY, d = y - ly; ly = y; v += (d - v) * .12; if (Math.abs(d) > .5) dir = d > 0 ? 1 : -1;
    var sp = (.6 + Math.min(Math.abs(v) * .25, 14)) * dir; off[0] = (off[0] - sp) % w[0]; off[1] = (off[1] + sp) % w[1]; if (off[0] > 0) off[0] -= w[0]; if (off[1] > 0) off[1] -= w[1];
    var sk = clamp(v * .18, -7, 7);
    rows[0].style.transform = 'translate3d(' + off[0].toFixed(1) + 'px,0,0) skewX(' + (-sk).toFixed(2) + 'deg)';
    rows[1].style.transform = 'translate3d(' + off[1].toFixed(1) + 'px,0,0) skewX(' + (-sk).toFixed(2) + 'deg)';
    raf = vis ? requestAnimationFrame(loop) : 0;
  }
  if (!reduce && 'IntersectionObserver' in window) new IntersectionObserver(function (en) { vis = en[0].isIntersecting; if (vis && !raf) { ly = window.scrollY; raf = requestAnimationFrame(loop); } }).observe(el);
  return { measure: measure };
})();

/* ---------- Springboard: apps open like apps ---------- */
var I = {
  pdf: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M8.5 15.5c1.5-.5 4-3 4.5-6 .4 2.6 2 4.5 3 5-1.6-.1-5.5.2-7.5 1z"/>',
  pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  graph: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="7" r="2.5"/><circle cx="12" cy="18" r="2.5"/><circle cx="12" cy="11" r="1.6"/><path d="M8 7.3 10.6 10M15.8 8.2 13.4 10.2M12 12.6v3"/>',
  grid: '<rect x="4" y="4" width="6" height="6" rx="2"/><rect x="14" y="4" width="6" height="6" rx="2"/><rect x="4" y="14" width="6" height="6" rx="2"/><rect x="14" y="14" width="6" height="6" rx="2"/>',
  flick: '<path d="M9 7 4 12l5 5"/><path d="M15 7l5 5-5 5"/><path d="M13 5 11 19"/>',
  rec: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5" fill="currentColor"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
  puzzle: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 12h16M12 4v16"/><circle cx="8" cy="8" r="1.2" fill="currentColor"/><circle cx="16" cy="16" r="1.2" fill="currentColor"/>',
  drop: '<path d="M12 20V6"/><path d="m6 11 6-6 6 6"/><path d="M5 20h14"/>',
  qr: '<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><path d="M14 14h2v2h-2zM18 14h2M14 18h2v2M18 18h2v2"/>',
  chart: '<path d="M4 20V4M4 20h16"/><path d="m7 15 4-4 3 3 5-6"/>',
  hub: '<circle cx="7" cy="7" r="1.8" fill="currentColor"/><circle cx="12" cy="7" r="1.8" fill="currentColor"/><circle cx="17" cy="7" r="1.8" fill="currentColor"/><circle cx="7" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="17" cy="12" r="1.8" fill="currentColor"/><circle cx="7" cy="17" r="1.8" fill="currentColor"/><circle cx="12" cy="17" r="1.8" fill="currentColor"/><circle cx="17" cy="17" r="1.8" fill="currentColor"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  wa: '<path d="M20.5 11.7A8.5 8.5 0 0 1 8 19.2L3.5 20.5l1.3-4.4a8.5 8.5 0 1 1 15.7-4.4z"/>'
};
function svgI(n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (I[n] || I.grid) + '</svg>'; }
var CWS_IMG = 'https://developer.chrome.com/static/docs/webstore/branding/image/iNEddTyWiMfLSwFD6qGq.png';
var PLAY_IMG = 'https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png';
var AMZ_IMG = 'https://images-na.ssl-images-amazon.com/images/G/01/rainier/available_at_amazon_1200x600_Nvz5h2M.png';
var APPS = [
  { g: 'Web apps' },
  { id: 'zenpdf', name: 'ZenPDF', kind: 'PDF suite', icon: 'pdf', bg: 'linear-gradient(145deg,#ff3b30,#b0141b)', desc: 'Every PDF tool in one private workspace: edit, sign, fill, merge, split, compress, convert and protect. Files never leave the device.', feat: ['Works right in the browser', 'Nothing is uploaded', 'Sign and fill forms'], meta: ['Web app', 'Productivity', 'Free'], open: [['Open ZenPDF', 'https://harshavarthanep.github.io/pdf-edit/']] },
  { id: 'nodalis', name: 'Nodalis', kind: 'Knowledge software', icon: 'graph', bg: 'linear-gradient(145deg,#2c2c2e,#000)', desc: 'Local-first notes, canvas and knowledge graph with tasks and a priority matrix. Notes stay as plain markdown on your own disk.', feat: ['Linked notes and a live graph', 'Canvas and tasks', 'Your files, on your disk'], meta: ['Web app', 'Notes', 'Free'], open: [['Open the editor', 'https://harshavarthanep.github.io/Nodalis-apps/#editor'], ['Product site', 'https://harshavarthanep.github.io/Nodalis/']] },
  { id: 'tally', name: 'Tallyroll', kind: 'Screen recorder', icon: 'rec', bg: 'linear-gradient(145deg,#1f2a44,#0d1220)', desc: 'Record screen and camera with no watermark, no time limit and no account. Trim, then share a link that expires when you choose.', feat: ['No watermark or time limit', 'Screen and camera together', 'Trim before you share'], meta: ['Web app', 'Video', 'Free'], open: [['Open Tallyroll', 'https://harshavarthanep.github.io/Tallyroll/']] },
  { id: 'owl', name: 'OwlKaraoke', kind: 'Audio studio', icon: 'mic', bg: 'linear-gradient(145deg,#ff9f0a,#c25e00)', desc: 'Removes vocals from any song, changes key and tempo, syncs lyrics and exports audio or a karaoke video. Nothing is uploaded.', feat: ['Vocal removal', 'Key and tempo control', 'Karaoke video export'], meta: ['Web app', 'Music', 'Free'], open: [['Open OwlKaraoke', 'https://harshavarthanep.github.io/owlkaraoke/']] },
  { id: 'zendocs', name: 'ZenDocs Pro', kind: 'Writing workspace', icon: 'pen', bg: 'linear-gradient(145deg,#f2e6cf,#c9a66b)', dark: 1, desc: 'Linked notes, a live graph, kanban, Eisenhower matrix, focus timer and real Word and PDF export. Works offline and syncs across devices.', feat: ['Kanban and focus timer', 'Word and PDF export', 'Works offline'], meta: ['Web app', 'Writing', 'Free'], open: [['Open the app', 'https://harshavarthanep.github.io/NotesV2/'], ['Product site', 'https://harshavarthanep.github.io/ZenDocs/']] },
  { id: 'kuro', name: 'Kuro Logic', kind: 'Puzzle game', icon: 'puzzle', bg: 'linear-gradient(145deg,#3a3a3c,#111)', desc: 'Minimal logic puzzle with levels, IQ points and power-ups. Installs and plays offline.', feat: ['Dozens of levels', 'IQ points and power-ups', 'Plays offline'], meta: ['Game', 'Puzzle', 'Free'], open: [['Play Kuro Logic', 'https://harshavarthanep.github.io/Kuro-Logic/']] },
  { id: 'drop', name: 'InfinityDrop', kind: 'File transfer', icon: 'drop', bg: 'linear-gradient(145deg,#0a84ff,#0040a8)', desc: 'High-speed peer-to-peer file transfer over WebRTC, with no server limits.', feat: ['Device to device', 'No upload limits', 'Nothing stored on a server'], meta: ['Web app', 'Utilities', 'Free'], open: [['Open InfinityDrop', 'https://harshavarthanep.github.io/Files-transfer2/']] },
  { id: 'qrs', name: 'QR Studio', kind: 'QR generator', icon: 'qr', bg: 'linear-gradient(145deg,#f2f2f7,#c7c7cc)', dark: 1, desc: 'Generate and manage dynamic QR codes.', feat: ['Dynamic QR codes', 'Edit where a code points', 'Download in high resolution'], meta: ['Web app', 'Business', 'Free'], open: [['Open QR Studio', 'https://harshavarthanep.github.io/Dynamic-QR/']] },
  { id: 'wealth', name: 'Wealth Tracker', kind: 'Finance dashboard', icon: 'chart', bg: 'linear-gradient(145deg,#30d158,#0b7a35)', desc: 'Net worth and expense tracking dashboard.', feat: ['Net worth at a glance', 'Track expenses', 'Clear charts'], meta: ['Web app', 'Finance', 'Free'], open: [['Open Wealth Tracker', 'https://harshavarthanep.github.io/Wealth-tracker/']] },
  { g: 'Chrome extensions' },
  { id: 'shelf', name: 'Shelf Shelf', kind: 'Chrome extension', icon: 'grid', bg: 'linear-gradient(145deg,#f2f2f7,#d1d1d6)', dark: 1, desc: 'Your favourite websites as apps, folders and a dock, plus to-dos with reminders. Published on the Chrome Web Store, with a free web version.', feat: ['Websites as apps and folders', 'A dock for your favourites', 'To-dos with reminders'], meta: ['Extension', 'Productivity', 'Free'], store: ['cws', 'https://chromewebstore.google.com/detail/shelf-shelf-%E2%80%94-app-launche/bhhnembgfddoomakgmegbhkpklcgelhn'], open: [['Add to Chrome', 'https://chromewebstore.google.com/detail/shelf-shelf-%E2%80%94-app-launche/bhhnembgfddoomakgmegbhkpklcgelhn'], ['Web version', 'https://harshavarthanep.github.io/Shelf-Shelf/']] },
  { id: 'flick', name: 'Flick Flick', kind: 'Chrome extension', icon: 'flick', bg: 'linear-gradient(145deg,#ff375f,#a3002a)', desc: 'Jump back to your last tab in one keystroke, plus Arc and Zen-style productivity features for Chromium browsers.', feat: ['Last tab in one keystroke', 'Arc and Zen-style features', 'Works in Chromium browsers'], meta: ['Extension', 'Productivity', 'Free'], store: ['cws', 'https://chromewebstore.google.com/detail/flick-flick-%E2%80%94-last-tab-sw/ccjfgehimibjhjfbncilcfpdpnaibkml'], open: [['Add to Chrome', 'https://chromewebstore.google.com/detail/flick-flick-%E2%80%94-last-tab-sw/ccjfgehimibjhjfbncilcfpdpnaibkml']] },
  { g: 'Android and books' },
  { id: 'android', name: 'Android', kind: 'Seven apps on Google Play', folder: ['#5856D6', '#FF9500', '#34C759', '#FF2D55', '#0A84FF', '#1C1C1E', '#AF52DE', '#FFCC00', '#30B0C7'], desc: 'Android apps published under H24 Creationz on Google Play.', list: [['Confident Candidate', '#5856D6'], ['Aegan', '#FF9500'], ['I Am Antifragile', '#34C759'], ['Monster Affirmation', '#FF2D55'], ['TextHack', '#0A84FF'], ['Retro Shooter', '#1C1C1E']], feat: ['Published under H24 Creationz', 'Free to download', 'Apps, games and tools'], meta: ['Android', '7 apps', 'Free'], store: ['play', 'https://play.google.com/store/apps/dev?id=8039460198278259208'], open: [['Open on Google Play', 'https://play.google.com/store/apps/dev?id=8039460198278259208']] },
  { id: 'mf', name: 'Mind Feast', kind: 'Book by Harsha Varthan E P', book: 'MF', bg: 'linear-gradient(160deg,#F45D0A,#8E1A12)', desc: 'A short guide to building self-esteem and personal growth, with practical techniques for young people to stay productive and succeed in their goals. Published by H24 Creationz.', feat: ['Self-help and personal growth', 'Paperback and Kindle', 'Published by H24 Creationz'], meta: ['Book', '51 pages', 'Amazon'], store: ['amz', 'https://www.amazon.in/Mind-Feast-Rejuvenate-Your/dp/B08SCXDW8S'], open: [['View on Amazon', 'https://www.amazon.in/Mind-Feast-Rejuvenate-Your/dp/B08SCXDW8S']] },
  { id: 'ii', name: 'Inspiring Illusions', kind: 'Book by Harsha Varthan E P', book: 'II', bg: 'linear-gradient(160deg,#25B8F4,#0B3F8A)', desc: 'Unique quotes for unique people: short, original thoughts on motivation, friendship and success, to make each day a little brighter than the last.', feat: ['Original quotes', 'Paperback and Kindle', 'Published by H24 Creationz'], meta: ['Book', '126 pages', 'Amazon'], store: ['amz', 'https://www.amazon.in/INSPIRING-ILLUSIONS-UNIQUE-QUOTES-PEOPLE/dp/1639971033'], open: [['View on Amazon', 'https://www.amazon.in/INSPIRING-ILLUSIONS-UNIQUE-QUOTES-PEOPLE/dp/1639971033']] }
];
var DOCK = [
  { id: 'hub', name: 'App Hub', kind: 'H24 Nexus', icon: 'hub', bg: 'linear-gradient(145deg,#1c1c1e,#000)', desc: '20+ free web apps, tools and games in one place, plus client websites, product sites and extensions.', feat: ['Every app in one place', 'Free to use', 'Installable'], meta: ['Hub', '20+ apps', 'Free'], open: [['Open the app hub', 'https://harshavarthanep.github.io/apps/']] },
  { id: 'port', name: 'Founder', kind: 'Harsha Varthan E P', icon: 'user', bg: 'linear-gradient(145deg,#5E5CE6,#2F2C9B)', desc: 'The founder of H24 Creationz: project manager by trade, builder by habit. See the full portfolio of work.', feat: ['Client work and case studies', 'Career and skills', 'Contact details'], meta: ['Portfolio', 'Chennai', 'Open'], open: [['Open the portfolio', 'https://harshavarthanep.github.io/portfolio/?for=client']] },
  { id: 'brief', name: 'Start', kind: 'Start a project', icon: 'chat', bg: 'linear-gradient(145deg,#E3262E,#8E1A12)', action: '#contact' },
  { id: 'wa', name: 'WhatsApp', kind: 'Chat with us', icon: 'wa', bg: 'linear-gradient(145deg,#30D158,#128C3E)', href: 'https://wa.me/918667701001' }
];
var AMAP = {}; APPS.concat(DOCK).forEach(function (a) { if (a.id) AMAP[a.id] = a; });
function iconHTML(a, big) {
  if (a.folder) return '<span class="ic folder">' + a.folder.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join('') + '</span>';
  if (a.book) return '<span class="ic book" style="background:' + a.bg + '">' + a.book + '</span>';
  return '<span class="ic' + (a.dark ? ' dark-glyph' : '') + '" style="background:' + a.bg + '">' + svgI(a.icon) + '</span>';
}
$('#springs').innerHTML = APPS.map(function (a) { if (a.g) return '<span class="grp-lb" role="presentation">' + a.g + '</span>'; return '<button class="app" role="listitem" data-app="' + a.id + '" aria-label="' + esc(a.name + ', ' + a.kind) + '">' + iconHTML(a) + '<span>' + a.name + '</span></button>'; }).join('');
$('#dock').innerHTML = DOCK.map(function (a) { return '<button class="app" role="listitem" data-app="' + a.id + '" aria-label="' + esc(a.name) + '">' + iconHTML(a) + '<span>' + a.name + '</span></button>'; }).join('');
var asheet = $('#appSheet'), fromIcon = null;
function badge(s) {
  if (s[0] === 'cws') return '<a href="' + s[1] + '" target="_blank" rel="noopener"><img src="' + CWS_IMG + '" alt="Available in the Chrome Web Store" width="206" height="58" loading="lazy"></a>';
  if (s[0] === 'play') return '<a href="' + s[1] + '" target="_blank" rel="noopener"><img src="' + PLAY_IMG + '" alt="Get it on Google Play" width="180" height="70" loading="lazy" style="height:64px;margin:-6px -8px"></a>';
  return '<a class="amz" href="' + s[1] + '" target="_blank" rel="noopener"><img src="' + AMZ_IMG + '" alt="Available at Amazon" width="96" height="48" loading="lazy" onerror="this.parentNode.outerHTML=\'<a class=&quot;pill&quot; href=&quot;' + s[1] + '&quot; target=&quot;_blank&quot; rel=&quot;noopener&quot;>Buy on Amazon</a>\'"></a>';
}
function openApp(id, iconEl) {
  var a = AMAP[id]; if (!a) return;
  if (a.action) { goTo(a.action); return; }
  if (a.href) { window.open(a.href, '_blank', 'noopener'); return; }
  var h = '<button class="as-x" data-close aria-label="Close"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 3l8 8M11 3l-8 8"/></svg></button>';
  h += '<div class="as-hd">' + iconHTML(a).replace('class="ic', 'class="ic') + '<div><h3>' + a.name + '</h3><p>' + a.kind + '</p><div class="get">' + a.open.map(function (o, k) { return '<a class="pill' + (k ? ' ghost' : '') + '" href="' + o[1] + '" target="_blank" rel="noopener">' + o[0] + '</a>'; }).join('') + '</div></div></div>';
  h += '<div class="as-meta">' + ['Type', 'Category', a.book ? 'Store' : 'Price'].map(function (lb, k) { return '<div><small>' + lb.toUpperCase() + '</small><b>' + a.meta[k] + '</b></div>'; }).join('') + '</div>';
  h += '<div class="as-body"><p>' + a.desc + '</p>';
  if (a.list) h += '<ul class="as-list">' + a.list.map(function (l) { return '<li><i style="background:' + l[1] + '">' + l[0][0] + '</i>' + l[0] + '</li>'; }).join('') + '</ul>';
  h += '<ul class="feat">' + (a.feat || []).map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>';
  if (a.store) h += '<div class="as-store">' + badge(a.store) + '</div>';
  if (a.book) h += '<p class="legal">Amazon\'s trademark is used under license from Amazon.com, Inc. or its affiliates.</p>';
  h += '</div>';
  asheet.innerHTML = h; fromIcon = iconEl || null;
  lastFocus = document.activeElement; if (asheet.showModal) asheet.showModal(); else asheet.setAttribute('open', ''); lockScroll(true);
  if (!reduce && fromIcon && asheet.animate) {
    var ir = fromIcon.getBoundingClientRect(), dr = asheet.getBoundingClientRect();
    var sx = ir.width / dr.width, sy = ir.height / dr.height, dx = ir.left + ir.width / 2 - (dr.left + dr.width / 2), dy = ir.top + ir.height / 2 - (dr.top + dr.height / 2);
    asheet.animate([{ transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')', borderRadius: '40%', opacity: .4 }, { transform: 'none', borderRadius: '32px', opacity: 1 }], { duration: 560, easing: 'cubic-bezier(.2,.9,.25,1)' });
    $$('.as-hd,.as-meta,.as-body', asheet).forEach(function (el, k) { el.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 420, delay: 200 + k * 60, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }); });
  }
}
function closeApp() {
  if (!asheet.open) return;
  function done() { if (asheet.close) asheet.close(); else asheet.removeAttribute('open'); }
  if (!reduce && fromIcon && asheet.animate && document.body.contains(fromIcon)) {
    var ir = fromIcon.getBoundingClientRect(), dr = asheet.getBoundingClientRect();
    var sx = ir.width / dr.width, sy = ir.height / dr.height, dx = ir.left + ir.width / 2 - (dr.left + dr.width / 2), dy = ir.top + ir.height / 2 - (dr.top + dr.height / 2);
    var an = asheet.animate([{ transform: 'none', opacity: 1, borderRadius: '32px' }, { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')', opacity: 0, borderRadius: '40%' }], { duration: 380, easing: 'cubic-bezier(.4,0,.2,1)' });
    an.onfinish = done;
  } else done();
}
asheet.addEventListener('close', function () { lockScroll(false); if (lastFocus) lastFocus.focus(); });
asheet.addEventListener('cancel', function (e) { e.preventDefault(); closeApp(); });
asheet.addEventListener('click', function (e) { if (e.target === asheet || e.target.closest('[data-close]')) closeApp(); });
document.addEventListener('click', function (e) { var b = e.target.closest('[data-app]'); if (b) openApp(b.dataset.app, $('.ic', b)); });
function iosTime() { var d = new Date(), h = d.getHours(), m = d.getMinutes(); $('#iosTime').textContent = ((h + 11) % 12 + 1) + ':' + (m < 10 ? '0' : '') + m; }
iosTime(); setInterval(iosTime, 30000);

/* ---------- Scroll effects: process, band, photo ---------- */
var tl = $('#tl'), playhead = $('#playhead'), stepEls = $$('.step'), bands = $$('.band'), photo = $('#photoImg');
function scrollFx() {
  var vh = window.innerHeight, r = tl.getBoundingClientRect(), p = clamp((vh * .8 - r.top) / (vh * .55), 0, 1);
  playhead.style.transform = 'scaleX(' + p.toFixed(3) + ')';
  stepEls.forEach(function (s, i) { s.classList.toggle('on', p >= i / (stepEls.length - 1) - .02 || (window.innerWidth <= 1024 && s.getBoundingClientRect().top < vh * .75)); });
  if (reduce) return;
  bands.forEach(function (b) { var br = b.getBoundingClientRect(), q = clamp((vh - br.top) / (vh * .7), 0, 1); b.style.clipPath = 'inset(0 ' + ((1 - q) * 5).toFixed(2) + '% round ' + ((1 - q) * 48).toFixed(1) + 'px)'; });
  var pr = photo.getBoundingClientRect(); if (pr.bottom > 0 && pr.top < vh) { var c = (pr.top + pr.height / 2 - vh / 2) / vh; photo.style.transform = 'translate3d(0,' + (-6 + c * -8).toFixed(2) + '%,0)'; }
}

/* ---------- Clock ---------- */
function clock() { try { var t = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date()); $('#clock').textContent = 'Based in Chennai, India. It is ' + t.toLowerCase() + ' here now.'; } catch (e) {} }
clock(); setInterval(clock, 30000); $('#yr').textContent = new Date().getFullYear();

/* ---------- Command palette ---------- */
(function () {
  var pal = $('#pal'), inp = $('#palIn'), list = $('#palList'), sel = 0, items = [];
  var CMDS = [['Build a brand kit', 'Start, rebrand or grow', '#builder'], ['Work', 'Selected projects', '#work'], ['Services', 'What we make', '#services'], ['QR business card', 'Free tool', '#card'], ['Free check', 'Can customers find you?', '#check'], ['Decode H24', 'How the brand is built', '#decode'], ['How we value a brand', 'The trust equation', '#values'], ['Apps and books', 'Open like apps', '#lab'], ['About Harsha', 'Founder', '#about'], ['Free offers', 'Brand call, report, QR', '#offers'], ['Start a project', 'Your brief', '#contact'],
    ['WhatsApp', '+91 86677 01001', function () { window.open('https://wa.me/' + WA, '_blank', 'noopener'); }], ['Copy email', MAIL, function () { copy(MAIL, 'Email address copied'); }], ['Switch theme', 'Light or dark', function () { $('#themeBtn').click(); }], ['Minimal edition', 'Calm, iOS-style version', function () { location.href = 'minimal/'; }]];
  function render() { var q = inp.value.trim().toLowerCase(); items = CMDS.filter(function (c) { return !q || (c[0] + ' ' + c[1]).toLowerCase().indexOf(q) > -1; }); sel = Math.min(sel, Math.max(0, items.length - 1)); list.innerHTML = items.length ? items.map(function (c, i) { return '<li><button role="option" aria-selected="' + (i === sel) + '" data-i="' + i + '">' + c[0] + '<span>' + c[1] + '</span></button></li>'; }).join('') : '<li style="padding:12px 14px;color:var(--dim)">No matches.</li>'; }
  function open() { inp.value = ''; sel = 0; render(); if (pal.showModal) pal.showModal(); else pal.setAttribute('open', ''); lockScroll(true); setTimeout(function () { inp.focus(); }, 10); }
  function close() { if (pal.open) { if (pal.close) pal.close(); else pal.removeAttribute('open'); } }
  function run(i) { var c = items[i]; close(); if (c) setTimeout(function () { typeof c[2] === 'string' ? goTo(c[2]) : c[2](); }, 60); }
  pal.addEventListener('close', function () { lockScroll(false); });
  inp.addEventListener('input', function () { sel = 0; render(); });
  inp.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(items.length - 1, sel + 1); render(); } else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); render(); } else if (e.key === 'Enter') { e.preventDefault(); run(sel); } });
  list.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) run(+b.dataset.i); });
  pal.addEventListener('click', function (e) { if (e.target === pal) close(); });
  document.addEventListener('keydown', function (e) { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.open ? close() : open(); } });
})();

/* ---------- Behind this site ---------- */
function deviceName() {
  var w = window.innerWidth, fold = window.matchMedia('(horizontal-viewport-segments: 2), (vertical-viewport-segments: 2)').matches;
  if (fold) return 'Foldable';
  if (w < 400) return 'Small phone'; if (w < 760) return 'Phone'; if (w < 1025) return 'Tablet'; if (w < 1600) return 'Desktop'; return 'Wide screen';
}
function metrics() {
  try {
    var n = performance.getEntriesByType('navigation')[0], res = performance.getEntriesByType('resource');
    var load = n ? (n.loadEventEnd || performance.now()) - n.startTime : performance.now(); $('#mLoad').textContent = (load / 1000).toFixed(2) + ' s';
    var bytes = n ? (n.transferSize || n.encodedBodySize || 0) : 0; res.forEach(function (r) { bytes += r.transferSize || r.encodedBodySize || 0; });
    $('#mWeight').textContent = bytes > 0 ? (bytes > 1048576 ? (bytes / 1048576).toFixed(1) + ' MB' : Math.round(bytes / 1024) + ' KB') : 'Cached';
    $('#mReq').textContent = res.length + 1;
    $('#mOff').textContent = navigator.serviceWorker && navigator.serviceWorker.controller ? 'Yes' : 'Soon';
    $('#mDev').textContent = deviceName();
  } catch (e) {}
}
var deferred = null, installBtn = $('#installBtn');
window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; installBtn.hidden = false; });
installBtn.addEventListener('click', function () { if (!deferred) return; deferred.prompt(); deferred.userChoice.finally(function () { deferred = null; installBtn.hidden = true; }); });
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').then(function () { setTimeout(metrics, 800); }).catch(function () {}); });
}

/* ---------- One scroll loop ---------- */
var ticking = false;
function onScroll() { if (ticking) return; ticking = true; requestAnimationFrame(function () { ticking = false; header(); Reel.update(); manifesto(); Decode.update(); scrollFx(); }); }
window.addEventListener('scroll', onScroll, { passive: true });
var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { placeFix(); Reel.measure(); Marq.measure(); onScroll(); $('#mDev').textContent = deviceName(); }, 120); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { Reel.measure(); Marq.measure(); });
window.addEventListener('load', function () { Reel.measure(); Marq.measure(); onScroll(); setTimeout(metrics, 300); });
renderPain(0); Reel.measure(); Marq.measure(); header(); manifesto(); Decode.update(); scrollFx(); sync();
})();
