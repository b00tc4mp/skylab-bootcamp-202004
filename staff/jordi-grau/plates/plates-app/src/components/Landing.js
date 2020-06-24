import React from 'react'
import './Landing.sass'
import landingImage from '../assets/dishes-landing-03.jpg'
import Header from './Header'



export default function ({ onGoToRegister, onGoToLogin }) {
    return <div className="landing">
        <div className="landing__top">
            <div className="landing__item" href="" onClick={onGoToRegister}>Register</div>
            <div className="landing__item" href="" onClick={onGoToLogin}>Login</div>
        </div>
        <div>
            <img src={landingImage} className="landing__image"/>
        </div>
    </div>
}
