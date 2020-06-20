import React, {useState, useEffect} from 'react'
import './Search.sass'
import Feedback from './Feedback'
import SerachResults from './SearchResults'
import {retriveUser} from 'takemytask-client-logic'
import back from './images/back.svg'


export default function Register({workerId}) {
    const [searchId, setSearchId] = useState(workerId)
    const [error, setError] = useState('')
    const [results, setResults] = useState('')

    useEffect ( () => {
        if(searchId){
            try {
                retriveUser(searchId)
                    .then( body => setResults(body)) 
                    .catch(error => setError(error.message))
            }catch({message}){
                setError(message)
            }
        }
      }, [])

    return <section className="profile"> 
            <div className="profile__images"></div>
            <div className="profile__top">
                <div className="profile__nameRating">
                    <div className="profile__ratings">

                    </div>
                    <h1>{results.name}</h1>
                </div>
                <h3>{results.surname}</h3>

                <div className="profile__contract"><h2>${results.pricingHour}/hr</h2><h3>Contract me</h3></div>
            </div>
            <div className="profile__mid">
                <h2>Description</h2>
                <p>{results.description}</p>
                <div className="profile__direction">
                    <div className="profile__adress">
                        <h3>{results.adress}</h3>
                    </div>
                    <h2>Up to: {results.workingDistance}Km</h2>
                </div>
            </div>

            <ul className="profile__ratings">
                {results.ratesWorker && results.ratesWorker.map( element => {
                    return <li className="profile__container" >
                                <div className="profile__foto"></div>
                                <h1 className="profile__name">{`${element.name} ${element.surname}`}</h1>
                                <p className="profile__description">{`${element.description}`}</p>
                                <div className="profile__pricing"><p>$ {`${element.pricingHour}`}</p></div>
                        </li>
                })}
            </ul>
            <fomr>
            <input type="textarea" name="coment" placeholder="Give your opinion about this worker" maxLength="150"/>
            </fomr>
            <ul className="profile__coments">
                {results.comentsWorker && results.comentsWorker.map( element => {
                    return <li className="profile__container" >
                                <h1 className="profile__name">{element.userId}</h1>
                                <p className="profile__description">{element.text}</p>
                                <div className="profile__date"><p>{element.date}</p></div>
                        </li>
                })}
            </ul>
            {error && <Feedback message={error} level="error" />}
        </section>
}