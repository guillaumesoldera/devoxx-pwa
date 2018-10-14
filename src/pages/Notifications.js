import React, { Component } from 'react';
import { Header } from '../components/Header';
import { NotificationsList } from '../components/NotificationsList';

export class Notifications extends Component {
    render() {
        return (
            <div className="notifications">
                <Header />
                <div className="content-container">
                    <NotificationsList />
                </div>
            </div>
        );
    }
}