import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHeader } from '../components/Header';
import { Post } from '../components/Post';
import { NavLink, withRouter } from 'react-router-dom';
import '../styles/Profile.scss';
import { UserContext } from '../context/user';
import { loadProfile } from '../services/profile';

class _Profile extends Component {

    state = {
        imageSrc: '',
        porfile: undefined
    }

    async componentDidMount() {
        console.log('this.context.user.id', this.context.user.id);
        const profile = await loadProfile(this.context.user.id);
        console.log('profile', profile);
        this.setState({ profile, imageSrc: profile.author.profilePicture })
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

    logoutUser = (e) => {
        this.context.logout();
        this.goBack(e);
    }

    picChange = (evt) => {
        const fileInput = evt.target.files;
        if (fileInput.length > 0) {
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
        const { profile, imageSrc } = this.state
        if (!profile) {
            return null;
        }
        return (
            <div className="profile-detail">
                <BackHeader title={"Your profile"}>
                    <ul className="right">
                        <li>
                            <a href="#" className="logout" onClick={(e) => this.logoutUser(e)}>
                                <i className="fa fa-sign-out material-icons small"></i><span>&nbsp;Logout</span>
                            </a>
                        </li>
                    </ul>
                </BackHeader>
                {profile.author && <div className="profile-infos-container">
                    <div className="profile-metadata">
                        {this.state.imageSrc
                            ? <img onClick={this.modifyAvatar} src={imageSrc} className="profile-avatar" />
                            : <div onClick={this.modifyAvatar} className="profile-avatar"><br />profile picture</div>}
                        <input type="file" accept="image/*" onChange={this.picChange} />
                        <canvas width="100" height="100"></canvas>
                        <div className="profile-infos">
                            <span className="profile-name">{profile.author.fullName}</span>
                        </div>
                    </div>
                    <div className="profile-bio">
                        <p>{profile.author.bio}</p>
                    </div>
                </div>}
                <h3 className="posts-separator-title">All posts</h3>
                {profile.posts && <ul>{profile.posts.map((post, i) => <li key={`post-${i}`}><Post post={post} linkToPost={true} /></li>)}</ul>}
            </div>
        );
    }
}
_Profile.contextType = UserContext;
export const Profile = withRouter(_Profile);