import React, { Component } from 'react';
import { BackHeader } from '../components/Header';
import { withRouter, Redirect } from 'react-router-dom';
import '../styles/SignUp.css';
import { UserContext } from '../context/user';
import { classSet } from '../utils/utils';

class _SignUp extends Component {

    state = {
        email: '',
        password: '',
        confirm_password: '',
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.id;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        }, () => console.log('this.state', this.state));
    }

    signup = async (e, _signup) => {
        const passwordElt = document.getElementById("password")
            , confirm_passwordElt = document.getElementById("confirm_password"),
            validatePassword = () => {
                if (password.value != confirm_password.value) {
                    confirm_password.setCustomValidity("Passwords Don't Match");
                } else {
                    confirm_password.setCustomValidity('');
                }
            }

        passwordElt.onchange = validatePassword;
        confirm_passwordElt.onkeyup = validatePassword;
        const { email, password } = this.state;
        if (email && password && passwordElt.value == confirm_passwordElt.value) {
            await _signup(email, password);
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <UserContext.Consumer>
                {({ user, signup }) => {
                    if (user === undefined) {
                        return (
                            <div className="signup-container">
                                <BackHeader title="Sign Up" iconClassName="fa fa-times close" />
                                <div className="signup-content">
                                    <div className="col s12">
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="email" type="email" className="validate" onChange={this.handleInputChange} required />
                                                <label htmlFor="email" className={classSet({ 'active': this.state.email !== '' })}>Email</label>
                                                <span className="helper-text" data-error="Bad email"></span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="password" type="password" className="validate" onChange={this.handleInputChange} required />
                                                <label htmlFor="password" className={classSet({ 'active': this.state.password !== '' })}>Password</label>
                                            </div>
                                            <div className="input-field col s12">
                                                <input id="confirm_password" type="password" className="validate" onChange={this.handleInputChange} required />
                                                <label htmlFor="confirm_password" className={classSet({ 'active': this.state.confirm_password !== '' })}>Confirm Password</label>
                                            </div>
                                        </div>
                                        <button className="btn btn-rounded" type="button" onClick={(e) => this.signup(e, signup)}>Sign Up</button>
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <Redirect to={'/'} />
                        )
                    }
                }
                }
            </UserContext.Consumer>
        );
    }
}

export const SignUp = withRouter(_SignUp)