import React, { Component } from 'react';
import { BackHeader } from '../components/Header';

export class PostDetail extends Component {
    render() {
        return (
            <div className="post-detail">
                <BackHeader title={"Post detail"}/>
                <p>Détail de {this.props.postId}</p>
            </div>
        );
    }
}