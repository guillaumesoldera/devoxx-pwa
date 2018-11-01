import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../styles/Post.scss'
import { classSet } from '../utils/utils';
import { UserContext } from '../context/user';

export class Post extends Component {

    static propTypes = {
        linkToPost: PropTypes.bool.isRequired,
        post: PropTypes.object.isRequired,
        
    }

    static defaultProps = {
        linkToPost: false,
        post:undefined
    }

    render() {
        const {post}=this.props;
        let text = (
            post && <p>{post.text} </p>
        );
        if (post && this.props.linkToPost) {
            text = (
                <NavLink to={`/post/${post.postId}`}>
                    {text}
                </NavLink>
            )
        }

        return (
            <UserContext.Consumer>
                { ({user}) => (
                post && <div className="post">
                    <div className="post-metadata">
                        <img src={post.author.profilePicture} className="post-author-avatar" />
                        <div className="post-infos">
                            <NavLink to={`/authors/${post.author.authorId}`} className="post-author-name">{post.author.fullName}</NavLink>
                            <span className="post-location">{post.location}</span>
                        </div>
                        <span className="post-date">{post.date}</span>
                    </div>
                    <div className="post-text">
                        {text}
                    </div>
                    <div className="post-picture-container">
                        <img src={post.picture} className="post-picture"/>
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