import logo from '../logo.svg'
import React from 'react';

function Landing({goToRegister, goToLogin}){
    return <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a 
      onClick = {(event)=>{event.preventDefault(); goToRegister(event)}}
      className="App-link"
      href=""
    >
      Register
    </a>
    <a 
      onClick = {(event)=>{event.preventDefault(); goToLogin(event)}}
      className="App-link"
      href=""
    >
      Login
    </a>
  </header>
}

export default Landing;


