'use strict';
self.addEventListener('install', function(event) {
    console.log('install event')
    event.waitUntil(
      caches.open('devoxx-pwa-lifecycle-cache').then(function(cache) {
        console.log('%c caching assets', 'background: #ffab40; color: #000000');
        return cache.addAll([
          '../../../assets/css/style.css',
          '../../../assets/images/devoxx_brand.gif',
          './lifecycle.html'
        ]);
      })
    );
  });

  self.addEventListener('activate', function(event) {
    console.log('%c activate event', 'background: #ffab40; color: #000000')
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

  self.addEventListener('fetch', function() {
    console.log('%c fetch!!', 'background: #ffab40; color: #000000')
  });
