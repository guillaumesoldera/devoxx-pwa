import { allAuthors } from './authors';
import { allComments } from './comments';

export const allPosts = async () => {
    return await Promise.resolve([{
        postId: "1",
        authorId: "1",
        date: '19 Oct',
        location: 'Awesome Bar',
        upVotes:1,
        downVotes:1,
        text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo',
        picture: 'https://www.gannett-cdn.com/-mm-/89934f7b13e7717eb560f3babda84f20895abcd0/c=83-0-724-482/local/-/media/2018/07/17/DetroitFreeP/DetroitFreePress/636674313628993565-GettyImages-684133728.jpg?width=534&height=401&fit=crop'
    },
    {
        postId: "2",
        authorId: "1",
        date: '20 Oct',
        location: 'Awesome Bar',
        text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo',
        picture: 'https://www.gannett-cdn.com/-mm-/89934f7b13e7717eb560f3babda84f20895abcd0/c=83-0-724-482/local/-/media/2018/07/17/DetroitFreeP/DetroitFreePress/636674313628993565-GettyImages-684133728.jpg?width=534&height=401&fit=crop'
    }])
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