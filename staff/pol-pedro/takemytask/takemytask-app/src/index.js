import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { HashRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import { context } from 'takemytask-client-logic'

const { REACT_APP_API_URL: API_URL } = process.env

context.API_URL = API_URL
context.storage = sessionStorage

ReactDOM.render(
  <React.StrictMode>
    <Router><App /></Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
