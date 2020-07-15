import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App'
import { HashRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import { context } from 'plates-client-logic'


//const { REACT_APP_API_URL: API_URL} = process.env

context.API_URL =  'http://192.168.0.43:8080'
context.storage = sessionStorage
ReactDom.render(
    <React.StrictMode>
        <Router><App/></Router>
    </React.StrictMode>,
    document.getElementById('root') 
)

serviceWorker.unregister()