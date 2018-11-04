export function register(config) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        registerSW('/service-worker.js', config);
    });
  }
}

function registerSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and
              // the fresh content will have been added to the cache.
              // It's the perfect time to display a "New content is
              // available; please refresh." message in your web app.
              console.log('New content is available; please refresh.');

              // Execute callback
              if (config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
      // register for notfications 
      navigator.serviceWorker.ready.then(() => {
           registerForNotifications(registration);
      })
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function registerForNotifications(registration){
  console.log("Registering Push...");
  registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array("BFwbGBPX9ggNKmMPMtn8a_eYfMaU28iGv8-fy8PwxoMPwZZQQKaq96RMTCBkdUvVDjgJPZ6wtBeZ2p2i09ZMihY")
  }).then((subscription) => {
      console.log("Push Registered...");
      console.log("Sending Push...");
      fetch("/api/subscribe", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
              "content-type": "application/json"
          }
      }).then(() => {
          console.log("Push Sent...");
      });
  }).catch(error => {
      console.error('Error during pushManager subscription:', error);
  });
}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
