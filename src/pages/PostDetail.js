import React, { Component } from 'react';
import { BackHeader } from '../components/Header';
import { Post } from '../components/Post';
import '../styles/PostDetail.scss'
import { PostComment } from '../components/PostComment';

export class PostDetail extends Component {
    render() {
        return (
            <div className="post-detail">
                <BackHeader title={"Post detail"}/>
                <Post />
                <ul className="post-comments">
                    <li>
                        <PostComment />
                    </li>
                    <li>
                        <PostComment />
                    </li>
                </ul>
            </div>
        );
    }
}