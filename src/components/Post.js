import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../styles/Post.scss'
import { classSet } from '../utils/utils';
import { UserContext } from '../context/user';

export class Post extends Component {

    static propTypes = {
        linkToPost: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        linkToPost: false,
    }

    render() {

        let text = (
            <p>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo
            </p>
        );
        if (this.props.linkToPost) {
            text = (
                <NavLink to={'/authors/authorId/postId'}>
                    {text}
                </NavLink>
            )
        }

        return (
            <UserContext.Consumer>
                { ({user}) => (
                <div className="post">
                    <div className="post-metadata">
                        <img src="https://randomuser.me/api/portraits/men/3.jpg" className="post-author-avatar" />
                        <div className="post-infos">
                            <NavLink to={'/authors/authorId'} className="post-author-name">Jack Vagabond</NavLink>
                            <span className="post-location">Awesome Bar</span>
                        </div>
                        <span className="post-date">11 oct.</span>
                    </div>
                    <div className="post-text">
                        {text}
                    </div>
                    <div className="post-picture-container">
                        <img
                            src="https://www.gannett-cdn.com/-mm-/89934f7b13e7717eb560f3babda84f20895abcd0/c=83-0-724-482/local/-/media/2018/07/17/DetroitFreeP/DetroitFreePress/636674313628993565-GettyImages-684133728.jpg?width=534&height=401&fit=crop"
                            className="post-picture"
                        />
                    </div>
                    <div className="post-actions-container">
                        <div className="post-votes">
                            <span>+34</span>
                            <i className={classSet({
                                "fa fa-thumbs-o-up material-icons small": true,
                                "disabled": user === undefined
                            })}></i>
                            <i className={classSet({
                                "fa fa-thumbs-o-down material-icons small": true,
                                "disabled": user === undefined
                            })}></i>
                        </div>
                        <div className="post-actions">
                            <i className="fa fa-share-alt material-icons small"></i>
                            <a
                                className={classSet({
                                    "disabled": user === undefined
                                })}
                                href="/comment/id_post"><i className="fa fa-comment-o material-icons small"></i></a>
                            <i className={classSet({
                                "fa fa-heart-o material-icons small": true,
                                "disabled": user === undefined
                            })}></i>
                        </div>
                    </div>
                </div>
                )}
            </UserContext.Consumer>
        )
    }
}