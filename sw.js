const CACHE_NAME = 'notevault-shell-v11';
const APP_SHELL = [
  './',
  './index.html',
  './assets/css/style.css?v=14',
  './assets/js/firebase-presence.js?v=5',
  './assets/js/app.js?v=20',
  './favicon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      // Revalidate with the server so a stale HTTP-cached copy is never stored.
      .then(cache => cache.addAll(APP_SHELL.map(url => new Request(url, { cache: 'no-cache' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (!request.url.startsWith(self.location.origin)) return;

  const isAppShell = request.destination === 'document' ||
    request.url.includes('/assets/css/') ||
    request.url.includes('/assets/js/') ||
    request.url.endsWith('/favicon.svg');

  if (isAppShell) {
    // Network first so a deploy is picked up on the next load;
    // fall back to the cached shell when offline.
    event.respondWith(
      fetch(request, { cache: 'no-cache' }).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      }).catch(() => caches.match(request))
    );
  } else {
    // Study materials (PDFs, images, notes): network, with whatever
    // the browser has cached as a fallback.
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
  }
});
