import { allAuthors } from './authors'
import { allPosts } from './posts'

export const loadProfile = async (id) => {
    const authors = await allAuthors();
    const me = authors.find(author => author.authorId === id);
    const posts = await allPosts();
    const myPosts = posts.filter(post => post.authorId === id)
        .map(post => ({ ...post, author: me }));
    return {
        author: me,
        posts: myPosts
    }
}

