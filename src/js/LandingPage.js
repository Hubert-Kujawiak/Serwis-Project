import React from 'react'
import {Link} from "react-router-dom";
import HeaderBeforeLogin from "./HeaderBeforeLogin";
import {withFirebase} from "./Firebase";
import Header from "./Header";

function LandingPage( {firebase} ) {

    const isUser = firebase.getCurrentUser()
    console.log(isUser)

    return (
        <>
            {isUser ? <Header/> :<HeaderBeforeLogin/> }
            <div className="image">
                <div className="welcomeText">
                    <h1>Witaj w aplikacji serwisowej!</h1>
                    <p>Dodawaj samochód do bazy lub je wyszukuj.</p>
                    <p>Wszystkie naprawy oraz serwisy w jednym miejscu!</p>
                    {isUser ? <>
                            <button className="buttonLandPageFirst"><Link to="/add">Dodaj Pojazd</Link></button>
                            <button className="buttonLandPageSecond"><Link to="/search">Baza Pojazdów</Link></button>
                            </>
                     : <p>Zaloguj sie lub załóż konto i korzystaj z aplikacji!</p>}
                </div>
            </div>
        </>
    )
}

export default withFirebase(LandingPage)