import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from "react-router-dom";
import '../styles/Header.css'
import { classSet, getDevice, Devices } from '../utils/utils';
import { UserContext } from '../context/user';
import { unseenNotifications } from '../stores/indexedDb';

export class Header extends Component {

    state = {
        notifications: 0
    }

    static contextType = UserContext;

    async componentDidMount() {
        navigator.serviceWorker.addEventListener('message', async (event) => {
            const { user } = this.context;
            const eventPayload = JSON.parse(event.data);
            if (eventPayload.message === 'gotNotification') {
                console.log('gotNotification')
                const allNotifications = await unseenNotifications(user.id);
                this.setState({
                    notifications: allNotifications.length
                })
            }
        });
        if (user) {
            const allNotifications = await unseenNotifications(user.id);
            this.setState({
                notifications: allNotifications.length
            })
        }
    }

    reload = () => {
        window.location.reload(true);
    }

    render() {
        const { user } = this.context;
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <NavLink to={'/'} className="brand-logo center"><h1>AirBeerN'Beer</h1></NavLink>
                        <ul className="left profile">
                            {user && <li><NavLink to={"/profile"} className="tab"><i className="fa fa-user-circle small left"></i><span>Profile</span></NavLink></li>}
                            {user === undefined && <li><NavLink to={"/login"} className="tab"><i className="fa fa-sign-in small left"></i><span>Login</span></NavLink></li>}
                        </ul>
                        <ul className="left navigation">
                            <li><NavLink to={"/"} exact={true} className="tab"><i className="fa fa-beer small left" aria-hidden="true"></i><span>Beers</span></NavLink></li>
                            <li><NavLink to={"/favourites"}
                                className={classSet({
                                    "tab": true,
                                    "disabled": user === undefined
                                })}>
                                <i className="fa fa-heart small left" aria-hidden="true"></i>
                                <span>Favourites</span></NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/notifications"}
                                    className={classSet({
                                        "tab": true,
                                        "disabled": user === undefined
                                    })}>
                                    <i className="fa fa-bell small left" aria-hidden="true"></i>
                                    {this.state.notifications > 0 && <span className="new badge" data-badge-caption="">{this.state.notifications}</span>}
                                    <span>Notifications</span>
                                </NavLink>
                            </li>
                            <li id="new-version" style={{"display": "none"}}>
                                <div className="tab" onClick={this.reload}>
                                <i className="fa fa-repeat small"></i>
                                <span className="new badge" data-badge-caption="">1</span>
                                </div>
                            </li>
                        </ul>
                        {user &&
                            <ul className="right newpost">
                                <li>
                                    <NavLink to={'/new'}
                                        className={classSet(
                                            {
                                                "btn waves-effect waves-light btn-rounded": true,
                                                "android": getDevice() === Devices.android
                                            }
                                        )}
                                    ><i className="material-icons fa fa-beer large left"></i><span>Add new post</span></NavLink>
                                </li>
                            </ul>
                        }
                    </div>
                </nav>
            </div>
        );
    }
}

class _BackHeader extends Component {

    static propTypes = {
        iconClassName: PropTypes.string.isRequired,
    }

    static defaultProps = {
        iconClassName: 'fa fa-chevron-left'
    }

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

    render() {
        return (
            <div className="navbar-fixed navbar-back">
                <nav>
                    <div className="nav-wrapper">
                        <ul className="left back">
                            <li>
                                <a href="#" onClick={this.goBack}>
                                    <i className={`${this.props.iconClassName} material-icons small`}></i>
                                </a>
                            </li>
                        </ul>
                        <h1 className="brand-logo center">{this.props.title}</h1>
                        {this.props.children}
                    </div>
                </nav>
            </div>
        )
    }
}

export const BackHeader = withRouter(_BackHeader);

class _BackHeaderWithAction extends Component {

    onClick = async (e) => {
        await this.props.doAction();
        if (this.props.history.length > 1) {
            this.props.history.goBack();
        } else {
            this.props.history.replace("/")
        }
    }

    render() {
        return (
            <BackHeader iconClassName="fa fa-times close">
                {!this.props.hideAction && <ul className="right">
                    <li>
                        <button className={`btn btn-rounded ${this.props.actionClass}`} onClick={this.onClick}>
                            <span>{this.props.actionLabel}</span>
                        </button>
                    </li>
                </ul>}
            </BackHeader>
        )
    }
}

export const BackHeaderWithAction = withRouter(_BackHeaderWithAction);

