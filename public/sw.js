/* =============================================================================
   NoteVault service worker
   Goal: keep the app shell available offline without ever serving a stale
   deployment. Bump CACHE_VERSION when the caching strategy changes.

   - Navigations: network first, cached shell as offline fallback.
   - Hashed build assets (/assets/*) and icons: cache first (immutable URLs).
   - PDFs, slides and scans: never intercepted (range requests, large files).
   ========================================================================== */

/* v3: soft-glass redesign ships a full new asset set; bumping the version
   purges the v2 shell/assets caches on activate so returning visitors get
   the new build immediately instead of mixing old and new hashed assets. */
const CACHE_VERSION = 'notevault-v3';
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const ASSET_CACHE = `${CACHE_VERSION}-assets`;

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((name) => name !== SHELL_CACHE && name !== ASSET_CACHE)
          .map((name) => caches.delete(name)),
      );
      await self.clients.claim();
    })(),
  );
});

function isResourceFile(pathname) {
  return /\.(pdf|pptx?|docx?|xlsx?|jpe?g|png|webp|gif|html?)$/i.test(pathname);
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Documents and scans stay on the network: they are large, support range
  // requests, and must never be served stale from a cache.
  if (isResourceFile(url.pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);
          const cache = await caches.open(SHELL_CACHE);
          void cache.put(request, response.clone());
          return response;
        } catch {
          const cache = await caches.open(SHELL_CACHE);
          const cached =
            (await cache.match(request)) ||
            (await cache.match(new URL('./index.html', self.registration.scope).href)) ||
            (await cache.match(new URL('./', self.registration.scope).href));
          return cached || Response.error();
        }
      })(),
    );
    return;
  }

  if (url.pathname.includes('/assets/') || url.pathname.includes('/icons/')) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(ASSET_CACHE);
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        if (response.ok) void cache.put(request, response.clone());
        return response;
      })(),
    );
  }
});
