import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHeader } from '../components/Header';
import { Post } from '../components/Post';
import { NavLink, withRouter } from 'react-router-dom';
import '../styles/Profile.scss';
import { UserContext } from '../context/user';

class _Profile extends Component {


    goBack = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        if (this.props.history.length > 1) {
            this.props.history.goBack();
        } else {
            this.props.history.replace("/")
        }
    }

    logoutUser = (e, logoutMethod) => {
        logoutMethod();
        this.goBack(e);
    }

    render() {
        return (
            <UserContext.Consumer>
                {({user, logout}) => (
            <div className="profile-detail">
                <BackHeader title={"Your profile"}>
                    <ul className="right">
                        <li>
                            <button className="logout" onClick={(e) => this.logoutUser(e, logout)}>
                                <i className="fa fa-sign-out material-icons small"></i><span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </BackHeader>
                <div className="profile-infos-container">
                    <div className="profile-metadata">
                        <img src="https://randomuser.me/api/portraits/men/3.jpg" className="profile-avatar" />
                        <div className="profile-infos">
                            <span className="profile-name">Jack Vagabond</span>
                        </div>
                    </div>
                    <div className="profile-bio">
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
                )}
            </UserContext.Consumer>
        );
    }
}

export const Profile = withRouter(_Profile);