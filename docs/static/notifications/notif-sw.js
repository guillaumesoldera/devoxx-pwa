self.addEventListener('fetch', function(event) {})

self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification);
    event.notification.close();
    // open in new window
    //event.waitUntil(
    //    clients.matchAll({
    //        type: "window"
    //    }).then(function () {
    //        if (clients.openWindow) {
    //            return clients.openWindow(`/static/notifications/notifications.html?time=${event.notification.data.time}`);
    //        }
    //    })
    //);
    const urlToOpen = new URL(`/static/notifications/notifications.html`, self.location.origin).href;
    const promiseChain = clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      })
      .then((windowClients) => {
        let matchingClient = null;
    
        for (let i = 0; i < windowClients.length; i++) {
          const windowClient = windowClients[i];
          if (windowClient.url === urlToOpen) {
            matchingClient = windowClient;
            break;
          }
        }
    
        if (matchingClient) {
          return matchingClient.focus();
        } else {
          return clients.openWindow(urlToOpen);
        }
      });
    
      event.waitUntil(promiseChain);
});