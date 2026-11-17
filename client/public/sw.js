// Self-unregistering Service Worker to purge any rogue or obsolete service workers
// from previous projects (such as StudyFlow) running on localhost:3000

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => {
      return self.registration.unregister();
    }).then(() => {
      return self.clients.matchAll({ type: 'window' });
    }).then((clients) => {
      clients.forEach((client) => {
        if (client.url && 'navigate' in client) {
          client.navigate(client.url);
        }
      });
    })
  );
});

// Pass through all fetch requests without intercepting or failing
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
