import React, { Component } from 'react';
import { BackHeader } from '../components/Header';
import '../styles/Comment.scss';

export class Comment extends Component {

    componentDidMount() {
        this._input.focus();
    }

    render() {
        return (
            <div className="comment-post-container">
                <BackHeader iconClassName="fa fa-times close">
                    <ul className="right">
                        <li>
                            <button className="btn btn-rounded comment-post">
                                <span>Comment</span>
                            </button>
                        </li>
                    </ul>
                </BackHeader>
                <div className="comment-post-content">
                    <textarea
                        ref={(elem) => this._input = elem}
                        onBlur={this.onKeyboardClose}
                        onKeyDown={this.onKeyboardOpen}
                        className="materialize-textarea post-comment-text"
                        placeholder={`Comment on ${this.props.postId}...`}>
                    </textarea>
                </div>
            </div>
        );
    }
}