import React,{useState,useEffect} from 'react'
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom';

export default function Header() {

    const day = new Date().getDate();
    const mon = new Date().getMonth()
    const year = new Date().getFullYear()
    const actDate = ((day < 10 ? "0"+day : day) + "." + (mon < 10 ? "0"+mon : mon) + "." + year)

    const h = new Date().getHours();
    const m = new Date().getMinutes();
    const actH = ((h < 10 ? "0"+h : h) +" : " + (m < 10 ? "0"+m : m))

    return (
    <>
        <Router>
            <header className="header">
                <h1>Zaplanuj Przegląd!</h1>
                <h2>{actH}<p></p>{actDate}</h2>
                <nav>
                    <span><Link to="/">Home</Link></span>
                    <span><Link to="/add">Dodaj Pojazd</Link></span>
                    <span><Link to="/search">Baza Pojazdów</Link></span>
                    <span><Link to="/parts">Baza Części</Link></span>
                </nav>
            </header>
        </Router>
    </>
    )
}
