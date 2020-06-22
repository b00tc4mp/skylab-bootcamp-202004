import React, { useState, useEffect } from 'react';
import { retrieveUser } from 'moove-it-client-logic';
import './Home.sass'
import logo from '../images/animated-plane-v4-name&shadow.png'
import userLogo from '../images/user-icon.png';

export default function Home() {
    // const [name, setName] = useState()

    // useEffect(() => {
    //     try {
    //         retrieveUser()
    //             .then(user => setName(user.name))
    //     } catch(error) {
    //         throw error
    //     }
    // },[])

    return <secction className="home">
            <nav className="home__nav">
                <div className="home__logo">
                    <img src={logo}></img>
                </div>
                <div className="home__user">
                    <img src={userLogo}></img>
                </div>
            </nav>
            <h2 className="home__salute">Nice to see you again, Daniel</h2>

            <h4 className="home__title">Create your next layout</h4>
            <form className='home__form'>
                <input className="home__input" name="name" type="text" placeholder="blueprint name"></input>
                <input className="home__input" name="width" type="number"  placeholder="width"></input>
                <input className="home__input" name="height" type="number" placeholder="height"></input>
            </form>
            <div className="home__line">
            <hr></hr>
            </div>
            <div className="home__collection">
                <h4 className='home__title'>Your last blueprints</h4>
                <ul className="home__list">
                    <li>Blueprint 1</li>
                    <li>Blueprint 2</li>
                    <li>Blueprint 3</li>
                    <li>Blueprint 4</li>
                </ul>
            </div>
    </secction>

}