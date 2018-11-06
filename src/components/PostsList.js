import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Post } from './Post';
import '../styles/PostsList.css';

export class PostsList extends Component {

    render() {
        const { posts } = this.props;
        return (
            <div className="posts-list-container">
                <div className="row">
                    {posts.map((post, i) =>
                        <div key={`post-${i}`} className="col s12 m6 l3">
                            <Post post={post} linkToPost={true} />
                        </div>)}
                </div>
            </div>
        );
    }
}