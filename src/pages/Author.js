import React, { Component } from 'react';
import { BackHeader } from '../components/Header';

export class Author extends Component {
    render() {
        return (
            <div className="author-detail">
                <BackHeader title={"Author detail"}/>
                <p>Détail de {this.props.authorId}</p>
            </div>
        );
    }
}