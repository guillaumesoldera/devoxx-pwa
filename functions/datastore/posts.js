const db = require('./firestore');

const addPost = async (post) => {
    const newPost = await db.collection('posts').add({
        authorId: post.authorId,
        date: post.date,
        location: post.location,
        upVotes: 0,
        downVotes: 0,
        text: post.text,
        picture: post.picture,
    });
    return {
        postId: newPost.id,
        ...post,
        upVotes: 0,
        downVotes: 0,
    }
}

const updatePost = async (postId, upVotes, downVotes) => {
    const authorRef = db.collection('posts').doc(postId);
    const updatedPostDoc = await await authorRef.update({
        upVotes,
        downVotes,
    });
    const updatedPost = updatedPostDoc.data();
    return {
        postId,
        authorId: updatedPost.authorId,
        date: updatedPost.date,
        location: updatedPost.location,
        upVotes: updatedPost.upVotes,
        downVotes:  updatedPost.downVotes,
        text: updatedPost.text,
        picture: updatedPost.picture
    }
}

const allPosts = async () => {
    const snapshot = await db.collection('posts').get();
    const posts = [];
    snapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
            postId: doc.id,
            ...data
        })
        console.log(doc.id, '=>', doc.data());
    })
    return posts
}

module.exports = {
    addPost,
    updatePost,
    allPosts,
}