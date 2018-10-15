import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/PostComment.scss'

export class PostComment extends Component {
    render() {
        return (
            <div className="post-comment">
                 <div className="post-comment-metadata">
                    <img src="https://randomuser.me/api/portraits/men/4.jpg" className="post-comment-author-avatar" />
                    <div className="post-comment-infos">
                        <NavLink to={'/authors/authorId'} className="post-comment-author-name">Billy Bob</NavLink>
                    </div>
                    <span className="post-comment-date">11 oct.</span>
                </div>
                <div className="post-comment-text">
                    <p>
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo
                    </p>
                </div>
            </div>
        );
    }
}