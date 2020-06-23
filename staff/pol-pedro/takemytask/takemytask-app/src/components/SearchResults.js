
import React, {useState, useEffect} from 'react'
import './SearchResults.sass'
import profileFoto from './images/Foto-de-Perfil-en-WhatsApp-696x364.jpg'

export default function SearchResults({results, onGoToWorker}) {

    return <ul className="results">
        {results && results.map( element => {
            return <li className="results__container" onClick={ () => onGoToWorker(element.id)}>
                        <div className="results__foto"></div>
                        <h1 className="results__name">{`${element.name} ${element.surname}`}</h1>
                        <p className="results__description">{`${element.presentation}`}</p>
                        <div className="results__pricing"><p>$ {`${element.pricingHour}`}</p></div>
                </li>
        })}
    </ul>
}