import React, { Component } from 'react';
import { Header } from '../components/Header';
import { PostsList } from '../components/PostsList';

export class Favourites extends Component {
    render() {
        return (
            <div className="favourites">
                <Header />
                <div className="content-container">
                    <PostsList />
                </div>
            </div>
        );
    }
}