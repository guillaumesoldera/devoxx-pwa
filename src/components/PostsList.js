import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Post } from './Post';
import '../styles/PostsList.scss';
import { allPostsWithAuthors } from '../services/posts';

export class PostsList extends Component {

    state = {
        posts: []
    }

    async componentDidMount() {
        const posts = await allPostsWithAuthors();
        this.setState({ posts })
    }

    render() {
        const { posts } = this.state;
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