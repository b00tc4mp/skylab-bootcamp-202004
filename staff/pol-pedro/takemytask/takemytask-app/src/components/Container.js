import React from 'react'
import './style/Container.sass'
import homeIcon from './style/images/home.svg'
import searchIcon from './style/images/search.svg'
import messageIcon from './style/images/message.svg'
import userIcon from './style/images/user.svg'

export default function ({ children }) {
    return <div className="container">


        {children}

        <nav className="container__footer">
            <img className="container__home"src={homeIcon}></img>
            <img className="container__search"src={searchIcon}></img>
            <img className="container__message"src={messageIcon}></img>
            <img className="container__user"src={userIcon}></img>
        </nav>
    </div>
}