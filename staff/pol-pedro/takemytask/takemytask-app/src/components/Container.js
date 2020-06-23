import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './Container.sass'
import homeIcon from './images/home.svg'
import searchIcon from './images/search.svg'
import messageIcon from './images/message.svg'
import userIcon from './images/user.svg'

export default function ({ children , onGoToHome, onGoToSearch, onGoToChat, messageToRead, messageReaded, onGoToUser}) {
    return <div className="container">


        {children}
        <Switch>
              <Route exact path='/chat'render={()=>{}}/>
              <Route path='/'  render={()=>{
                  return <nav className="container__footer">
                        <img className="container__home"src={homeIcon} onClick={onGoToHome}></img>
                        <img className="container__search"src={searchIcon} onClick={onGoToSearch}></img>
                        <div className="container__chat">
                            {(messageToRead - messageReaded) != 0 && !Number.isNaN((messageToRead - messageReaded)) &&<div className="container__notification">
                                <p>{messageToRead - messageReaded}</p>
                            </div>}
                            <img className="container__message"src={messageIcon} onClick={onGoToChat}></img>
                        </div>
                        <img className="container__user"src={userIcon} onClick={onGoToUser}></img>
                    </nav>
              }} />
        </Switch>
    </div>
}