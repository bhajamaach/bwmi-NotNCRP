// Minimal, deliberately conservative service worker.
//
// It does NOT precache Next.js's hashed build chunks — doing that by hand
// (without a bundler-integrated tool like next-pwa/Workbox) risks serving a
// stale, broken app shell after a redeploy. Instead it caches only the static
// offline fallback, manifest, and icons, and falls back to that offline page
// for page navigations when the network is unreachable. Everything else is
// network passthrough. This is enough to make the app installable and to
// avoid a blank tab on a dropped connection — it is not full offline app use.

const CACHE_NAME = "notncrp-shell-v1";
const SHELL_ASSETS = ["/offline.html", "/manifest.json", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match("/offline.html")));
  }
});
