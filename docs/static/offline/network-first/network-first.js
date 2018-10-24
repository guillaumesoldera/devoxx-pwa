'use strict';
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('devoxx-pwa-cache-network-assets').then(function(cache) {
        console.log('caching assets');
        return cache.addAll([
          '../../../assets/css/style.css',
          '../../../assets/images/devoxx_brand.gif',
          '../../../assets/images/network-falling-back-to-cache.png',
          './network-first.html'
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
      fetch(event.request)
      .then(response => {
        console.warn(`retrieve ${event.request.url} from network`)
          return response;
      })
      .catch(function() {
          console.log(`try to retrieve ${event.request.url} from cache`)
        return caches.match(event.request);
      })
    );
  });