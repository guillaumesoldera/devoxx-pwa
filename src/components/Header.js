import React, { Component } from 'react';
import {NavLink, withRouter} from "react-router-dom";
import '../styles/Header.scss'

export class Header extends Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                    <NavLink to={'/'} className="brand-logo center">Logo</NavLink>
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
                            <NavLink to={'/new'} className="btn waves-effect waves-light btn-rounded"><i className="material-icons fa fa-beer large left"></i><span>Add new post</span></NavLink>
                        </li>
                    </ul>
                    </div>
                </nav>
            </div>
        );
    }
}   