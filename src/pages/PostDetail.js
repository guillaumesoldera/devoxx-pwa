import React, { Component } from 'react';
import { BackHeader } from '../components/Header';
import { Post } from '../components/Post';
import '../styles/PostDetail.scss'
import { PostComment } from '../components/PostComment';
import { postDetails } from '../services/posts';
import { favorites, votes } from '../stores/indexedDb';

export class PostDetail extends Component {
    state = {
        postDetail: undefined
    }

    async componentDidMount() {
        const postDetail = await postDetails(this.props.postId);
        await this.updatePostWithFavoritesAndVotes(postDetail);
    }

    updatePostWithFavoritesAndVotes = async (postDetail) => {
        const postVotes = await votes();
        const favoritesPosts = await favorites();
        const vote = postVotes.find(vote => vote.postId === postDetail.post.postId) || {};
        this.setState({
            postDetail: {
                ...postDetail,
                post: {
                    ...postDetail.post,
                    favorited: favoritesPosts.findIndex(fav => fav.postId === postDetail.post.postId) > -1,
                    votedUp: vote.value > 0,
                    votedDown: vote.value < 0,
                    onFavorite: this.onFavorite,
                    onVote: this.onVote
                }
            }
        });
    }

    onVote = async () => {
        const { postDetail } = this.state;
        await this.updatePostWithVotes(postDetail);
    }

    onFavorite = async () => {
        const { postDetail } = this.state;
        await this.updatePostWithFavorites(postDetail);
    }

    updatePostWithVotes = async (postDetail) => {
        const postVotes = await votes();
        const vote = postVotes.find(vote => vote.postId === postDetail.post.postId) || {};
        this.setState({
            postDetail: {
                ...postDetail,
                post: {
                    ...postDetail.post,
                    votedUp: vote.value > 0, votedDown: vote.value < 0
                }
            }
        });
    }

    updatePostWithFavorites = async (postDetail) => {
        const favoritesPosts = await favorites();
        this.setState({
            postDetail: {
                ...postDetail,
                post: {
                    ...postDetail.post,
                    favorited: favoritesPosts.findIndex(fav => fav.postId === postDetail.post.postId) > -1,
                }
            }
        });
    }

    render() {
        const { postDetail } = this.state
        if (!postDetail) {
            return null;
        }
        return (
            <div className="post-detail">
                <BackHeader title={"Post detail"} />
                {postDetail.post && <Post post={postDetail.post} />}
                {postDetail.comments && <ul className="post-comments">
                    {postDetail.comments.map((comment, i) => <li key={`post-${i}`}><PostComment comment={comment} /></li>)}
                </ul>}
            </div>
        );
    }
}