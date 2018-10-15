import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHeader } from '../components/Header';
import { Post } from '../components/Post';
import { NavLink } from 'react-router-dom';
import '../styles/Author.scss';

export class Author extends Component {

    static propTypes = {
        authorId: PropTypes.string.isRequired
    }

    render() {
        return (
            <div className="author-detail">
                <BackHeader title={"Author detail"}/>
                <div className="author-infos-container">
                    <div className="author-metadata">
                        <img src="https://randomuser.me/api/portraits/men/3.jpg" className="author-avatar" />
                        <div className="author-infos">
                            <span className="author-name">Jack Vagabond</span>
                        </div>
                    </div>
                    <div className="author-bio">
                        <p>
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo
                        </p>
                    </div>
                </div>
                <h3 className="posts-separator-title">All posts</h3>
                <ul>
                    <li>
                        <Post linkToPost={true} />/>
                    </li>
                    <li>
                        <Post linkToPost={true} />/>
                    </li>
                </ul>
            </div>
        );
    }
}