const CACHE_NAME = 'remind-edu-v1';
const ASSETS = [
  './index.html',
  './style.css',
  './logo.png',
  './profileempty.jpg.jpeg',
  './js/config.js',
  './js/data_state.js',
  './js/ui_core.js',
  './js/auth.js',
  './js/dashboard_components.js',
  './js/features.js',
  './js/admin_settings.js',
  './js/app.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Try network first, falling back to cache
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
