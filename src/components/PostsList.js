import React, { Component } from 'react';
import '../styles/PostsList.scss';

class Post extends Component {
    render() {
        return (
            <div className="post">
                <div className="post-metadata">
                    <img src="https://randomuser.me/api/portraits/men/3.jpg" className="post-author-avatar" />
                    <div className="post-infos">
                        <span className="post-author-name">Jack Vagabond</span>
                        <span className="post-location">Awesome Bar</span>
                    </div>
                    <span className="post-date">11 oct.</span>
                </div>
                <div className="post-text">
                    <p className="line-clamp">
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo
                    </p>
                </div>
                <div className="post-picture-container">
                    <img
                        src="https://www.gannett-cdn.com/-mm-/89934f7b13e7717eb560f3babda84f20895abcd0/c=83-0-724-482/local/-/media/2018/07/17/DetroitFreeP/DetroitFreePress/636674313628993565-GettyImages-684133728.jpg?width=534&height=401&fit=crop"
                        className="post-picture"
                    />
                </div>
                <div className="post-actions-container">
                    <div className="post-votes">
                        <span>+34</span>
                        <i className="fa fa-thumbs-o-up material-icons small"></i>
                        <i className="fa fa-thumbs-o-down material-icons small"></i>
                    </div>
                    <div className="post-actions">
                        <i className="fa fa-share-alt material-icons small"></i>
                        <i className="fa fa-comment-o material-icons small"></i>
                        <i className="fa fa-heart-o material-icons small"></i>
                    </div>
                </div>
            </div>
        )
    }
}


export class PostsList extends Component {
    render() {
        return (
            <div className="posts-list-container">
                <div className="row">
                    <div className="col s12 m6 l3">
                        <Post />
                    </div>
                    <div className="col s12 m6 l3">
                        <Post />
                    </div>
                </div>
            </div>
        );
    }
}