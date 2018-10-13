import React, { Component } from 'react';
import { Header } from '../components/Header';
import { PostsList } from '../components/PostsList';
import '../styles/Home.scss';
export class Home extends Component {
    render() {
        return (
            <div className="home">
                <Header />
                <div className="content-container">
                    <PostsList />
                </div>
            </div>
        );
    }
}