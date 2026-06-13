/* Service worker do Piano Mágico
   Estratégia: rede primeiro (atualizações aparecem logo), cache como
   reserva (continua a funcionar totalmente offline). */
const CACHE = "piano-magico-v10";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./sounds/Fs3.mp3",
  "./sounds/A3.mp3",
  "./sounds/C4.mp3",
  "./sounds/Ds4.mp3",
  "./sounds/Fs4.mp3",
  "./sounds/A4.mp3",
  "./sounds/C5.mp3",
  "./sounds/Ds5.mp3",
  "./sounds/Fs5.mp3",
  "./sounds/A5.mp3",
  "./sounds/C6.mp3",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  if (new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(request, { ignoreSearch: true })
          .then((cached) => cached || caches.match("./index.html"))
      )
  );
});
