import React, { Component } from 'react';
import { BackHeaderWithAction } from '../components/Header';
import '../styles/Comment.css';
import { comment } from '../stores/indexedDb';
import { UserContext } from '../context/user';
import moment from 'moment';
moment.locale('fr');

export class Comment extends Component {

    state = {
        text: ''
    }

    static contextType = UserContext;

    componentDidMount() {
        this._input.focus();
    }

    addComment = async () => {
        const { text } = this.state;
        const newComment = {
            text,
            date: moment().unix(),
            authorId: this.context.user.id,
            postId: this.props.postId
        }
        await comment(newComment);
    }

    onChangeText = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    render() {
        return (
            <div className="comment-post-container">
                <BackHeaderWithAction actionClass={"comment-post"} actionLabel={'Comment'} doAction={this.addComment} />
                <div className="comment-post-content">
                    <textarea
                        ref={(elem) => this._input = elem}
                        onBlur={this.onKeyboardClose}
                        onKeyDown={this.onKeyboardOpen}
                        onChange={this.onChangeText}
                        className="materialize-textarea post-comment-text"
                        placeholder={`Comment on ${this.props.postId}...`}>
                    </textarea>
                </div>
            </div>
        );
    }
}