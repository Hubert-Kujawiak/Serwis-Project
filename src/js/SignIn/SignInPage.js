import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import HeaderBeforeLogin from "../HeaderBeforeLogin";


const SignInPage = () => (
    <div>
        <SignInForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <>
                <HeaderBeforeLogin/>
                <div className="image">
            <div className="loginForm">
                <h1>Zaloguj się</h1>
            <form onSubmit={this.onSubmit}>
                <label>Email</label><br/>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                /><br/>
                <label>Hasło</label><br/>
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                /><br/>
                <Link to="/register">Załóż konto</Link>
                <button disabled={isInvalid} type="submit">
                    Zaloguj się
                </button>
                {error && <p>{error.message}</p>}
            </form>
            </div>
                </div>
            </>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };