import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Post, FakePost } from './Post';
import '../styles/PostsList.css';

export class PostsList extends Component {

    render() {
        const { posts, fetching } = this.props;
        return (
            <div className="posts-list-container">
                <div className="row">
                    {fetching && (
                        <Fragment>
                            <div className="col s12">
                                <FakePost />
                            </div>
                            <div className="col s12">
                                <FakePost />
                            </div>
                        </Fragment>
                    )}
                    {posts.map((post, i) =>
                        <div key={`post-${i}`} className="col s12">
                            <Post post={post} linkToPost={true} />
                        </div>)}
                </div>
            </div>
        );
    }
}