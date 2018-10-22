'use strict';
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('devoxx-pwa-cache-fallback-networkassets').then(function(cache) {
        console.log('caching assets');
        return cache.addAll([
          '../../../assets/css/style.css',
          '../../../assets/images/devoxx_brand.gif',
          './cache-falling-back-to-network.html'
        ]);
      })
    );
  });

  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                console.info('element found in cache for ', event.request);      
            } else {
                console.warn('element not found in cache for ', event.request)      
            }
        return response || fetch(event.request);
        })
);
});