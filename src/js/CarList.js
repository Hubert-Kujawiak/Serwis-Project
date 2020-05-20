import React,{useEffect,useState} from 'react'
import firebase from "firebase";
import {useHistory} from "react-router-dom";
import Header from "./Header";
import {withFirebase} from "./Firebase";


function CarList(props) {

    const userAuth = props.firebase.getCurrentUser()

    const history = useHistory();

    const [allCars, setAllCars] = useState([])
    const [moreInfo, setMoreInfo] = useState([])
    const [searchCar ,setSearchCar] = useState('')

    const [showMore, setShowMore] = useState('none')
    const [showAddRepair, setShowAddRepair] = useState('none')

    const [firstAddInput, setFirstAddInput] = useState('')
    const [secondAddInput, setSecondAddInput] = useState('')
    const [priceRepair, setPriceRepair] = useState('')

    const day = new Date().getDate();
    const mon = new Date().getMonth()
    const year = new Date().getFullYear()
    const actDate = (day + "." + mon + "." + year)


    // Pobieranie samochodow z bazy firebase ---------------------------------------------------------

    const db = firebase.firestore()

        useEffect( ( ) => {
            db.collection(`${userAuth}`).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(`${doc.id} => ${doc.data()}`);
                    setAllCars( prev => ([...prev, doc.data()]))
                });
            });
        },[])



    // Usuwanie pojazdów z bazy

    const handleDelete = (numRej, userAuth) => {
        db.collection(`${userAuth}`).doc(`${numRej}`).delete().then(function() {
            // alert("Document successfully deleted!");
        }).then( () => {
            const all = allCars.filter( car => car.numRej !== numRej )
            setAllCars(all)
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    // Funkcja wiecej informacji

    const ShowMeMoreInfo = (numRej) => {
        const db = firebase.firestore()

        setShowMore('block')
        const index = allCars.findIndex(car => car.numRej === numRej )
        const details = [...allCars][index]
        setMoreInfo(details)
        console.log(index)
    }

    const style = {
        display: showMore
    }
    const styleAddRepair = {
        display: showAddRepair
    }

    const handleCloseMoreInfo = () => {
        setShowMore("none")
    }
    const handleSearchCar = (event) => {
        setSearchCar(event.target.value)
    }

    const handleAddRepair = () => {
        setShowAddRepair('block')
    }
    const handleUnvisibleForm = () => {
        setShowAddRepair('none')
    }
    const handleFirstPlace = (event) => {
        setFirstAddInput(event.target.value)
    }
    const handleSecondPlace = (event) => {
        setSecondAddInput(event.target.value)
    }
    const handlePriceRepair = (event) => {
        setPriceRepair(event.target.value)
    }

    return(
        <>
            <Header/>
            <div className="allItem">
                <div className="leftSide">
                    <div className="searchInput">
                        <label>Wyszukaj w bazie:
                            <input type="text" onChange={handleSearchCar}/>
                        </label>
                    </div>
                    <div>
                        {
                            allCars.filter(el => el.mark.substr(0, searchCar.length).toLowerCase().includes(searchCar)).map( car => (
                                <div className="allCarList">
                                    <ul>
                                        <li key={car.id}>
                                            <h1>Marka: {car.mark}</h1>
                                            <p>Model: {car.model}</p>
                                            <p>Nr Rejestracyjny: {car.numRej}</p>
                                            <p>Przebieg: {car.vin}</p>
                                            <p>Data Serwisu: {car.date}</p>
                                            <button onClick={() => ShowMeMoreInfo(car.numRej)}>Więcej Informacji</button>
                                            <button onClick={() => handleDelete(car.numRej, userAuth)}>Usuń z bazy</button>
                                        </li>
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="otherInformation" style={style}>
                    <h1>Marka: {moreInfo.mark}</h1>
                    <p>Model: {moreInfo.model}</p>
                    <p>Nadwozie: {moreInfo.body}</p>
                    <p>Paliwo: {moreInfo.fuel}</p>
                    <p>Moc: {moreInfo.power} km</p>
                    <p>Przebieg: {moreInfo.vin}</p>
                    <p>Num Rejestracyjny: {moreInfo.numRej}</p>
                    <p>Data Serwisu: {moreInfo.date}</p>
                    <p className="morePlace">Wykonane naprawy: {moreInfo.other && moreInfo.other.join(" , ")}</p>
                    <p className="morePlace">Wymienione części: {moreInfo.parts && moreInfo.parts.join(" , ")}</p>
                    <p>Cena Usługi: {moreInfo.price} zł</p>
                    <button onClick={handleAddRepair}>Dodaj</button>
                    <button onClick={handleCloseMoreInfo}>Zamknij</button>
                    <div className="addRepair" style={styleAddRepair}>
                        <form onSubmit={() => handleSubmitAddRepair(moreInfo)}>
                            <textarea placeholder="Naprawy" onChange={handleFirstPlace} value={firstAddInput}></textarea>
                            <textarea placeholder="Części" onChange={handleSecondPlace} value={secondAddInput}></textarea>
                            <br/>
                            <label>Cena Usługi: </label>
                            <input onChange={handlePriceRepair}/>
                            <p></p>
                            <button type="submit">Zapisz</button>
                            <a onClick={handleUnvisibleForm}>Ukryj</a>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default withFirebase(CarList)

// JSON fetch

// const fetchAllCars = () => {
//     const API = "http://localhost:3000";
//     fetch(`${API}/cars/`)
//         .then(response => response.json())
//         .then(data => setAllCars(data))
//         .catch(error => {
//             console.log(error);
//         });
// }

// useEffect( () => {
//     fetchAllCars()
// },[])

//
// const handleSubmitAddRepair = obj => {
//     setShowAddRepair('none')
//     const API = "http://localhost:3000";
//     const data = {
//         other: [...obj.other, "Data: " + actDate, ...firstAddInput.split(',')],
//         parts: [...obj.parts, "Data: " + actDate, ...secondAddInput.split(',')],
//         price: priceRepair
//     }
//     fetch(`${API}/cars/${obj.id}`, {
//         method: "PATCH",
//         body: JSON.stringify(data),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//         .then(response => {
//             fetchAllCars();
//             ShowMeMoreInfo(obj.id)
//         })
//     setFirstAddInput('')
//     setSecondAddInput('')
//     setPriceRepair('')
// };


// const ShowMeMoreInfo = (props) => {
//     setShowMore('block')
//     const API = "http://localhost:3000";
//     fetch(`${API}/cars/${props}`)
//         .then(response => response.json())
//         .then(data => setMoreInfo(data))
//         .catch(error => {
//             console.log(error);
//         });
// }


// const handleDelete = (props) => {
//     const API = "http://localhost:3000";
//     fetch(`${API}/cars/${props}`, {
//         method: "DELETE"
//     })
//         .then(fetchAllCars)
// }