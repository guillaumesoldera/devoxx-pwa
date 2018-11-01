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
      .then(function() {
        console.log('skip waiting');
        // Force the SW to transition from installing -> active state
        return self.skipWaiting();
        
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
      .then(function() {
        console.log('clients claim()');
        return self.clients.claim();
      })
    );
  });

  self.addEventListener('fetch', function(event) {
    console.log('fetch event listener', event.request);
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