import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';


import { withFirebase } from '../Firebase';



const SignUpPage = () => (
    <div>
        <SignUpForm />
    </div>
);
const INITIAL_STATE = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const {email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {

        const {
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === ''

        return (
            <>
                <div className="image">
            <div className="registerForm">
                <h1>Załóż konto</h1>
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
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                /><br/>
                <label>Powtórz hasło</label><br/>
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                />
                <Link to="/login">Zaloguj się</Link>
                <button disabled={isInvalid} type="submit">
                    Załóż konto
                </button>
                {error && <p>{error.message}</p>}
            </form>
            </div>
                </div>
            </>
        );
    }
}

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm};