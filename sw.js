const CACHE_NAME = 'notevault-shell-v2';
const APP_SHELL = [
  './',
  './index.html',
  './assets/css/style.css?v=9',
  './assets/js/app.js?v=13',
  './favicon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
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

  const isAppShell = request.destination === 'document' ||
    request.url.includes('/assets/css/') ||
    request.url.includes('/assets/js/') ||
    request.url.endsWith('/favicon.svg');

  if (isAppShell) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return response;
      }))
    );
  } else {
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
  }
});