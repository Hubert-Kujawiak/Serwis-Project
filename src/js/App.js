import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom';
import "../sass/all.scss"
import LandingPage from "./LandingPage";
import Header from "./Header";
import AddCar from "./AddCar";
import CarList from "./CarList";
import PartsPage from "./PartsPage";

const App = () => (
    <>
        <Router>
        <Header/>
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
        </Switch>
    </Router>
    </>
)


ReactDOM.render(<App/>, document.getElementById('app'));