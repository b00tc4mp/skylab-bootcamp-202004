import React, {useState} from 'react';
// import logo from './logo.svg';
import './style.sass'
import Landing from './components/Landing'
import SymptomList from './components/SymptomList'
import NavBar from './components/NavBar'
import About from './components/About'
import Results from './components/Results';
import { retrieveTermsByQuery, retrieveTermsById } from 'client-logic'

import { Route, withRouter, Redirect } from 'react-router-dom'

function App({ history }) {
  
  const [results, setResults] = useState(null)
  const [symptomList, setSymptomList] = useState(null)
  const [highlightedSymptom, setHighlightedSymptom] = useState(null)

  const symptomQuery = event =>{
    return (async ()=>{
      event.preventDefault()
      const query = event.target.query.value
      const results = await retrieveTermsByQuery(query)
      setResults(results)
      history.push('/results')
    })()
  }

  const retrieveSymptom = id =>{
    return (async ()=>{
      const symptom = await retrieveTermsById(id)
      setHighlightedSymptom(symptom)
      history.push('/results')
    })()
  }

  const goToSymptom = ()=>{
    history.push('/symptom')
  }
  
  return<div className="App">
    <Route exact path="/" render={() => <Landing onSubmit = {symptomQuery}/>} />
    <NavBar>
      <Route exact path="/symptomlist" render={() => <SymptomList symptomList = {symptomList} />} />
      <Route exact path="/results" render={() => <Results results = {results} onClick = {retrieveSymptom} clickedSymptom = {highlightedSymptom} goToSymptom = {goToSymptom}/>} />
      <Route exact path="/about" render={() => <About/>} />
      {/* <Route exact path="/symptom" render={() => <Symptom symptom = {highlightedSymptom}/>} /> */}
    </NavBar>
  </div>
  
}
export default withRouter(App)
