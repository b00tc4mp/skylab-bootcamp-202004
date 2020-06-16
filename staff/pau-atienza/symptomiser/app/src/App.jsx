import React, {useState} from 'react'
import './style.sass'
import Landing from './components/Landing'
import SymptomList from './components/SymptomList'
import NavBar from './components/NavBar'
import About from './components/About'
import Results from './components/Results'
import Symptom from './components/Symptom'
import ModifiersForm from './components/ModifiersForm'
import { retrieveTermsByQuery, retrieveTermsById } from 'client-logic'

import { Route, withRouter, Redirect } from 'react-router-dom'

function App({ history }) {
  
  const [results, setResults] = useState(null)
  const [highlightedSymptom, setHighlightedSymptom] = useState(null)

  const symptomQuery = event =>{
    return (async ()=>{
      event.preventDefault()

      const query = event.target.query.value
      const results = await retrieveTermsByQuery(query)
      setResults(results)
      setHighlightedSymptom(null)
      history.push('/results')
    })()
  }

  const retrieveSymptom = id =>{
    return (async ()=>{
      const symptom = await retrieveTermsById(id)

      setHighlightedSymptom(symptom)
    })()
  }

  const submitSymptom = ()=>{
    if(!sessionStorage.submittedSymptoms) sessionStorage.submittedSymptoms = JSON.stringify([])
    
    let newSymptomList = JSON.parse(sessionStorage.submittedSymptoms)
    newSymptomList.push(highlightedSymptom.term)
    sessionStorage.submittedSymptoms = JSON.stringify(newSymptomList)
    history.push('./symptomlist')
  }

  const goToSymptom = ()=>{
    history.push('/symptom')
  }

  const goToDetails = symptomName=>{
    const symptom = JSON.parse(sessionStorage.submittedSymptoms).find(item=>item.name===symptomName)

    setHighlightedSymptom(symptom)
    history.push('/details')
  }
  
  return<div className="App">
    <Route exact path="/" render={() => <Landing onSubmit = {symptomQuery}/>} />
    {history.location.pathname !== '/' && <NavBar>
      <Route exact path="/symptomlist" render={() => <SymptomList symptomList = {JSON.parse(sessionStorage.submittedSymptoms)} goToDetails = {goToDetails}/>} />
      <Route exact path="/results" render={() => <Results results = {results} onClick = {retrieveSymptom} clickedSymptom = {highlightedSymptom} goToSymptom = {goToSymptom}/>} />
      <Route exact path="/about" render={() => <About/>} />
      <Route exact path="/symptom" render={() => <Symptom symptom = {highlightedSymptom} goToSymptom = {retrieveSymptom} submitSymptom = {submitSymptom}/>} />
      <Route exact path="/details" render={() => <ModifiersForm symptom = {highlightedSymptom}  goToSymptom = {retrieveSymptom} submitSymptom = {submitSymptom}/>} />
    </NavBar>}
  </div>
  
}
export default withRouter(App)
