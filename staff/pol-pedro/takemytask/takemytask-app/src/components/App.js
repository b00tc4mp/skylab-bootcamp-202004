import React, { useState, useEffect } from 'react'
// import './App.css'
import Container from './Container'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Search from './Search'
import Worker from './Worker'
import Chats from './Chats'
import Chat from './Chat'
import User from './User'
import {isUserAuthenticated, isUserLogin, retriveChats, logoutUser} from 'takemytask-client-logic'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { userTransition, animated} from 'react-spring'

function App({history}) {

  const [userName, setUserName] = useState()
  const [role, setRole] = useState()
  const [searchQuerry, setSearchQuerry] = useState()
  const [workerId, setWorkerId] = useState ()
  const [mesageToRead, setMesageToRead] = useState()
  const [mesageReaded, setMesageReaded] = useState(0)
  const [chatId, setChatId] = useState()
  const [userId, setUserId] = useState()
  const [footerState, setFooterState]= useState('home')
  
  useEffect ( () => {
    if(isUserLogin){
      try{

        isUserAuthenticated()
          .then( reslut => {
            let {name, role, _id} = reslut
            if(name){
              setUserName(name)
            }
            if (role){
              setRole(role)
            }
            if(_id){
              setUserId(_id)
            }
          })
          .catch( error => {throw error})

      }catch(error){
        throw error
      }
    }else{
      setFooterState('home')
      history.push('/')
    }
  }, [])

  const handleRegister = () => history.push('/login')

  const handleGoToRegister = () => {
    history.push('./register')
  }

  const handleGoToLogin = () => history.push('/login')

  const handelGoToHome = () => {
    setFooterState('home')
    history.push('/')
  }

  const handelGoToSearch = () => {
    setFooterState('search')
    history.push('/search')
  }

  const handelGoToChat = () => {
    setFooterState('chat')
    history.push('/chats')
  }

  const handelGoToUser = () => {
    setFooterState('user')
    if(userName){
      history.push('/profile')
    }else{
      history.push('/login')
    }
  }

  const handelGoToWorker = (id) => { 
    if(userName){
        setWorkerId(id)
        history.push('/worker-profile')
    }else{
        history.push('/login')
    }
  }

  const handleLogin = () => {
    setFooterState('home')
     history.push('/')

    try{

      isUserAuthenticated()
        .then( ({name, role, _id}) => {
          if(name){
            setUserName(name)
          }
          if(role){
            setRole(role)
          }
          if(_id){
              setUserId(_id)
          }
        })
        .catch( error => {throw error})

    }catch(error){
      throw error
    }

  }

  const handelLogout = () => {
    setFooterState('home')
    logoutUser()
    setUserName('')
    history.push('/')
  }

  const handelSearcher = (query) => {
    setFooterState('search')
    setSearchQuerry(query)
    history.push('/search')
  }

  const handelBackToSearch = () => {
    history.push('/search')
  }

  const handelReadedMesages = () => {
    if(userName){
      setMesageReaded(mesageToRead)
    }else{
      history.push('/login')
    }
  }

  const handelOnChat = (id) => {
    setFooterState('chat')
    setChatId(id)
    history.push('/chat')
  }

useEffect (() => {
    const interval = setInterval(() => {
      try {
        retriveChats()
            .then( body =>{
                let cont = 0
                body.map(elem => {
                    for(var i in elem.messages){
                      cont ++
                    }
                })
                setMesageToRead(cont)
            }) 
            .catch(error =>  Error(error.message))
      }catch({message}){
          throw new Error(message)
      }
    }, 1000)

    return () => clearInterval(interval)
})


  return (
    <div className="App">
        <Container onGoToHome={handelGoToHome} onGoToSearch={handelGoToSearch} onGoToChat={handelGoToChat} messageToRead={mesageToRead} messageReaded={mesageReaded} onGoToUser={handelGoToUser} footerState={footerState}>

          <Route exact path="/" render={() => <Home onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} userName={userName} onRegister={handleRegister} onSearcher={handelSearcher}/>} />

          <Route path="/register" render={() =>
            isUserLogin() ? <Redirect to="/" /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} onGoToHome={handelGoToHome}/>
          } />

          <Route path="/login" render={() =>
            isUserLogin() ? <Redirect to="/" /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} onGoToHome={handelGoToHome}/>
          } />

          <Route path="/search" render={() =>
            <Search query={searchQuerry} userName={userName} onGoToLogin={handleGoToLogin} onSearcher={handelSearcher} onGoToWorker={handelGoToWorker}/>
          } />

          <Route path="/worker-profile" render={() =>
            <Worker workerId={workerId} onSearcher={handelBackToSearch} OnChat={handelOnChat}/>
          } />

          <Route path="/chats" render={() =>
            <Chats userName={userName} role={role} onChats={handelReadedMesages} OnChat={handelOnChat}/>
          } />

          <Route path="/chat" render={() =>
              <Chat userName={userName} chatId={chatId} userId={userId} onGoToChat={handelGoToChat}/>
          } />

          <Route path="/profile" render={() =>
              <User role={role} onLogout={handelLogout}/>
          } />
        </Container>
        

    </div>
  )
}

export default withRouter(App)
