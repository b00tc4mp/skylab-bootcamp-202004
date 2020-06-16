import React, { useState, useEffect } from 'react'
import './Header.sass'
export default function({onBurgerActive, active}) {
    // const [active, setActive] = useState(true)
    // useEffect(() => {
    //     setActive(null)
    // },[])
    return <header class="header">
        <h1 class="header__logo">
            Logo 
        </h1>
        <div className={active /* || onRoute */? 'header__burger' : 'header__burger header__burger--active'} onClick={event => {
            event.preventDefault()
            // let _active = !active
            // setActive(_active)
            onBurgerActive(!active)
            
        }}>
            <div class="header__line"></div>
            <div class="header__line"></div>
            <div class="header__line"></div>
        </div>
    </header>
}