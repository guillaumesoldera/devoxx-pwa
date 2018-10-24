'use strict';
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('devoxx-pwa-cache-then-network').then(function(cache) {
        console.log('caching assets');
        return cache.addAll([
          '../../../assets/css/style.css',
          '../../../assets/images/devoxx_brand.gif',
          '../../../assets/images/cache-then-network.png',
          './cache-then-network.html'
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
      caches.open('devoxx-pwa-cache-then-network').then(function(cache) {
        return fetch(event.request).then(function(response) {
            console.log('put in cache', event.request);
          cache.put(event.request, response.clone());
          return response;
        })
        .catch(function() {
            return caches.match(event.request);
        });
      })
    );
  });