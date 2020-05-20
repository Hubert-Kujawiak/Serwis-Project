import React,{useEffect} from "react";
import {Link} from "react-router-dom";
import HeaderBeforeLogin from "./HeaderBeforeLogin";
import { useHistory } from 'react-router-dom'


export default function LogOut() {

    const history = useHistory();
    useEffect(() => {
        const timeout = setTimeout(() => {
            history.push("/")
        }, 3000)
        return () => clearTimeout(timeout)
    })

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