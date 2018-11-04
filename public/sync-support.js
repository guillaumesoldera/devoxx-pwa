importScripts('https://unpkg.com/dexie@2.0.4/dist/dexie.min.js');

const db = new Dexie("AirBeerNbeer");

db.version(1).stores({
    favorites: "postId, userId, rank",
    posts: "++postId, userId, date, location, text, picture, unsynced",
    comments: "++commentId, postId, userId, date, text, unsynced",
    votes: "postId, userId, value",
    notifications: "postId, userId, action"
});

self.addEventListener('sync', function (event) {
    console.log("sync Recieved... !!!!!");
    if (event.tag == 'posts_updated') {
        event.waitUntil(postsSync());
    }
    // if (event.tag == 'comments_updated') {
    //     event.waitUntil(serverFavoritesSync());
    // }
    // if (event.tag == 'favorites_updated') {
    //     event.waitUntil(serverFavoritesSync());
    // }
    // if (event.tag == 'votes_updated') {
    //     event.waitUntil(serverRatingsSync());
    // }
});

function postsSync() {
    return db.posts.toArray()
        .then(posts => {
            console.log('posts', posts);
            return fetch('/api/syncPosts', {
                method: "POST",
                body: JSON.stringify({ posts }),
                headers: { 'content-type': 'application/json' }
            })
        }).then(posts => {
            return clients.matchAll().then(clients => {
                clients.forEach(client => {
                    client.postMessage({message:'postsAfterSync', posts});
                })
            })
        }).then(() =>  db.posts.delete());
}