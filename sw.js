// Japan's Notebook — Service Worker
// Estrategia: app-shell precacheado + cache-first para estáticos del mismo origen,
// network-first para la navegación (HTML), con fallback a caché si no hay red.

const CACHE_VERSION = "jn-v2";
const PRECACHE = [
  "./",
  "./index.html",
  "./curso-de-japones.html",
  "./css/styles.css",
  "./js/main.js",
  "./js/chatbot.js",
  "./js/curso.js",
  "./manifest.json",
  "./assets/img/branding/logo.png",
  "./assets/img/branding/hero-banner.jpg",
  "./assets/icons/logo-192.png",
  "./assets/icons/logo-512.png",
  "./assets/icons/favicon-32.png",
  "./assets/icons/favicon-16.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // Navegación (HTML): network-first, con fallback a caché (offline) o al shell.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }

  // Estáticos del mismo origen: cache-first, guardando lo que se pida por primera vez.
  if (sameOrigin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
          }
          return res;
        }).catch(() => cached);
      })
    );
  }
  // Recursos de otros orígenes (Google Fonts, el iframe del formulario): dejar pasar tal cual.
});
