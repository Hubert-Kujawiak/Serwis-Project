import React from 'react'
import {Link} from "react-router-dom";

export default function LandingPage() {

    return (
        <>
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