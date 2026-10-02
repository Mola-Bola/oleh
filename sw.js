// Oleh web: open the app with no connection (e.g. shopping abroad without data), from the first visit on.
// Installing this worker saves the whole app on the device: the page, the code, fonts and images. The list of files
// is written into the built copy of this file by scripts/web-pwa.mjs (BUILD below), with a version that changes
// whenever any file does, so a new version saves itself fresh and the old one is removed.
// Pages come from the network first, so a new version shows as soon as you're online; the saved copy is used offline.
// Built files never change once published, so they're served from the saved copy.
// Data (Supabase) is not touched: the app keeps its own offline copy of what you've seen.
const BUILD = {"version":"8db88e6143be","files":["_expo/static/css/native-tabs.module-78b0f59737571f455720970791a36bdd.css","_expo/static/js/web/entry-766bace524fe41ebef915bf5d75164ca.js","_expo/static/js/web/module-5dfe30f14c292a4d6ae3b547e789a3a8.js","assets/assets/brand/wordmark-coral.c535a590a23407328cf89558cd848024.png","assets/assets/brand/wordmark-ink.dad6d5801d23683259078b97703ee0f9.png","assets/node_modules/@expo-google-fonts/fredoka/300Light/Fredoka_300Light.cbedf5ac5c45836f47dd224e859e19da.ttf","assets/node_modules/@expo-google-fonts/fredoka/400Regular/Fredoka_400Regular.e1acb36133ba3fedec8ab2610cd61c6b.ttf","assets/node_modules/@expo-google-fonts/fredoka/500Medium/Fredoka_500Medium.3e8c574c93c92c04130508b454b61529.ttf","assets/node_modules/@expo-google-fonts/fredoka/600SemiBold/Fredoka_600SemiBold.89a2d8224922009e6f9b96181093b634.ttf","assets/node_modules/@expo-google-fonts/fredoka/700Bold/Fredoka_700Bold.eaa34632fd156f78e16a584d1648ffcc.ttf","assets/node_modules/@expo-google-fonts/nunito/200ExtraLight/Nunito_200ExtraLight.e3195ab4d111cebd50de96951ef3bbb5.ttf","assets/node_modules/@expo-google-fonts/nunito/200ExtraLight_Italic/Nunito_200ExtraLight_Italic.0f44842abdc321a4e8ef5f2d6eba013d.ttf","assets/node_modules/@expo-google-fonts/nunito/300Light/Nunito_300Light.cc4216a006ff27ad663b12c8d74708ef.ttf","assets/node_modules/@expo-google-fonts/nunito/300Light_Italic/Nunito_300Light_Italic.48b8e1e1d609d04a229cb167ba18ea4d.ttf","assets/node_modules/@expo-google-fonts/nunito/400Regular/Nunito_400Regular.f04f0e9ff969fd52a75deade3a9761cd.ttf","assets/node_modules/@expo-google-fonts/nunito/400Regular_Italic/Nunito_400Regular_Italic.0967d8e924905d0a4a70f38830288891.ttf","assets/node_modules/@expo-google-fonts/nunito/500Medium/Nunito_500Medium.04058d9f3583d30ece037e060c5b9721.ttf","assets/node_modules/@expo-google-fonts/nunito/500Medium_Italic/Nunito_500Medium_Italic.cabcea7d7b9c755ec132e2fe3efe4138.ttf","assets/node_modules/@expo-google-fonts/nunito/600SemiBold/Nunito_600SemiBold.b1364260246b29fd9393a1a071f3af61.ttf","assets/node_modules/@expo-google-fonts/nunito/600SemiBold_Italic/Nunito_600SemiBold_Italic.d3964a4faac6f9f959c6495f7e8bb1cc.ttf","assets/node_modules/@expo-google-fonts/nunito/700Bold/Nunito_700Bold.c133c0b8cd169e7798d0cd239477cf32.ttf","assets/node_modules/@expo-google-fonts/nunito/700Bold_Italic/Nunito_700Bold_Italic.c9d7af177a1a205c866662164104d9f0.ttf","assets/node_modules/@expo-google-fonts/nunito/800ExtraBold/Nunito_800ExtraBold.2b1bb82750274fc2d1043bf3891cb531.ttf","assets/node_modules/@expo-google-fonts/nunito/800ExtraBold_Italic/Nunito_800ExtraBold_Italic.eb8fe8521b6a7c128572d90528b415d6.ttf","assets/node_modules/@expo-google-fonts/nunito/900Black/Nunito_900Black.3ffae19d12dc67269f5cdd8d7a0aaeaf.ttf","assets/node_modules/@expo-google-fonts/nunito/900Black_Italic/Nunito_900Black_Italic.2c030d352cb022edf2f941cadc8367f7.ttf","assets/node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.6e435534bd35da5fef04168860a9b8fa.ttf","assets/node_modules/expo-router/assets/arrow_down.017bc6ba3fc25503e5eb5e53826d48a8.png","assets/node_modules/expo-router/assets/error.d1ea1496f9057eb392d5bbf3732a61b7.png","assets/node_modules/expo-router/assets/file.19eeb73b9593a38f8e9f418337fc7d10.png","assets/node_modules/expo-router/assets/forward.d8b800c443b8972542883e0b9de2bdc6.png","assets/node_modules/expo-router/assets/pkg.ab19f4cbc543357183a20571f68380a3.png","assets/node_modules/expo-router/assets/react-navigation/elements/back-icon-mask.0a328cd9c1afd0afe8e3b1ec5165b1b4.png","assets/node_modules/expo-router/assets/react-navigation/elements/back-icon.35ba0eaec5a4f5ed12ca16fabeae451d.png","assets/node_modules/expo-router/assets/react-navigation/elements/clear-icon.c94f6478e7ae0cdd9f15de1fcb9e5e55.png","assets/node_modules/expo-router/assets/react-navigation/elements/clear-icon.c94f6478e7ae0cdd9f15de1fcb9e5e55@2x.png","assets/node_modules/expo-router/assets/react-navigation/elements/clear-icon.c94f6478e7ae0cdd9f15de1fcb9e5e55@3x.png","assets/node_modules/expo-router/assets/react-navigation/elements/clear-icon.c94f6478e7ae0cdd9f15de1fcb9e5e55@4x.png","assets/node_modules/expo-router/assets/react-navigation/elements/close-icon.808e1b1b9b53114ec2838071a7e6daa7.png","assets/node_modules/expo-router/assets/react-navigation/elements/close-icon.808e1b1b9b53114ec2838071a7e6daa7@2x.png","assets/node_modules/expo-router/assets/react-navigation/elements/close-icon.808e1b1b9b53114ec2838071a7e6daa7@3x.png","assets/node_modules/expo-router/assets/react-navigation/elements/close-icon.808e1b1b9b53114ec2838071a7e6daa7@4x.png","assets/node_modules/expo-router/assets/react-navigation/elements/search-icon.286d67d3f74808a60a78d3ebf1a5fb57.png","assets/node_modules/expo-router/assets/sitemap.412dd9275b6b48ad28f5e3d81bb1f626.png","assets/node_modules/expo-router/assets/unmatched.20e71bdf79e3a97bf55fd9e164041578.png","favicon.ico","icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","index.html","manifest.webmanifest","robots.txt"]}; // filled in by scripts/web-pwa.mjs
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
