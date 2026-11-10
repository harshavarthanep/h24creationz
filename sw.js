/* H24 Creationz service worker: instant repeat visits and offline support. */
const CACHE = 'h24-v3';
const CORE = ['./', 'index.html', 'minimal/', 'minimal/index.html', 'manifest.webmanifest',
  'assets/js/app.js', 'assets/js/minimal.js', 'assets/js/lenis.min.js', 'assets/js/qrcode.min.js',
  'assets/fonts/big-shoulders.woff2', 'assets/fonts/instrument-sans.woff2', 'assets/fonts/inter.woff2',
  'assets/brand/h24-logo-600.webp', 'assets/brand/mark-96.png', 'assets/brand/favicon-32.png', 'assets/img/harsha-480.webp'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(CORE.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); return res; })
      .catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return res; }).catch(() => hit);
    return hit || net;
  }));
});
