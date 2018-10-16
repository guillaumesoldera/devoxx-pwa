import React, { Component, Fragment } from 'react';
import { BackHeader } from '../components/Header';
import '../styles/NewPost.scss';
import { classSet } from '../utils/utils';

export class NewPost extends Component {

    state = {
        cameraDisabled: false,
        openCamera: false,
        imageSrc: undefined,
        imgValidated: false,
        mediaStream: undefined
    }

    componentDidMount() {
        this._input.focus();
    }

    openCamera = (e) => {
        navigator.mediaDevices.getUserMedia({video: true})
        .then(mediaStream => {
            this.setState({
                openCamera: true,
                mediaStream,
                imageSrc: undefined,
            }, () => {
                document.querySelector('video').srcObject = mediaStream;
            });
        })
        .catch(err => {
            console.log('err', err);
            this.setState({
                openCamera: false,
                cameraDisabled: true,
            })
        })
    }

    closeCamera = (e) => {
        if (this.state.mediaStream) {
            this.state.mediaStream.getTracks()[0].stop();
        }
        this.setState({
            openCamera: false,
            mediaStream: undefined
        })
    }

    takePicture = (e) => {
        const canvas = document.querySelector('canvas');
        const video = document.querySelector('video');
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageSrc = canvas.toDataURL('image/png');
        this.state.mediaStream.getTracks()[0].stop();
        this.setState({
            imageSrc,
            openCamera: false,
            mediaStream: undefined,
        })

    }

    retry = (e) => {
        URL.revokeObjectURL(this.state.imageSrc);
        this.openCamera();
    }

    valid = (e) => {
        this.setState({
            imgValidated: true,
        })
    }

    componentWillUnmount() {
        if (this.state.mediaStream) {
            this.state.mediaStream.getTracks()[0].stop();
        }
    }

    render() {
        const takingPicture = this.state.openCamera || (this.state.imageSrc && !this.state.imgValidated)
        return (
            <div className="new-post-container">
                <BackHeader iconClassName="fa fa-times close">
                    {!takingPicture && (
                        <ul className="right">
                            <li>
                                <button className="btn btn-rounded add-post">
                                    <span>Add new post</span>
                                </button>
                            </li>
                        </ul>
                        )
                    }
                </BackHeader>
                <div className="new-post-content">
                    {!takingPicture && (
                        <Fragment>
                            <textarea
                                ref={(elem) => this._input = elem}
                                onBlur={this.onKeyboardClose}
                                onKeyDown={this.onKeyboardOpen}
                                className="materialize-textarea post-text"
                                placeholder="A new beer wasted ?">
                            </textarea>
                            {this.state.imgValidated && this.state.imageSrc && (
                                <div className="pictures-validated-container">
                                    <img src={this.state.imageSrc} />
                                </div>
                            )}
                            <div className="new-post-more">
                                {navigator.mediaDevices && (
                                    <button
                                        className="btn new-post-action"
                                        disabled={this.state.cameraDisabled || this.state.imgValidated}
                                        onClick={this.openCamera}>
                                        <i className="fa fa-camera material-icons medium"></i>
                                    </button>
                                )
                                }
                                <button className="btn new-post-action" disabled={this.state.imgValidated}>
                                    <i className="fa fa-image material-icons medium"></i>
                                </button>
                                <button className="btn new-post-action">
                                <i className="fa fa-map-marker material-icons medium"></i>
                                </button>
                            </div>
                        </Fragment>
                    )}
                    
                    <div className={classSet({"picture-container": true, "hide": !(this.state.imageSrc && !this.state.imgValidated)})}>
                        <canvas></canvas>
                        <div className="buttons-actions">
                            <button className="btn btn-rounded" onClick={this.valid}>Valid</button>
                            <button className="btn btn-rounded" onClick={this.retry}>Retry</button>
                        </div>
                    </div>
                        
                    {this.state.openCamera && this.state.mediaStream && (
                        <div className="video-container">
                            <video autoPlay></video>
                            <div className="buttons-actions">
                                <button className="btn btn-rounded" onClick={this.takePicture}>Take a picture</button>
                                <button className="btn btn-rounded" onClick={this.closeCamera}>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}