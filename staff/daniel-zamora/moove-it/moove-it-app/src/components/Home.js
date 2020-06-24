import React, { useState, useEffect } from 'react';
import { retrieveUser } from 'moove-it-client-logic';
import './Home.sass'
import logo from '../images/animated-plane-v4-name&shadow.png'
import logoutIcon from '../images/log-out.png';
import {createBlueprint, retrieveUserBlueprints} from 'moove-it-client-logic'
import moment from 'moment';
import { context } from "moove-it-client-logic"

context.actualBlueprint = {};

export default function Home({blueprint, onGoToFloorPlan, onLogout}) {
    const [error, setError] = useState()
    const [name, setName] = useState()
    const [userBlueprints, setUserBlueprints] = useState([])

    useEffect(() => {
        try {
            retrieveUser()
                .then(user => setName(user.name))
                .catch(error => setError(error.message))
            retrieveUserBlueprints()
                .then(blueprints => setUserBlueprints(blueprints))
                .catch(error => setError(error.message))
        } catch(error) {
            throw error
        }
    },[])


    const handlePlaneInit = e =>{
        e.preventDefault()

        let { name, width, height } = e.target

        name = name.value
        width = width.value
        height = height.value
        blueprint = {name: name, width: width, height: height}

        try {
            debugger
            createBlueprint(name, width,height)
                .then(id => onGoToFloorPlan(id))
                .catch(error => setError(error.message))
        } catch(error){
            setError(error.message)
        }
    }

    const handleLogout = (e) =>{
        sessionStorage.clear()
        setName()
        onLogout()
    }



    return <section className="home">
            <nav className="home__nav">
                <div className="home__logo">
                    <img src={logo}/>
                </div>
                <a className="home__user" >
                    <img onClick={handleLogout} src={logoutIcon}/>Logout
                </a>
            </nav>
            <h2 className="home__salute">Nice to see you again, {name}</h2>
            <h4 className="home__title">Create your next layout</h4>
            <form onSubmit={handlePlaneInit} className='home__form'>
                <input className="home__input" name="name" type="text" placeholder="blueprint name"/>
                <input className="home__input" name="width" type="number"  placeholder="width in metters"></input>
                <input className="home__input" name="height" type="number" placeholder="height in metters"></input>
                <button >Start</button>
            </form>
            <div className="home__line">
            <hr></hr>
            </div>
            <div className="home__collection">
                <h4 className='home__title'>Your last blueprints</h4>
                <ul className="home__list">{userBlueprints.map(({id, name, width, height, date})=> {
                    date = moment(date).format("DD/MM/YYYY")
                    return <li key={id}><a onClick={()=>onGoToFloorPlan(id)}>{`Name: ${name}, Width: ${width}, Height: ${height} created on: ${date}`}</a></li>
                })}</ul> 
            </div>
    </section>

}