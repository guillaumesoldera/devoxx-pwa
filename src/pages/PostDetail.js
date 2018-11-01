import React, { Component } from 'react';
import { BackHeader } from '../components/Header';
import { Post } from '../components/Post';
import '../styles/PostDetail.scss'
import { PostComment } from '../components/PostComment';
import { postDetails } from '../services/posts';

export class PostDetail extends Component {
    state = {
        postDetail: undefined
    }

    async componentDidMount() {
        console.log('this.props.postId', this.props.postId)
        const postDetail = await postDetails(this.props.postId);
        console.log('post', postDetail)
        this.setState({ postDetail })
    }

    render() {
        const { postDetail } = this.state
        if (!postDetail) {
            return null;
        }
        return (
            <div className="post-detail">
                <BackHeader title={"Post detail"} />
                {postDetail.post && <Post post={postDetail.post} />}
                {postDetail.comments && <ul className="post-comments">
                    {postDetail.comments.map((comment, i) => <li key={`post-${i}`}><PostComment comment={comment} /></li>)}
                </ul>}
            </div>
        );
    }
}