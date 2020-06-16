import React, { useState } from 'react'
import './Header.sass'
export default function({onBurguerActive}) {
    const [active, setActive] = useState()

    return <header class="header">
        <h1 class="header__logo">
            Logo 
        </h1>
        <div className={active? 'header__burger' : 'header__burger header__burger--active'} onClick={event => {
            event.preventDefault()
            let _active = !active
            setActive(_active)
            onBurguerActive(_active)
        }}>
            <div class="header__line"></div>
            <div class="header__line"></div>
            <div class="header__line"></div>
        </div>
    </header>
}