const CACHE = 'macas-flowers-v1';
const urlsToCache = [
  '/macas-flowers/',
  '/macas-flowers/assets/css/main.min.css',
  '/macas-flowers/assets/js/main.min.js',
  '/macas-flowers/assets/img/logo-800.webp'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(urlsToCache)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});