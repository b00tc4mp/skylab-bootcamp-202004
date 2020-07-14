import React, { useState, useEffect } from 'react'
import './Header.sass'
import {retrieveEstablishment} from 'qrmenu-client-logic'

export default function({onBurgerActive, active}) {
    const [establishment, setEstablishment] = useState()

    useEffect(() => {
        retrieveEstablishment(sessionStorage.token)
        .then(_establishment => setEstablishment(_establishment) )
    },[])

    return <header class="header">
        <h1 class="header__logo">
            {establishment}
        </h1>
        <div className={active ? 'header__burger' : 'header__burger header__burger--active'} onClick={event => {
            event.preventDefault()
            
            onBurgerActive(!active)
            
        }}>
            <div class="header__line"></div>
            <div class="header__line"></div>
            <div class="header__line"></div>
        </div>
    </header>
}