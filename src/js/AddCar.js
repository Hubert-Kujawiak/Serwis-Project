import React,{useState,useEffect} from 'react'
import CarList from "./CarList";

export default function AddCar() {

    const [mark, setMark] = useState('')
    const [model, setModel] = useState('')
    const [body, setBody] = useState('Hatchback')
    const [fuel, setFuel] = useState('Benzyna')
    const [power, setPower] = useState('')
    const [vin, setVin] = useState('')
    const [numbRej, setNumbRej] = useState('')
    const [date, setDate] = useState('')
    const [price, setPrice] = useState('')

    //addRepairList
    const [repairList, setRepairList] = useState('')
    const [tabRepList, setTabRepList] = useState([])

    //addPartsList
    const [partsAddList, setPartsAddList] = useState('')
    const [tabPartList, setTabPartList] = useState([])

    const [error, setError] = useState([])


    const handleMark = (event) => {
        if(event.target.value.length <= 2){
            setError('Nazwa za krótka !')
        }else{
            setMark(event.target.value)
            setError([])
        }
    }
    const handleModel = (event) => {
        if(event.target.value.length <= 2){
            setError('Nazwa modelu za krótka !')
        }else{
            setModel(event.target.value)
            setError([])
        }
    }
    const handleBody = (event) => {
        setBody(event.target.value)
    }
    const handleFuel = (event) => {
        setFuel(event.target.value)
    }
    const handlePower = (event) => {
        if(event.target.value <= '0'){
            setError('Nieprawidłowa moc silnika !')
        }else{
            setPower(event.target.value)
            setError([])
        }
    }
    const handleVinNum = (event) => {
        if(event.target.value <= '0' ){
            setError('Nieprawidłowy przebieg !')
        }else{
            setVin(event.target.value)
            setError([])
        }
    }
    const handleRejNum = (event) => {
        if(event.target.value.length < 7 || event.target.value.length > 9 ){
            setError('Nieprawidłowy num. rejestracyjny !')
        }else{
            setNumbRej(event.target.value)
            setError([])
        }
    }
    const handleDate = (event) => {
        if(event.target.value.length === 10 ){
            setDate(event.target.value)
            setError([])
        }else{
            setError('Nieprawidłowa data !')
        }
    }
    const handlePrice = (event) => {
        setPrice(event.target.value)
    }

    const handleListRep = (event) => {
        setRepairList(event.target.value)
    }
    const handleAddRep = (event) => {
        setRepairList('')
        event.preventDefault()
        setTabRepList(prev => [...prev, repairList])
    }
    const handlePartsList = (event) => {
        setPartsAddList(event.target.value)
    }
    const handleAddPartsList = (event) => {
        setPartsAddList('')
        event.preventDefault()
        setTabPartList(prev => [...prev, partsAddList])
    }

    const handleSubmit = (event) => {
        const cars = {
            id: '',
            mark: mark,
            model: model,
            body: body,
            fuel: fuel,
            power: power,
            vin: vin,
            numRej: numbRej,
            date: date,
            other: tabRepList,
            parts: tabPartList,
            price: price
        };

        const API = "http://localhost:3000";
        fetch(`${API}/cars/`, {
            method: "POST",
            body: JSON.stringify(cars),
            headers: {
                "Content-Type": "application/json"
            }
        })
            // .then(response => props.fetchAllRequest())
    }

    return (
        <>
            <div className="all">
                <div className="addCar">
                    <form className="formAddCar" onSubmit={handleSubmit}>
                        <h1 className="errorMessage">{error}</h1>
                        <label className="markCar">Marka:
                            <input type="text" onChange={handleMark}/>
                        </label>
                        <label>Model:
                            <input type="text" onChange={handleModel}/>
                        </label>
                        <p></p>
                        <label>Moc silnika:
                            <input type="number" onChange={handlePower}/>
                        </label>
                        <label>Przebieg:
                            <input type="number" onChange={handleVinNum}/>
                        </label>
                        <p></p>
                        <label> Numer Rej:
                            <input type="text" onChange={handleRejNum}/>
                        </label>
                        <label>Data Serwisu:
                            <input placeholder="DD.MM.RRRR" onChange={handleDate}/>
                        </label>
                        <div className="selectOption">
                            <label htmlFor="car">Nadwozie: </label>
                            <select id="car" onChange={handleBody}>
                                <option>Hatchback</option>
                                <option>Kombi</option>
                                <option>Sedan</option>
                            </select>
                            <div>
                                <label>Paliwo:</label>
                                <select onChange={handleFuel}>
                                    <option>Benzyna</option>
                                    <option>Diesel</option>
                                    <option>Benzyna + LPG</option>
                                    <option>Electric</option>
                                    <option>Hybrid</option>
                                </select>
                            </div>
                        </div>
                        <p></p>
                        <div className="allAddList">
                            <div className="firstAddList">
                                <label>Wykonane naprawy:
                                    <input type="text" onChange={handleListRep} value={repairList}/>
                                    <button className="buttonPlus" onClick={handleAddRep}>+</button>
                                </label>
                                <ul>
                                    {
                                        tabRepList.map( elem => (
                                            <li className="listElem">{elem}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="secondAddList">
                                <label>Wymienione części:
                                    <input type="text" onChange={handlePartsList} value={partsAddList}/>
                                    <button className="buttonPlus" onClick={handleAddPartsList}>+</button>
                                </label>
                                <ul>
                                    {
                                        tabPartList.map( elem => (
                                            <li className="listElem">{elem}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <label>Cena Usługi:
                            <input onChange={handlePrice}/>
                        </label>
                        <button type="submit" className="submitButton">Dodaj!</button>
                    </form>
                </div>
            </div>
        </>
    )

}