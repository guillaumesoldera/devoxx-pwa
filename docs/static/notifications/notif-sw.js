self.addEventListener('fetch', function(event) {})

self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification);
    event.notification.close();
    event.waitUntil(
        clients.matchAll({
            type: "window"
        }).then(function () {
            if (clients.openWindow) {
                return clients.openWindow(`http://guillaumesoldera.github.io/devoxx-pwa/static/notifications/notifications.html?time=${event.notification.data.time}`);
            }
        })
    );
});