importScripts('https://unpkg.com/dexie@2.0.4/dist/dexie.min.js');

const db = new Dexie("JugSummercampDatabase");

db.version(1).stores({
    favorites: "id,title,author,type,room,time,description,rank",
    ratings: "id,rate"
});

self.addEventListener('sync', function (event) {
    console.log("sync Recieved... !!!!!");

    if (event.tag == 'favorites_updated') {
        event.waitUntil(serverFavoritesSync());
    }
    if (event.tag == 'ratings_updated') {
        event.waitUntil(serverRatingsSync());
    }
});

function serverFavoritesSync() {
    return db.favorites.toArray()
        .then(favorites => {
            console.log('favorites', favorites);
            return self.registration.pushManager.getSubscription()
                .then(subscription => {
                    if (subscription) {
                        return fetch("/api/syncFavorites", {
                            method: "POST",
                            body: JSON.stringify({subscription, talks: favorites}),
                            headers: {
                                "content-type": "application/json"
                            }
                        }).then(() => {
                            console.log("Favorites Synced...");
                            return Promise.resolve({});
                        })
                        .catch(err => {
                            console.error('error', err);
                            return Promise.resolve({});
                        });
                    }
                    return Promise.resolve({});
                })
        })
}


function serverRatingsSync() {
    return db.ratings.toArray()
        .then(ratings => {
            console.log('ratings', ratings);
            return fetch("/api/syncRatings", {
                method: "POST",
                body: JSON.stringify({ratings}),
                headers: {
                    "content-type": "application/json"
                }
            }).then(() => {
                console.log("Ratings Synced...");
                return Promise.resolve({});
            });
        })
}