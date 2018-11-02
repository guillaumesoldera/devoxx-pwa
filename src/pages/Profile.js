import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHeader } from '../components/Header';
import { Post } from '../components/Post';
import { NavLink, withRouter } from 'react-router-dom';
import '../styles/Profile.scss';
import { favorites, votes, localPosts } from '../stores/indexedDb';
import { UserContext } from '../context/user';
import { loadProfile } from '../services/profile';

class _Profile extends Component {

    state = {
        imageSrc: '',
        porfile: undefined,
        unsyncedPosts : []
    }

    static contextType = UserContext;

    async componentDidMount() {
        const profile = await loadProfile(this.context.user.id);
        await this.updateProfileWithFavoritesAndVotes(profile, profile.author.profilePicture);
        const unsyncedPosts = await localPosts();
        this.setState({unsyncedPosts:  unsyncedPosts.map(post => ({ ...post, author: profile.author }))})
    }

    onFavorite = async () => {
        const { profile } = this.state;
        await this.updateProfile(profile);
    }

    updateProfileWithFavoritesAndVotes = async (profile, imageSrc) => {
        const postVotes = await votes();
        const favoritesPosts = await favorites();
        const postWithVotesAndFavs = profile.posts.map(post => {
            const vote = postVotes.find(vote => vote.postId === post.postId) || {};
            return {
                ...post, 
                votedUp: vote.value > 0, 
                votedDown: vote.value < 0, 
                favorited: favoritesPosts.findIndex(fav => fav.postId === post.postId) > -1,
                onFavorite: this.onFavorite,
                onVote: this.onVote
            }
        });
        this.setState({ profile: { ...profile, posts: postWithVotesAndFavs }, imageSrc });
    }

    onFavorite = async () => {
        const { profile } = this.state;
        await this.updateProfileWithFavorites(profile);
    }

    updateProfileWithFavorites = async (profile) => {
        const favoritesPosts = await favorites();
        const postWithFavs = profile.posts.map(post => ({
            ...post, favorited: favoritesPosts.findIndex(fav => fav.postId === post.postId) > -1,
        }));
        this.setState({ profile: { ...profile, posts: postWithFavs }})
    }

    onVote = async () => {
        const { profile } = this.state;
        await this.updateProfileWithVotes(profile);
    }

    updateProfileWithVotes = async (profile) => {
        const postVotes = await votes();
        const postWithVotes = profile.posts.map(post => {
            const vote = postVotes.find(vote => vote.postId === post.postId) || {};
            return {
                ...post, votedUp: vote.value > 0, votedDown: vote.value < 0
            }
        });
        this.setState({ profile: { ...profile, posts: postWithVotes }})
    }

    updateProfile = async (profile, imageSrc) => {
        const _imageSrc = imageSrc || this.state.imageSrc
        const favoritesPosts = await favorites();
        const postWithFavs = profile.posts.map(post => ({
            ...post, favorited: favoritesPosts.findIndex(fav => fav.postId === post.postId)>-1, onFavorite: this.onFavorite
        }));
        this.setState({ profile: { ...profile, posts: postWithFavs }, imageSrc: _imageSrc });
    }

    goBack = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (this.props.history.length > 1) {
            this.props.history.goBack();
        } else {
            this.props.history.replace("/")
        }
    }

    logoutUser = (e) => {
        this.context.logout();
        this.goBack(e);
    }

    picChange = (evt) => {
        const fileInput = evt.target.files;
        if (fileInput.length > 0) {
            this._picURL = URL.createObjectURL(fileInput[0]);
            const canvas = document.querySelector('canvas');
            const ctx = canvas.getContext('2d')
            const photo = new Image();
            photo.onload = () => {
                //draw photo into canvas when ready
                const ratio = photo.width / photo.height
                const height = canvas.width / ratio;
                canvas.height = height;
                ctx.drawImage(photo, 0, 0, canvas.width, canvas.height);
                const imageSrc = canvas.toDataURL('image/png');
                //this.state.mediaStream.getTracks()[0].stop(); // stop camera
                this.setState({
                    imageSrc,
                }, () => {
                    if (this._picURL) {
                        URL.revokeObjectURL(this._picURL);
                    }
                })
            };

            photo.src = this._picURL;
        }
    }

    modifyAvatar = () => {
        document.querySelector('input[type=file]').click();
    }

    componentWillUnmount() {
        if (this._picURL) {
            URL.revokeObjectURL(this._picURL);
        }
    }

    render() {
        const { profile, imageSrc, unsyncedPosts} = this.state
        if (!profile) {
            return null;
        }
        return (
            <div className="profile-detail">
                <BackHeader title={"Your profile"}>
                    <ul className="right">
                        <li>
                            <a href="#" className="logout" onClick={(e) => this.logoutUser(e)}>
                                <i className="fa fa-sign-out material-icons small"></i><span>&nbsp;Logout</span>
                            </a>
                        </li>
                    </ul>
                </BackHeader>
                {profile.author && <div className="profile-infos-container">
                    <div className="profile-metadata">
                        {this.state.imageSrc
                            ? <img onClick={this.modifyAvatar} src={imageSrc} className="profile-avatar" />
                            : <div onClick={this.modifyAvatar} className="profile-avatar"><br />profile picture</div>}
                        <input type="file" accept="image/*" onChange={this.picChange} />
                        <canvas width="100" height="100"></canvas>
                        <div className="profile-infos">
                            <span className="profile-name">{profile.author.fullName}</span>
                        </div>
                    </div>
                    <div className="profile-bio">
                        <p>{profile.author.bio}</p>
                    </div>
                </div>}
                <h3 className="posts-separator-title">All posts</h3>
                 <ul>{[...unsyncedPosts, ...profile.posts].map((post, i) => <li key={`post-${i}`}><Post post={post} linkToPost={true} /></li>)}</ul>
            </div>
        );
    }
}

export const Profile = withRouter(_Profile);