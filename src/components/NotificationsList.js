import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from "react-router-dom";
import '../styles/NotificationsList.css'
import { notifications, markAllNotifactionAsSeen } from '../stores/indexedDb';
import { allAuthors } from '../services/authors';
import moment from 'moment';
moment.locale('fr');

class Notification extends Component {

    static propTypes = {
        type: PropTypes.any.isRequired,
        className: PropTypes.string.isRequired,
    }

    static defaultProps = {
        className: ''
    }

    render() {
        return (
            <div className={["notification", this.props.className].join(' ')}>
                <div className="notification-type">
                    {this.props.type}
                </div>
                <div className="notification-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

class FavouriteNotification extends Component {
    render() {
        const { notif } = this.props;
        return (
            <Notification type={<i className="fa fa-heart material-icons small"></i>}>
                <img src={notif.author.profilePicture} className="post-author-avatar" />
                <div className="notification-post-infos">
                    <NavLink to={`/authors/${notif.authorId}`} className="post-author-name">{notif.author.fullName}</NavLink>
                    &nbsp;favourites&nbsp;
                    <NavLink to={`/posts/${notif.postId}`} className="post-title">Your post</NavLink>
                </div>
                <span className="notification-post-date">{moment(notif.date * 1000).format('ll')}</span>
            </Notification>
        )
    }
}

class VoteUpNotification extends Component {
    render() {
        const { notif } = this.props;
        return (
            <Notification type={<i className="fa fa-thumbs-up material-icons small"></i>}>
                <img src={notif.author.profilePicture} className="post-author-avatar" />
                <div className="notification-post-infos">
                    <NavLink to={`/authors/${notif.authorId}`} className="post-author-name">{notif.author.fullName}</NavLink>
                    &nbsp;votes up&nbsp;
                    <NavLink to={`/posts/${notif.postId}`} className="post-title">Your post</NavLink>
                </div>
                <span className="notification-post-date">{moment(notif.date * 1000).format('ll')}</span>
            </Notification>
        )
    }
}

class VoteDownNotification extends Component {
    render() {
        const { notif } = this.props;
        return (
            <Notification type={<i className="fa fa-thumbs-down material-icons small"></i>}>
                <img src={notif.author.profilePicture} className="post-author-avatar" />
                <div className="notification-post-infos">
                    <NavLink to={`/authors/${notif.authorId}`} className="post-author-name">{notif.author.fullName}</NavLink>
                    &nbsp;votes down&nbsp;
                    <NavLink to={`/posts/${notif.postId}`} className="post-title">Your post</NavLink>
                </div>
                <span className="notification-post-date">{moment(notif.date * 1000).format('ll')}</span>
            </Notification>
        )
    }
}

class CommentNotification extends Component {
    render() {
        const { notif } = this.props;
        return (
            <Notification className="comment" type={<i className="fa fa-comment material-icons small"></i>}>
                <div className="notification-content-comment">
                    <img src={notif.author.profilePicture} className="post-author-avatar" />
                    <div className="notification-post-infos">
                        <NavLink to={`/authors/${notif.authorId}`} className="post-author-name">{notif.author.fullName}</NavLink>
                        &nbsp;comments on&nbsp;
                        <NavLink to={`/posts/${notif.postId}`} className="post-title">Your post</NavLink>
                    </div>
                    <span className="notification-post-date">{moment(notif.date * 1000).format('ll')}</span>
                </div>
            </Notification>
        )
    }
}


export class NotificationsList extends Component {

    state = {
        notifs: []
    }

    async componentDidMount() {
        await markAllNotifactionAsSeen();
        let notifs = await notifications();
        if (notifs.length > 0) {
            const authors = await allAuthors();
            notifs = notifs.map(notif => ({
                ...notif,
                author: authors.find(author => author.authorId === notif.authorId),
            }));
        }
        this.setState({
            notifs
        })
    }

    render() {
        const { notifs } = this.state;
        if (notifs.length === 0) {
            return (
                <div className="notification-list-container">
                    No new notifications
                </div>
            );
        }
        const allNotifs = [...notifs];
        allNotifs.sort((n1, n2) => n2.date - n1.date);
        return (
            <div className="notification-list-container">
                {allNotifs.map((notif, index) => {
                    switch (notif.action) {
                        case 'favorite':
                            return <div key={`notif-${index}`} className="row">
                                <div className="col s12">
                                    <FavouriteNotification notif={notif} />
                                </div>
                            </div>
                        case 'voteUp':
                            return <div key={`notif-${index}`} className="row">
                                <div className="col s12">
                                    <VoteUpNotification notif={notif} />
                                </div>
                            </div>

                        case 'voteDown':
                            return <div key={`notif-${index}`} className="row">
                                <div className="col s12">
                                    <VoteDownNotification notif={notif} />
                                </div>
                            </div>
                        case 'comment':
                            return <div key={`notif-${index}`} className="row">
                                <div className="col s12">
                                    <CommentNotification notif={notif} />
                                </div>
                            </div>
                    }
                })}
            </div>
        );
    }
}