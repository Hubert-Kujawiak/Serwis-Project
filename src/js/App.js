import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom';
import "../sass/all.scss"
import LandingPage from "./LandingPage";
import AddCar from "./AddCar";
import CarList from "./CarList";
import PartsPage from "./PartsPage";
import Firebase, { FirebaseContext } from './Firebase';
import SignInPage from "./SignIn/SignInPage";
import SignUpPage from "./SignUp/SignUpPage";
import LogOut from "./LogOut";

const App = () => (
    <>
        <Router>
        <Switch>
            <Route exact path="/">
                <LandingPage/>
            </Route>
            <Route path="/add">
                <AddCar/>
            </Route>
            <Route path="/search">
                <CarList/>
            </Route>
            <Route path="/parts">
                <PartsPage/>
            </Route>
            <Route path="/signin">
                <SignInPage/>
            </Route>
            <Route path="/signup">
                <SignUpPage/>
            </Route>
            <Route path="/logout">
                <LogOut/>
            </Route>
        </Switch>
    </Router>
    </>
)


ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>,
    document.getElementById('app'));