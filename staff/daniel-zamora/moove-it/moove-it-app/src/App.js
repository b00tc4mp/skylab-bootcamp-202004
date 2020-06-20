import React, {useState, useEffect} from 'react';
import { Route, withrouter, Redirect} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isUserAuthenticated } from 'moove-it-client-logic'

export default function App({history}) {
  const [token, setToken] = useState()

  useEffect(()=>{
    if(sessionStorage.token)
    try{
      isUserAuthenticated(sessionStorage.token)
        .then(authenticated => {
          if(authenticated) {
            setToken(sessionStorage.token)
          }
        })
        .catch(error => {throw error})
    } catch (error) {
      if(error) throw error
    }
    else history.push('/')
  },[])

}