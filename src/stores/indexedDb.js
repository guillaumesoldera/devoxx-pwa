import Dexie from 'dexie';

const db = new Dexie("AirBeerNbeer");

db.version(1).stores({
    favorites: "postId, authorId, unsynced",
    posts: "++postId, authorId, date, location, text, picture, unsynced",
    comments: "++commentId, postId, authorId, date, text, unsynced",
    votes: "postId, authorId, value, unsynced",
    notifications: "postId, authorId, action, seen"
});

export const favorite = (postId, authorId) => {
    console.log('favoriting post  : ', postId, 'by ', authorId);
    return db.favorites.where('postId')
        .equals(postId)
        .count()
        .then(count => {
            if (count == 0) {
                return db.favorites.add({ postId, authorId, unsynced: true })
                    //.then(() => requestSync('favorites_updated'))
                    .then(() => db.favorites.toArray())
            } else {
                return db.favorites.where('postId')
                    .equals(postId)
                    .delete()
                    //.then(() => requestSync('favorites_updated'))
                    .then(() => db.favorites.toArray())
            }
        });
};

export const vote = (postId, authorId, value) => {
    console.log('voting post  : ', postId, 'by ', authorId, 'with', value);
    return db.votes.where('postId')
        .equals(postId)
        .count()
        .then(count => {
            if (count == 0) {
                return db.votes.add({ postId, authorId, value, unsynced: true })
                    //  .then(() => requestSync('favorites_updated'))
                    .then(() => db.votes.toArray())
            } else {
                return db.votes.where('postId')
                    .equals(postId)
                    .delete()
                    //.then(() => requestSync('favorites_updated'))
                    .then(() => db.votes.toArray())
            }
        });
};

export const comment = (comment) => {
    console.log('commenting post  : ', comment);
    return db.comments.add({ ...comment, unsynced: true })
        .then(() => {
            //  dont't wait for sync
            requestSync('comments_updated')
            return db.comments.toArray();
        })
};

export const post = (post) => {
    console.log('addind a new post  : ', post);
    return db.posts.add({ ...post, unsynced: true })
        .then(() => {
            //  dont't wait for sync
            requestSync('posts_updated')
            return db.posts.toArray();
        })
};

export const votes = () => {
    return db.votes.toArray();
};

export const localPosts = () => {
    return db.posts.toArray();
};

export const localComments = (postId) => {
    return db.comments.where('postId')
        .equals(postId).toArray();
};

export const favorites = () => {
    return db.favorites.toArray()
};

export const notifications = () => {
    return db.notifications.toArray()
};

const requestSync = (evt) => navigator.serviceWorker.ready
    .then(swRegistration => {
        console.log('requesting ', evt)
        swRegistration.sync.register(evt)
    });
