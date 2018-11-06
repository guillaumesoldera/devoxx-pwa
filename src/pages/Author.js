import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHeader } from '../components/Header';
import { Post } from '../components/Post';
import { NavLink } from 'react-router-dom';
import '../styles/Author.css';
import { loadProfile } from '../services/profile';

export class Author extends Component {

    static propTypes = {
        authorId: PropTypes.string.isRequired
    }

    state = {
        porfile: undefined
    }

    async componentDidMount() {
        const profile = await loadProfile(this.props.authorId);
        this.setState({profile})
    }

    render() {
        const { profile } = this.state
        if (!profile) {
            return null;
        }
        return (
            <div className="author-detail">
                <BackHeader title={"Author detail"}/>
                {profile.author && <div className="author-infos-container">
                    <div className="author-metadata">
                         <img src={profile.author.profilePicture} className="author-avatar" />
                        <div className="author-infos">
                            <span className="author-name">{profile.author.fullName}</span>
                        </div>
                    </div>
                    <div className="author-bio">
                        <p>{profile.author.bio}</p>
                    </div>
                </div>}
                <h3 className="posts-separator-title">All posts</h3>
                {profile.posts && <ul>{profile.posts.map((post, i) => <li key={`post-${i}`}><Post post={post} linkToPost={true} /></li>)}</ul>}
            </div>
        );
    }
}