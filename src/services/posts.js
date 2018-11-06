import { allAuthors } from './authors';
import { allComments } from './comments';

export const allPosts = async () => {
    const postsResponse = await fetch('/api/posts', {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    })
    return postsResponse.json();
}

export const allPostsWithAuthors = async () => {
    const authors = await allAuthors();
    const posts = await allPosts();
    return posts.map(post => ({ ...post, author: authors.find(author => author.authorId === post.authorId) }))
}

export const postDetails = async (postId) => {
    const comments = await allComments();
    const posts = await allPosts();
    const authors = await allAuthors();
    const me = posts.find(post => post.postId === postId);
    const myAuthor = authors.find(author => author.authorId === me.authorId);
    const postComments = comments.filter(comment => comment.postId === postId)
        .map(comment => ({ ...comment, author: authors.find(author => author.authorId === comment.authorId) }));
    return {
        post: { ...me, author: myAuthor }, comments: postComments
    }
}