import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Post } from './Post';
import '../styles/PostsList.scss';


export class PostsList extends Component {
    render() {
        return (
            <div className="posts-list-container">
                <div className="row">
                    <div className="col s12 m6 l3">
                        <Post linkToPost={true} />
                    </div>
                    <div className="col s12 m6 l3">
                        <Post linkToPost={true} />
                    </div>
                </div>
            </div>
        );
    }
}