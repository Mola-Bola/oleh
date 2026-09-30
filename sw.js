// Oleh web: open the app with no connection (e.g. shopping abroad without data).
// Pages come from the network first, so a new version shows as soon as you're online; the last good copy is used
// offline. Built files (/_expo/static/…, fonts, icons) never change once published, so they're served from here.
// Data (Supabase) is not touched: the app keeps its own offline copy of what you've seen.
const SHELL = 'oleh-shell-v1';
const STATIC = 'oleh-static-v1';
const scope = new URL(self.registration.scope);

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => ![SHELL, STATIC].includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const isStatic = (url) =>
  url.origin === scope.origin && /\/(_expo\/static|assets|icons)\/|\.(ttf|woff2?|png|jpg|ico|webmanifest)$/.test(url.pathname);

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (req.mode === 'navigate' && url.origin === scope.origin) {
    event.respondWith(
      fetch(req)
        .then(async (res) => {
          // GitHub Pages answers deep links with its 404 page, which is the app too: keep either as the shell.
          const html = await res.clone().text();
          if (html.includes('id="root"')) {
            const cache = await caches.open(SHELL);
            const old = await cache.match('shell');
            if (old && (await old.text()) !== html) await caches.delete(STATIC); // new version: drop old built files
            await cache.put('shell', new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } }));
          }
          return res;
        })
        .catch(async () => (await caches.open(SHELL)).match('shell').then((r) => r ?? Response.error())),
    );
    return;
  }

  if (isStatic(url)) {
    event.respondWith(
      caches.open(STATIC).then(async (cache) => {
        const hit = await cache.match(req);
        if (hit) return hit;
        const res = await fetch(req);
        if (res.ok) cache.put(req, res.clone());
        return res;
      }),
    );
  }
});
