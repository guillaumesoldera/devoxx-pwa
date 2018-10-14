import React, { Component } from 'react';
import { BackHeader } from '../components/Header';
import '../styles/NewPost.scss';

export class NewPost extends Component {

    componentDidMount() {
        this._input.focus();
    }

    render() {
        return (
            <div className="new-post-container">
                <BackHeader iconClassName="fa fa-times close">
                    <ul className="right">
                        <li>
                            <button className="btn btn-rounded add-post">
                                <span>Add new post</span>
                            </button>
                        </li>
                    </ul>
                </BackHeader>
                <div className="new-post-content">
                    <textarea
                        ref={(elem) => this._input = elem}
                        onBlur={this.onKeyboardClose}
                        onKeyDown={this.onKeyboardOpen}
                        className="materialize-textarea post-text"
                        placeholder="A new beer wasted ?">
                    </textarea>
                    <div className="new-post-more">
                        <button className="btn new-post-action">
                            <i className="fa fa-camera material-icons medium"></i>
                        </button>
                        <button className="btn new-post-action">
                            <i className="fa fa-image material-icons medium"></i>
                        </button>
                        <button className="btn new-post-action">
                        <i className="fa fa-map-marker material-icons medium"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}