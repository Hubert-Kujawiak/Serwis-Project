import React,{useState,useEffect} from 'react'
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {withFirebase} from './Firebase'
import SignOutButton from "./SignOut";
// import hamburger from '../images/bars-solid.svg'

function Header({firebase}) {

    const day = new Date().getDate();
    const mon = new Date().getMonth()
    const year = new Date().getFullYear()
    const actDate = ((day < 10 ? "0"+day : day) + "." + (mon < 10 ? "0"+mon : mon) + "." + year)

    const h = new Date().getHours();
    const m = new Date().getMinutes();
    const actH = ((h < 10 ? "0"+h : h) +" : " + (m < 10 ? "0"+m : m))

    const [hideMenu, setHideMenu] = useState('none')
    const [visibleMenu, setVisibleMenu] = useState('block')

    const hideStyle = {
        display: hideMenu,
        cursor: "pointer"
    }
    const styleMenu = {
        display: visibleMenu
    }

    const handleClickHideMenu = () => {
        setHideMenu('block')
        setVisibleMenu('none')
    }

    return (
    <>
        <Router>
            <header className="header">
                <h1>Zaplanuj Przegląd!</h1>
                <h2>Cześć {firebase.getCurrentUser()}</h2><br/>
                <h2><Link to="/logout"><SignOutButton/></Link></h2>
                <div className="mobileMenuButton">
                    <span onClick={handleClickHideMenu} style={styleMenu}>Menu</span>
                    <div className="hideMenu" style={hideStyle}>
                            <p>Cześć {firebase.getCurrentUser()}</p>
                            <p><Link to="/">Home</Link></p>
                            <p><Link to="/add">Dodaj Pojazd</Link></p>
                            <p><Link to="/search">Baza Pojazdów</Link></p>
                            <p><Link to="/parts">Baza Części</Link></p>
                            <p><Link to="/logout"><SignOutButton/></Link></p>
                    </div>
                </div>
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

export default withFirebase(Header)
