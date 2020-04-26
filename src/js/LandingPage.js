import React from 'react'

export default function LandingPage() {

    return (
        <>
            <div className="image">
                <div className="welcomeText">
                    <h1>Witaj w aplikacji serwisowej!</h1>
                    <p>Dodawaj samochód do bazy lub je wyszukuj.</p>
                    <p>Wszystkie naprawy oraz serwisy w jednym miejscu!</p>
                    <button className="buttonLandPageFirst"><a href="http://localhost:3001/#/add">Dodaj Pojazd</a></button>
                    <button className="buttonLandPageSecond"><a href="http://localhost:3001/#/search">Baza Pojazdów</a></button>
                </div>
            </div>
        </>
    )

}