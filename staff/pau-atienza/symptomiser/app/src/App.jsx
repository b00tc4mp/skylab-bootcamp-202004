import React, {useState} from 'react'
import './style.sass'
import Landing from './components/Landing'
import SymptomList from './components/SymptomList'
import NavBar from './components/NavBar'
import About from './components/About'
import Results from './components/Results'
import Symptom from './components/Symptom'
import ModifiersForm from './components/ModifiersForm'
import { retrieveTermsByQuery, retrieveTermsById, savePredictorInput, savePredictorOutput, saveNavigationClick, registerSymptom, 
  updateSymptom, saveSymptom,setSymptomToModify } from 'client-logic'

import { Route, withRouter } from 'react-router-dom'

function App({ history }) {
  
  const [results, setResults] = useState(sessionStorage.navigation && JSON.parse(sessionStorage.navigation).predictorOutput?JSON.parse(sessionStorage.navigation).predictorOutput:null)
  const [highlightedSymptom, setHighlightedSymptom] = useState(null)

  const symptomQuery = async event =>{
      event.preventDefault()

      const query = event.target.query.value
      savePredictorInput(query)
      const results = await retrieveTermsByQuery(query)
      const predictorOutput = savePredictorOutput(results)
      setResults(predictorOutput)
      setHighlightedSymptom(null)
      history.push('/results')
  }

  const retrieveSymptom = async id =>{
      const symptom = await retrieveTermsById(id)

      const {term: {HPO_id}} = symptom
      saveNavigationClick(HPO_id)
      setHighlightedSymptom(symptom)
  }

  const submitSymptom = async confidenceLevel=>{
    const {term: {HPO_id, name}} = highlightedSymptom

    const {id: symptomId} = await registerSymptom(HPO_id, name, confidenceLevel)
    saveSymptom(HPO_id, name, confidenceLevel, symptomId)
    history.push('./symptomlist')
  }

  
  const goToSymptom = ()=>{
    history.push('/symptom')
  }

  const goToSymptomList = ()=>{
    history.push('/symptomlist')
  }

  const goToDetails = symptomName=>{
    setSymptomToModify(symptomName)

    history.push('/details')
  }
  
  const saveModifiedSymptom = event =>{
    event.preventDefault()

    const comments = event.target.form.comment.value

    updateSymptom(comments)

    history.push('symptomlist')
  }

  return<div className="App">
    <Route exact path="/" render={() => <Landing onSubmit = {symptomQuery}/>} />
    {history.location.pathname !== '/' && <NavBar history = {history}>
      <Route exact path="/symptomlist" render={() => <SymptomList symptomList = {sessionStorage.submittedSymptoms?JSON.parse(sessionStorage.submittedSymptoms):null} goToDetails = {goToDetails} onDelete = {goToSymptomList}/>} />
      <Route exact path="/results" render={() => <Results results = {results} onClick = {retrieveSymptom} clickedSymptom = {highlightedSymptom} goToSymptom = {goToSymptom}/>} />
      <Route exact path="/about" render={() => <About/>} />
      <Route exact path="/symptom" render={() => <Symptom symptom = {highlightedSymptom} goToSymptom = {retrieveSymptom} submitSymptom = {submitSymptom}/>} />
      <Route exact path="/details" render={() => <ModifiersForm symptom = {sessionStorage.symptomToModify? JSON.parse(sessionStorage.symptomToModify):null} saveModifiedSymptom = {saveModifiedSymptom} onModifierSubmission = {goToDetails}/>} />
    </NavBar>}
  </div>
  
}
export default withRouter(App)
