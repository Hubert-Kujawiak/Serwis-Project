import React from "react";
import {Link} from "react-router-dom";
import HeaderBeforeLogin from "./HeaderBeforeLogin";

export default function LogOut() {

    return(
        <>
            <HeaderBeforeLogin/>
            <div className="image">
            <div className="logout">
                <h1>Wylogowanie nastąpiło<br/>pomyślnie!</h1>
                <Link to='/'>Strona główna</Link>
            </div>
            </div>
        </>
    )
}