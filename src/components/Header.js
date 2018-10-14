import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {NavLink, withRouter} from "react-router-dom";
import '../styles/Header.scss'
import { classSet, getDevice, Devices } from '../utils/utils';

export class Header extends Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                    <NavLink to={'/'} className="brand-logo center"><h1>AirBeerN'Beer</h1></NavLink>
                    <ul className="left profile">
                        <li><NavLink to={"/profile"} className="tab"><i className="fa fa-user-circle small left"></i><span>Profile</span></NavLink></li>
                    </ul>
                    <ul className="left navigation">
                        <li><NavLink to={"/beers"} className="tab"><i className="fa fa-beer small left" aria-hidden="true"></i><span>Beers</span></NavLink></li>
                        <li><NavLink to={"/favourites"} className="tab"><i className="fa fa-heart small left" aria-hidden="true"></i><span>Favourites</span></NavLink></li>
                        <li><NavLink to={"/notifications"} className="tab"><i className="fa fa-bell small left" aria-hidden="true"></i><span>Notifications</span></NavLink></li>
                    </ul>
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

    render () {
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

