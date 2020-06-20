import React from 'react'
import './Container.sass'
import homeIcon from './images/home.svg'
import searchIcon from './images/search.svg'
import messageIcon from './images/message.svg'
import userIcon from './images/user.svg'

export default function ({ children , onGoToHome, onGoToSearch}) {
    return <div className="container">


        {children}

        <nav className="container__footer">
            <img className="container__home"src={homeIcon} onClick={onGoToHome}></img>
            <img className="container__search"src={searchIcon} onClick={onGoToSearch}></img>
            <img className="container__message"src={messageIcon}></img>
            <img className="container__user"src={userIcon}></img>
        </nav>
    </div>
}