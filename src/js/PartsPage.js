import React,{useState,useEffect} from 'react'
import firebase from "firebase";
import Header from "./Header";
import {withFirebase} from "./Firebase";

function carParts(props) {

    const userAuth = props.firebase.getCurrentUser()

    const [parts, setParts] = useState([])
    const [nameParts, setNameParts] = useState('')
    const [numParts, setNumParts] = useState('')
    const [searchParts, setSearchParts] = useState('')
    const [serialNumber, setSerialNumber] = useState('')


    const handleNameParts = (event) => {
        setNameParts(event.target.value)
    }
    const handleNumberParts = (event) => {
        setNumParts(event.target.value)
    }
    const handleSearchParts = (event) => {
        setSearchParts(event.target.value)
    }
    const handleSerialNumber = (event) => {
        setSerialNumber(event.target.value)
    }

    // Firebase Database -------------------------------------------------

    const db = firebase.firestore()


        useEffect( ( ) => {
            db.collection(`${userAuth}-parts`).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(`${doc.id} => ${doc.data()}`);
                    setParts( prev => ([...prev, doc.data()]))
                });
            });
        },[])

    const handleSubmit = (serialNumber) => {
        db.collection(`${userAuth}-parts`).doc(`${serialNumber}`).set({
            name: nameParts,
            quantity: numParts,
            serNum: serialNumber
        })
            .then(function (docRef) {
                alert("Część została dodana do bazy");
                addNew({
                    name: nameParts,
                    quantity: numParts,
                    serNum: serialNumber
                })
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
        setNameParts('')
        setNumParts('')
        setSerialNumber('')
    }

    const handleDelete = (serNum) => {
        db.collection(`${userAuth}-parts`).doc(`${serNum}`).delete().then(function() {
            alert("Część została usunięta z bazy!");
        }).then( () => {
            const all = parts.filter( parts => parts.serNum !== serNum )
            setParts(all)
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    const addNew = (obj) => {
        setParts(prevState => ([
            ...prevState,
            obj
        ]))
    }

    // Koniec Database


    return (
        <>
            <Header/>
            <div className="allSide">
                <div className="leftSide">
                    <div className="allParts">
                        <form className="formAddParts" onSubmit={ (e) => {
                            e.preventDefault()
                            handleSubmit(serialNumber)
                        }}>
                            <label>Nazwa części:
                                <p>
                                <input type="text" onChange={handleNameParts} value={nameParts}/>
                                </p>
                            </label>
                            <br/>
                            <label>Ilość:
                                <br/>
                                <input type="text" onChange={handleNumberParts} value={numParts}/>
                            </label>
                            <p></p>
                            <label>Nr Seryjny
                                <p></p>
                                <input onChange={handleSerialNumber} value={serialNumber}/>
                            </label>
                            <p></p>
                            <button type="submit">Dodaj!</button>
                        </form>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="parts">
                        <label>Wyszukaj</label>
                        <input type="text" onChange={handleSearchParts}/>
                        <table className="tableParts">
                            <thead>
                            <th>Nazwa</th>
                            <th>Ilość</th>
                            <th>Serial Num</th>
                            </thead>
                            {
                                parts.filter(el => el.name.substr(0, searchParts.length).toLowerCase().includes(searchParts)).map( parts => (
                                    <tr>
                                        <td>{parts.name}</td>
                                        <td>{parts.quantity}</td>
                                        <td>{parts.serNum}</td>
                                        {/*<button className="btnMinus" onClick={ () => handleMinusParts(parts)}>-</button>*/}
                                        {/*<button className="btnMinus" onClick={ () => handlePlusParts(parts)}>+</button>*/}
                                        <button className="btnDelete" onClick={() => handleDelete(parts.serNum)}>Usuń</button>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withFirebase(carParts)



// JSON fetch

// const fetchAllParts = () => {
//     const API = "http://localhost:3000";
//     fetch(`${API}/parts/`)
//         .then(response => response.json())
//         .then(data => setParts(data))
//         .catch(error => {
//             console.log(error);
//         });
// }
//
// useEffect( () => {
//     fetchAllParts()
// },[])


// const handleSubmit = (event) => {
//     event.preventDefault()
//     const parts = {
//         id: '',
//         name: nameParts,
//         quantity: numParts,
//         serNum: serialNumber
//     }
//
//     const API = "http://localhost:3000";
//     fetch(`${API}/parts/`, {
//         method: "POST",
//         body: JSON.stringify(parts),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//     .then(response => fetchAllParts())
//     setNameParts('')
//     setNumParts('')
//     setSerialNumber('')
// }

// const handleDelete = (props) => {
//     const API = "http://localhost:3000";
//     fetch(`${API}/parts/${props}`, {
//         method: "DELETE"
//     })
//         .then(fetchAllParts)
// }
// const handleMinusParts = parts => {
//     const API = "http://localhost:3000";
//     const data = {
//         quantity: parts.quantity -1
//     }
//     fetch(`${API}/parts/${parts.id}`, {
//         method: "PATCH",
//         body: JSON.stringify(data),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//         .then(response => {
//             fetchAllParts()
//         })
// };
//
// const handlePlusParts = parts => {
//     const API = "http://localhost:3000";
//     const data = {
//         quantity: parts.quantity +1
//     }
//     fetch(`${API}/parts/${parts.id}`, {
//         method: "PATCH",
//         body: JSON.stringify(data),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//         .then(response => {
//             fetchAllParts()
//         })
// };