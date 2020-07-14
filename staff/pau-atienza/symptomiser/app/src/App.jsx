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
  updateSymptom, saveSymptom, setSymptomToModify, retrieveResultsFromStorage } from 'client-logic'

import { Route, withRouter } from 'react-router-dom'
import { useEffect } from 'react'

function App({ history }) {
  
  const [results, setResults] = useState(null)
  const [highlightedSymptom, setHighlightedSymptom] = useState(null)
  const [feedback, setFeedback] = useState(null)

  useEffect(()=>{
    try{
      setResults(retrieveResultsFromStorage())

    }catch(error){
      const { message } = error

      setFeedback({level: "error", message})
    }
  }, [])

  const symptomQuery = async event =>{
    event.preventDefault()

    const query = event.target.query.value
    try{
      savePredictorInput(query)
  
      const results = await retrieveTermsByQuery(query)

      const predictorOutput = savePredictorOutput(results)

      setResults(predictorOutput)
      setHighlightedSymptom(null)
      history.push('/results')
    }catch(error){
      const { message } = error

      setFeedback({level: "error", message})
    }
  }

  const retrieveSymptom = async id =>{
    try{
      const symptom = await retrieveTermsById(id)

      const {term: {HPO_id}} = symptom
      saveNavigationClick(HPO_id)
      setHighlightedSymptom(symptom)
    }catch(error){
      const { message } = error

      setFeedback({level: "error", message})
    }
  }

  const submitSymptom = async confidenceLevel=>{
    try{
      const {term: {HPO_id, name}} = highlightedSymptom
  
      const {id: symptomId} = await registerSymptom(HPO_id, name, confidenceLevel)
      saveSymptom(HPO_id, name, confidenceLevel, symptomId)
  
      history.push('./symptomlist')
      setFeedback({ level: "success", message: "Your symptom was successfully submitted"})
    }catch(error){
      const { message } = error

      setFeedback({level: "error", message})
    }
  }

  
  const goToSymptom = ()=>{
    history.push('/symptom')
  }

  const goToDetails = symptomName=>{
    setFeedback(null)
    setSymptomToModify(symptomName)

    history.push('/details')
  }
  
  const saveModifiedSymptom = async event =>{
    event.preventDefault()

    const comments = event.target.form.comment.value
    try{
      await updateSymptom(comments)
  
      history.push('/symptomlist')
      setFeedback({ level: "success", message: "The changes were saved"})
    }catch(error){
      const { message } = error

      setFeedback({level: "error", message})
    }
  }

  const  clearFeedback = ()=>{
    setFeedback(null)
  }

  return<div className="App">
    <Route exact path="/" render={() => <Landing feedback = {feedback} onSubmit = {symptomQuery}/>} />
    {history.location.pathname !== '/' && <NavBar history = {history} clearFeedback = {clearFeedback}>
      <Route exact path="/symptomlist" render={() => <SymptomList feedback = {feedback} goToDetails = {goToDetails}/>} />
      <Route exact path="/results" render={() => <Results feedback = {feedback} results = {results} onClick = {retrieveSymptom} clickedSymptom = {highlightedSymptom} goToSymptom = {goToSymptom}/>} />
      <Route exact path="/about" render={() => <About/>} />
      <Route exact path="/symptom" render={() => <Symptom symptom = {highlightedSymptom} goToSymptom = {retrieveSymptom} submitSymptom = {submitSymptom}/>} />
      <Route exact path="/details" render={() => <ModifiersForm feedback = {feedback} saveModifiedSymptom = {saveModifiedSymptom}/>} />
    </NavBar>}
  </div>
  
}
export default withRouter(App)
