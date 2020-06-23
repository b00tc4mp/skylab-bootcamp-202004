import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './Container.sass'
import homeIcon from './images/home.svg'
import searchIcon from './images/search.svg'
import messageIcon from './images/message.svg'
import userIcon from './images/user.svg'
import homeIconActive from './images/home--active.svg'
import searchIconActive from './images/search--active.svg'
import messageIconActive from './images/message--active.svg'
import userIconActive from './images/user--active.svg'
export default function ({ children , onGoToHome, onGoToSearch, onGoToChat, messageToRead, messageReaded, onGoToUser, footerState}) {
    return <div className="container">


        {children}
        <Switch>
              <Route exact path='/chat'render={()=>{}}/>
              <Route path='/'  render={()=>{
                  return <nav className="container__footer">
                        {footerState !='home' &&<img className="container__home"src={homeIcon} onClick={onGoToHome}></img>}
                        {footerState==='home' && <img className="container__home"src={homeIconActive} onClick={onGoToHome}></img>}
                        {footerState !='search' && <img className="container__search"src={searchIcon} onClick={onGoToSearch}></img>}
                        {footerState==='search' && <img className="container__search"src={searchIconActive} onClick={onGoToSearch}></img>}
                        <div className="container__chat">
                            {(messageToRead - messageReaded) != 0 && !Number.isNaN((messageToRead - messageReaded)) &&<div className="container__notification">
                                <p>{messageToRead - messageReaded}</p>
                            </div>}
                            {footerState === 'chat' && <img className="container__message"src={messageIconActive} onClick={onGoToChat}></img>}
                            {footerState !='chat' && <img className="container__message"src={messageIcon} onClick={onGoToChat}></img>}
                        </div>
                        {footerState==='user' && <img className="container__user"src={userIconActive} onClick={onGoToUser}></img>}
                        {footerState !='user' && <img className="container__user"src={userIcon} onClick={onGoToUser}></img>}
                    </nav>
              }} />
        </Switch>
    </div>
}