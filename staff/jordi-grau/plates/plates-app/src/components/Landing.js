import React from 'react'
import './Landing.sass'
import landingImage from '../assets/dishes-landing-03.jpg'
import Header from './Header'

export default function() {
    return <div className="landing">
        <div className="landing__top">
            <div className="landing__item" href="" onClick={onGotoRegister}>Register</div>
            <div className="landing__item" href="" onClick={onGotoLogin}>Login</div>
        </div>
        <div src={landingImage} className="landing__image"></div>
    </div>
}
