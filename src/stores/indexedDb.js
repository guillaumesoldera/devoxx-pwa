import Dexie from 'dexie';

const db = new Dexie("AirBeerNbeer");

db.version(1).stores({
    favorites: "postId, userId, rank",
    posts: "++postId, userId, date, location, text, picture, unsynced",
    comments: "++commentId, postId, userId, date, text, unsynced",
    votes: "postId, userId, value",
    notifications: "postId, userId, action"
});

export const favorite = (postId, userId) => {
    console.log('favoriting post  : ', postId, 'by ', userId);
    return db.favorites.where('postId')
        .equals(postId)
        .count()
        .then(count => {
            if (count == 0) {
                return db.favorites.add({ postId, userId })
                    //  .then(() => requestSync('favorites_updated'))
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

export const vote = (postId, userId, value) => {
    console.log('voting post  : ', postId, 'by ', userId, 'with', value);
    return db.votes.where('postId')
        .equals(postId)
        .count()
        .then(count => {
            if (count == 0) {
                return db.votes.add({ postId, userId, value })
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
    return db.comments.add({...comment, unsynced:true})
        //.then(() => requestSync('comments_updated'))
        .then(() => db.comments.toArray());
};

export const post = (post) => {
    console.log('addind a new post  : ', post);
    return db.posts.add({...post, unsynced:true})
        //.then(() => requestSync('posts_updated'))
        .then(() => db.posts.toArray());
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
        if (window.SyncManager) {
            return swRegistration.sync.register(evt)
        } else {
            return Promise.resolve({});
        }
    });
