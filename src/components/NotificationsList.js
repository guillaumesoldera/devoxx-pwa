import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {NavLink, withRouter} from "react-router-dom";
import '../styles/NotificationsList.scss'

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
        return (
            <Notification type={<i className="fa fa-heart material-icons small"></i>}>
                <img src="https://randomuser.me/api/portraits/men/3.jpg" className="post-author-avatar" />
                <div className="notification-post-infos">
                    <NavLink to={"/authorId"} className="post-author-name">Jack Vagabond</NavLink>
                    &nbsp;favourites&nbsp;
                    <NavLink to={"/authorId/postId"} className="post-title">Post title</NavLink>
                </div>
                <span className="notification-post-date">11 oct.</span>
            </Notification>
        )
    }
}

class VoteUpNotification extends Component {
    render() {
        return (
            <Notification type={<i className="fa fa-thumbs-up material-icons small"></i>}>
                <img src="https://randomuser.me/api/portraits/men/3.jpg" className="post-author-avatar" />
                <div className="notification-post-infos">
                    <NavLink to={"/authorId"} className="post-author-name">Jack Vagabond</NavLink>
                    &nbsp;votes up&nbsp;
                    <NavLink to={"/authorId/postId"} className="post-title">Post title</NavLink>
                </div>
                <span className="notification-post-date">11 oct.</span>
            </Notification>
        )
    }
}

class VoteDownNotification extends Component {
    render() {
        return (
            <Notification type={<i className="fa fa-thumbs-down material-icons small"></i>}>
                <img src="https://randomuser.me/api/portraits/men/3.jpg" className="post-author-avatar" />
                <div className="notification-post-infos">
                    <NavLink to={"/authorId"} className="post-author-name">Jack Vagabond</NavLink>
                    &nbsp;votes down&nbsp;
                    <NavLink to={"/authorId/postId"} className="post-title">Post title</NavLink>
                </div>
                <span className="notification-post-date">11 oct.</span>
            </Notification>
        )
    }
}

class CommentNotification extends Component {
    render() {
        return (
            <Notification className="comment" type={<i className="fa fa-comment material-icons small"></i>}>
                <div className="notification-content-comment">
                    <img src="https://randomuser.me/api/portraits/men/3.jpg" className="post-author-avatar" />
                    <div className="notification-post-infos">
                        <NavLink to={"/authorId"} className="post-author-name">Jack Vagabond</NavLink>
                        &nbsp;comments on&nbsp;
                        <NavLink to={"/authorId/postId"} className="post-title">Post title</NavLink>
                    </div>
                    <span className="notification-post-date">11 oct.</span>
                </div>
                <p className="notification-post-comment">
                    Quibus ita sceleste patratis Paulus cruore perfusus reversusque ad principis castra multos coopertos paene catenis adduxit in squalorem deiectos atque maestitiam, quorum adventu intendebantur eculei uncosque parabat carnifex et tormenta
                </p>
            </Notification>
        )
    }
}


export class NotificationsList extends Component {
    render() {
        return (
            <div className="notification-list-container">
                <div className="row">
                    <div className="col s12">
                        <FavouriteNotification />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <VoteUpNotification />
                    </div>
                </div>
                <div className="row">   
                    <div className="col s12">
                        <VoteDownNotification />
                    </div>
                </div>
                <div className="row">   
                    <div className="col s12">
                        <CommentNotification />
                    </div>
                </div>
            </div>
        );
    }
}