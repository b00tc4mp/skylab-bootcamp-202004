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
      storeQuery(query)
      const results = await retrieveTermsByQuery(query)
      storeResults(results)

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
    const {term: {HPO_id, name}} = highlightedSymptom
    newSymptomList.push({term: {HPO_id, name}})
    sessionStorage.submittedSymptoms = JSON.stringify(newSymptomList)
    history.push('./symptomlist')
  }

  const goToSymptom = ()=>{
    history.push('/symptom')
  }

  const goToDetails = symptomName=>{
    const symptom = JSON.parse(sessionStorage.submittedSymptoms).find(item=>item.term.name===symptomName)
    sessionStorage.symptomToModify = JSON.stringify(symptom)
    history.push('/details')
  }

  const createWrittenSymptom = symptom=>{
    let symptomString = ''
    const [keys, values] = [Object.keys(symptom), Object.values(symptom)]

    keys.forEach(key =>{
      switch(key){
        case 'term':
          symptomString += `Term: ${symptom[key].HPO_id}: ${symptom[key].name}`

          break
        case 'modifiers':
          symptomString += ', Modifiers: '

          symptom[key].forEach(modifier => symptomString += ` ${modifier.HPO_id}: ${modifier.name}` )
          break
        case 'comments':
          symptomString += `, Comments: ${symptom[key]}`

          break
      }
    })
    return symptomString
  }
  
  const saveModifiedSymptom = event =>{
    event.preventDefault()

    const comments = event.target.form.comment.value
    const symptomToModify = JSON.parse(sessionStorage.symptomToModify)
    symptomToModify.comments = comments
    sessionStorage.symptomToModify = JSON.stringify(symptomToModify)

    const submittedSymptoms = JSON.parse(sessionStorage.submittedSymptoms)
    const symptomIndex = submittedSymptoms.findIndex(item=>item.term.name===symptomToModify.term.name)
    submittedSymptoms[symptomIndex] = symptomToModify

    sessionStorage.submittedSymptoms = JSON.stringify(submittedSymptoms)
    history.push('symptomlist')
  }

  return<div className="App">
    <Route exact path="/" render={() => <Landing onSubmit = {symptomQuery}/>} />
    {history.location.pathname !== '/' && <NavBar history = {history}>
      <Route exact path="/symptomlist" render={() => <SymptomList symptomList = {sessionStorage.submittedSymptoms?JSON.parse(sessionStorage.submittedSymptoms):null} goToDetails = {goToDetails} createWrittenSymptom = {createWrittenSymptom}/>} />
      <Route exact path="/results" render={() => <Results results = {results} onClick = {retrieveSymptom} clickedSymptom = {highlightedSymptom} goToSymptom = {goToSymptom}/>} />
      <Route exact path="/about" render={() => <About/>} />
      <Route exact path="/symptom" render={() => <Symptom symptom = {highlightedSymptom} goToSymptom = {retrieveSymptom} submitSymptom = {submitSymptom}/>} />
      <Route exact path="/details" render={() => <ModifiersForm symptom = {sessionStorage.symptomToModify? JSON.parse(sessionStorage.symptomToModify):null} createWrittenSymptom = {createWrittenSymptom} saveModifiedSymptom = {saveModifiedSymptom}/>} />
    </NavBar>}
  </div>
  
}
export default withRouter(App)
