import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHeader } from '../components/Header';
import { Post } from '../components/Post';
import { NavLink, withRouter } from 'react-router-dom';
import '../styles/Profile.scss';
import { UserContext } from '../context/user';

class _Profile extends Component {


    state = {
        imageSrc: 'https://randomuser.me/api/portraits/men/3.jpg'
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

    logoutUser = (e, logoutMethod) => {
        logoutMethod();
        this.goBack(e);
    }

    picChange = (evt) => {
        const fileInput = evt.target.files;
        if(fileInput.length>0){
            this._picURL = URL.createObjectURL(fileInput[0]);
            const canvas = document.querySelector('canvas');
            const ctx = canvas.getContext('2d')
            const photo = new Image();
            photo.onload = () => {
                //draw photo into canvas when ready
                const ratio = photo.width / photo.height
                const height = canvas.width / ratio;
                canvas.height = height;
                ctx.drawImage(photo, 0, 0, canvas.width, canvas.height);
                const imageSrc = canvas.toDataURL('image/png');
                //this.state.mediaStream.getTracks()[0].stop(); // stop camera
                this.setState({
                    imageSrc,
                }, () => {
                    if (this._picURL) {
                        URL.revokeObjectURL(this._picURL);
                    }
                })
              };

            photo.src = this._picURL;
        }
    }

    modifyAvatar = () => {
        document.querySelector('input[type=file]').click();
    }

    componentWillUnmount() {
        if (this._picURL) {
            URL.revokeObjectURL(this._picURL);
        }
    }

    render() {
        return (
            <UserContext.Consumer>
                {({user, logout}) => (
            <div className="profile-detail">
                <BackHeader title={"Your profile"}>
                    <ul className="right">
                        <li>
                            <a href="#" className="logout" onClick={(e) => this.logoutUser(e, logout)}>
                                <i className="fa fa-sign-out material-icons small"></i><span>&nbsp;Logout</span>
                            </a>
                        </li>
                    </ul>
                </BackHeader>
                <div className="profile-infos-container">
                    <div className="profile-metadata">
                        <img onClick={this.modifyAvatar} src={this.state.imageSrc} className="profile-avatar" />
                        <input type="file" accept="image/*" onChange={this.picChange}/>
                        <canvas width="100" height="100"></canvas>
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