import React from 'react'
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom';

export default function HeaderBeforeLogin() {

    const day = new Date().getDate();
    const mon = new Date().getMonth()
    const year = new Date().getFullYear()
    const actDate = ((day < 10 ? "0"+day : day) + "." + (mon < 10 ? "0"+mon : mon) + "." + year)

    const h = new Date().getHours();
    const m = new Date().getMinutes();
    const actH = ((h < 10 ? "0"+h : h) +" : " + (m < 10 ? "0"+m : m))

    return (
        <>
                <header className="header">
                    <h1>Zaplanuj Przegląd!</h1>
                    <h2>{actH}<p></p>{actDate}</h2>
                    <nav>
                        <span><Link to="/">Start</Link></span>
                        <span><Link to="/signin">Zaloguj</Link></span>
                        <span><Link to="/signup">Załóż konto</Link></span>
                    </nav>
                </header>
        </>
    )
}