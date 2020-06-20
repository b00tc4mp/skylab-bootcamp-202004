import React, { useState, useEffect } from 'react';
import Register from './register'
import logo from './logo.svg';
import './App.css';
import {Route, withRoute, Redirect, withRouter, BrowserRouter } from 'react-router-dom'
import { isUserAuthenticated } from 'plates-client-logic'

function App ({History}) {
    const [ token, setToken ] = useState()
    const [ view, serView ] = useState()


    useEffect(() =>{
        if(sessionStorage.token)

            try {
                isUserAuthenticated(sessionStorage.token)
                .then(isAuthenticated => {
                    if(isAuthenticated) {
                        setToken(sessionStorage.token)
                    }
                })
                .catch(error => {throw Error})
            } catch (error) {
                if(error) throw error
            }
            else history.push('/login')

    })





}



