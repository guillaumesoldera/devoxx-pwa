import React, { Component } from 'react';
import { Header } from '../components/Header';
import { PostsList } from '../components/PostsList';
import { allPostsWithAuthors } from '../services/posts';
import { favorites, votes } from '../stores/indexedDb';
import { UserContext } from '../context/user';

export class Favourites extends Component {
    state = {
        posts: []
    }

    static contextType = UserContext;

    async componentDidMount() {
        const { user } = this.context;
        navigator.serviceWorker.addEventListener('message', async (event) => {
            const eventPayload = JSON.parse(event.data);
            if (eventPayload.message === 'reloadPosts') {
                console.log('reloadPosts')
                const posts = await allPostsWithAuthors();
                this.setState({ posts })
            }
        });
        if (user) {
            const posts = await allPostsWithAuthors();
            const allFavorites = await favorites(user.id);
            const favoritesPosts = posts.filter(post => allFavorites.find(fav => fav.postId === post.postId))
            this.updatePostsWithVotes(favoritesPosts)
        }
    }

    onVote = async () => {
        const { posts } = this.state;
        await this.updatePostsWithVotes(posts);
    }

    updatePostsWithVotes = async (posts) => {
        const { user } = this.context;
        const postVotes = await votes(user.id);
        const postWithVotes = posts.map(post => {
            const vote = postVotes.find(vote => vote.postId === post.postId) || {};
            return {
                ...post,
                votedUp: vote.value > 0,
                votedDown: vote.value < 0,
                onVote: this.onVote
            }
        });
        this.setState({ posts: postWithVotes });
    }

    render() {
        const { posts } = this.state;
        return (
            <div className="favourites">
                <Header />
                <div className="content-container">
                    <PostsList posts={posts} />
                </div>
            </div>
        );
    }
}