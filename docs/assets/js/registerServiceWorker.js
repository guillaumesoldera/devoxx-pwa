export default function register() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
          registerSW('/service-worker.js');
      });
    }
  }
  
  function registerSW(swUrl) {
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
                document.getElementById('new-version-mobile').style = "";
                document.getElementById('new-version-desktop').style = "";
                console.log('New content is available; please refresh.');
              } else {
                // At this point, everything has been precached.
                // It's the perfect time to display a
                // "Content is cached for offline use." message.
                console.log('Content is cached for offline use.');
              }
            }
          };
        };
        navigator.serviceWorker.ready.then(() => {
            registerForNotifications(registration);
        })
      })
      .catch(error => {
        console.error('Error during service worker registration:', error);
      });
  }