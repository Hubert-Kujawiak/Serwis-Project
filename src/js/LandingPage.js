import React from 'react'
import {Link} from "react-router-dom";
import HeaderBeforeLogin from "./HeaderBeforeLogin";
import {withFirebase} from "./Firebase";
import Header from "./Header";

function LandingPage( {firebase} ) {

    const isUser = firebase.getCurrentUser()

    return (
        <>
            {isUser ? <Header/> :<HeaderBeforeLogin/> }
            <div className="image">
                <div className="welcomeText">
                    <h1>Witaj w aplikacji serwisowej!</h1>
                    <p>Dodawaj samochód do bazy lub je wyszukuj.</p>
                    <p>Wszystkie naprawy oraz serwisy w jednym miejscu!</p>
                    <button className="buttonLandPageFirst"><Link to="/add">Dodaj Pojazd</Link></button>
                    <button className="buttonLandPageSecond"><Link to="/search">Baza Pojazdów</Link></button>
                </div>
            </div>
        </>
    )
}

export default withFirebase(LandingPage)