self.addEventListener('notificationclick', function (event) {
    console.log('On notification click: ', event.notification);
    event.notification.close();
    event.waitUntil(
        clients.matchAll({
            type: "window"
        }).then(function () {
            if (clients.openWindow) {
                return clients.openWindow(`https://pwn-demo-app.firebaseapp.com/program/${event.notification.data.talkId}`);
            }
        })
    );
});

self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("Push Recieved... !n", data);
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon,
        data: data.data,
    });
});