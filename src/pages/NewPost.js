import React, { Component, Fragment } from 'react';
import { BackHeader } from '../components/Header';
import '../styles/NewPost.scss';

export class NewPost extends Component {

    _imageCapture = null;

    state = {
        cameraDisabled: false,
        openCamera: false,
        imageSrc: undefined,
        imgValidated: false,
    }

    componentDidMount() {
        this._input.focus();
    }

    componentWillMount() {
        this._imageCapture = null;
    }

    openCamera = (e) => {
        navigator.mediaDevices.getUserMedia({video: true})
        .then(mediaStream => {
            this.setState({
                openCamera: true
            }, () => {
                document.querySelector('video').srcObject = mediaStream;
    
                const track = mediaStream.getVideoTracks()[0];
                this._imageCapture = new ImageCapture(track);
            })
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
        this.setState({
            openCamera: false,
        }, () => {
            this._imageCapture = null;
        })
    }

    takePicture = (e) => {
        if (this._imageCapture) {
            this._imageCapture.takePhoto()
            .then(blob => {
                this.setState({
                    openCamera: false,
                    imageSrc: URL.createObjectURL(blob)
                });
              })
              .catch(error => console.error('takePhoto() error:', error));
        }
    }

    retry = (e) => {
        URL.revokeObjectURL(this.state.imageSrc);
        this.setState({
            imageSrc: undefined,
        }, () => {
            this.openCamera();
        })
    }

    valid = (e) => {
        this.setState({
            imgValidated: true,
        })
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
                    {
                        this.state.imageSrc && !this.state.imgValidated &&  (
                            <div className="picture-container">
                                <img src={this.state.imageSrc}/>
                                <div className="buttons-actions">
                                    <button className="btn btn-rounded" onClick={this.valid}>Valid</button>
                                    <button className="btn btn-rounded" onClick={this.retry}>Retry</button>
                                </div>
                            </div>
                        )
                    }
                    {this.state.openCamera && (
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