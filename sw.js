// Oleh web: open the app with no connection (e.g. shopping abroad without data), from the first visit on.
// Installing this worker saves the whole app on the device: the page, the code, fonts and images. The list of files
// is written into the built copy of this file by scripts/web-pwa.mjs (BUILD below), with a version that changes
// whenever any file does, so a new version saves itself fresh and the old one is removed.
// Pages come from the network first, so a new version shows as soon as you're online; the saved copy is used offline.
// Built files never change once published, so they're served from the saved copy.
// Data (Supabase) is not touched: the app keeps its own offline copy of what you've seen.
const BUILD = {"version":"0fb3ee5a69b2","files":["_expo/static/css/native-tabs.module-78b0f59737571f455720970791a36bdd.css","_expo/static/js/web/entry-585abcf9e711060b72727270761cc59d.js","assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.6e435534bd35da5fef04168860a9b8fa.ttf","assets/node_modules/expo-router/assets/arrow_down.017bc6ba3fc25503e5eb5e53826d48a8.png","assets/node_modules/expo-router/assets/error.d1ea1496f9057eb392d5bbf3732a61b7.png","assets/node_modules/expo-router/assets/file.19eeb73b9593a38f8e9f418337fc7d10.png","assets/node_modules/expo-router/assets/forward.d8b800c443b8972542883e0b9de2bdc6.png","assets/node_modules/expo-router/assets/pkg.ab19f4cbc543357183a20571f68380a3.png","assets/node_modules/expo-router/assets/react-navigation/elements/back-icon-mask.0a328cd9c1afd0afe8e3b1ec5165b1b4.png","assets/node_modules/expo-router/assets/react-navigation/elements/back-icon.35ba0eaec5a4f5ed12ca16fabeae451d.png","assets/node_modules/expo-router/assets/react-navigation/elements/clear-icon.c94f6478e7ae0cdd9f15de1fcb9e5e55.png","assets/node_modules/expo-router/assets/react-navigation/elements/clear-icon.c94f6478e7ae0cdd9f15de1fcb9e5e55@2x.png","assets/node_modules/expo-router/assets/react-navigation/elements/clear-icon.c94f6478e7ae0cdd9f15de1fcb9e5e55@3x.png","assets/node_modules/expo-router/assets/react-navigation/elements/clear-icon.c94f6478e7ae0cdd9f15de1fcb9e5e55@4x.png","assets/node_modules/expo-router/assets/react-navigation/elements/close-icon.808e1b1b9b53114ec2838071a7e6daa7.png","assets/node_modules/expo-router/assets/react-navigation/elements/close-icon.808e1b1b9b53114ec2838071a7e6daa7@2x.png","assets/node_modules/expo-router/assets/react-navigation/elements/close-icon.808e1b1b9b53114ec2838071a7e6daa7@3x.png","assets/node_modules/expo-router/assets/react-navigation/elements/close-icon.808e1b1b9b53114ec2838071a7e6daa7@4x.png","assets/node_modules/expo-router/assets/react-navigation/elements/search-icon.286d67d3f74808a60a78d3ebf1a5fb57.png","assets/node_modules/expo-router/assets/sitemap.412dd9275b6b48ad28f5e3d81bb1f626.png","assets/node_modules/expo-router/assets/unmatched.20e71bdf79e3a97bf55fd9e164041578.png","favicon.ico","icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","index.html","manifest.webmanifest"]}; // filled in by scripts/web-pwa.mjs
const SAVED = `oleh-app-${BUILD.version}`;
// Anything asked for that isn't in the list (a build that skipped web-pwa.mjs): saved as it's first fetched.
const EXTRA = 'oleh-extra-v1';
const scope = new URL(self.registration.scope);
const PAGE = new URL('index.html', scope).href;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SAVED)
      .then((cache) =>
        // The page is checked with the server (it names the current code files); the rest can come from the browser's
        // own cache, as the first visit has just downloaded them.
        cache.addAll(BUILD.files.map((f) => new Request(new URL(f, scope).href, f === 'index.html' ? { cache: 'no-cache' } : {}))),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      // Earlier versions' saved copies go. So do extra files, unless they're all this build has (no list).
      .then((keys) => Promise.all(keys.filter((k) => ![SAVED, ...(BUILD.files.length ? [] : [EXTRA])].includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const isStatic = (url) =>
  url.origin === scope.origin && /\/(_expo\/static|assets|icons)\/|\.(ttf|otf|woff2?|png|jpe?g|gif|svg|webp|ico|css|js|webmanifest)$/.test(url.pathname);

/** The saved app page (for any address in the app: they're all the same page). */
async function savedPage() {
  return (await caches.match(PAGE, { cacheName: SAVED })) ?? (await caches.match('shell', { cacheName: EXTRA })) ?? Response.error();
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (req.mode === 'navigate' && url.origin === scope.origin) {
    event.respondWith(
      fetch(req)
        .then(async (res) => {
          // No list (a build that skipped web-pwa.mjs): keep the last page seen instead. GitHub Pages answers deep links
          // with its 404 page, which is the app too.
          if (!BUILD.files.length) {
            const html = await res.clone().text();
            if (html.includes('id="root"')) {
              const cache = await caches.open(EXTRA);
              await cache.put('shell', new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } }));
            }
          }
          return res;
        })
        .catch(savedPage),
    );
    return;
  }

  if (isStatic(url)) {
    event.respondWith(
      caches.match(req, { ignoreSearch: true }).then(async (hit) => {
        if (hit) return hit;
        const res = await fetch(req);
        if (res.ok) (await caches.open(EXTRA)).put(req, res.clone());
        return res;
      }),
    );
  }
});
