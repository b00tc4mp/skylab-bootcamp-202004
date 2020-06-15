import React from 'react';
// import logo from './logo.svg';
import './style.sass'
// import React, { useState, useEffect } from 'react'
import Landing from './components/Landing'
import SymptomList from './components/SymptomList'
import NavBar from './components/NavBar'
import About from './components/About'

import { Route, withRouter, Redirect } from 'react-router-dom'

function App() {
  
  return<div className="App">
    <Route exact path="/" render={() => <Landing />} />
    <NavBar>
      <Route exact path="/symptomlist" render={() => <SymptomList symptomList = {undefined} />} />
      <Route exact path="/about" render={() => <About/>} />
    </NavBar>
  </div>
  
}
export default withRouter(App)
