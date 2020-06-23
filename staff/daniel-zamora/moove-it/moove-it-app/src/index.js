import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { HashRouter as Router } from 'react-router-dom'
import { context } from 'moove-it-client-logic'
import FloorPlan from './components/FloorPlan'


const { REACT_APP_API_URL: API_URL } = process.env

context.API_URL = API_URL
context.storage = sessionStorage


ReactDOM.render( 
<React.StrictMode>
<Router><FloorPlan/></Router> 
</React.StrictMode>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();