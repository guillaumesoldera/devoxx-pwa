import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { classSet } from '../utils/utils';
import '../styles/PostComment.css';
import moment from 'moment';
moment.locale('fr');

export class PostComment extends Component {
    
    render() {
        const {comment} = this.props;
        if (!comment) {
            return null;
        }
        return (
            <div className={classSet({ "post-comment": true, "disabled": comment.unsynced })}>
                 <div className="post-comment-metadata">
                    <img src={comment.author.profilePicture} className="post-comment-author-avatar" />
                    <div className="post-comment-infos">
                        <NavLink to={`/authors/${comment.author.authorId}`} className="post-comment-author-name">{comment.author.fullName}</NavLink>
                    </div>
                    <span className="post-comment-date">{moment(comment.date*1000).format('ll')}</span>
                </div>
                <div className="post-comment-text">
                    <p>{comment.text}</p>
                </div>
            </div>
        );
    }
}