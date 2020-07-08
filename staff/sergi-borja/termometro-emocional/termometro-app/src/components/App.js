import React, { useState, useEffect } from 'react'
import './App.sass';
import { Route, withRouter, Redirect } from 'react-router-dom'
import Container from './Container';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import MyFamily from './MyFamily';
import Footer from './Footer'
import {retrieveUser} from 'termometro-client-logic'
import CreateMember from './CreateMember';
import EditMember from './EditMember';
import SetMood from './SetMood';
import Settings from './Settings';
import EditMyInfo from './EditMyInfo';
import MainStats from './MainStats';
import HandleAccounts from './HandleAccounts';

function App({history}) {

  const [token, setToken] = useState()
  const [userName, setUserName] = useState()
  const [memberInfo, setMemberInfo] = useState()
  const [rol, setRol] = useState()

  useEffect(() => {
    if(sessionStorage.token){
      try {
        retrieveUser(sessionStorage.token)
          .then(user => {
            if (user) {
              setToken(sessionStorage.token)
              setUserName(user.name)

              if(user.admin) setRol(user.admin)
            }
          })
          .catch(error => { throw error })
      } catch (error) {
        if (error) throw error
      }
    }else history.push('/')
  }, [sessionStorage.token])

  const handleGoToHome = (token) => {
    sessionStorage.token = token
    try {
      retrieveUser(token)
        .then(user => {
          setUserName(user.name)
          setToken(token)
          history.push('/home')
        })
        .catch(error => { throw error })
    } catch (error) {
      if (error) throw error
    }
    
  }

  const handleGoToLogin = () => {
    history.push('/')
  }

  const handleGoToEdit = (member) => {
    setMemberInfo(member)
    history.push('/edit-member')
  }

  const handleLogout = () => {
    setRol(undefined);
    sessionStorage.clear()
    window.location.reload();
  }


  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Route exact path="/" render={()=> token? <Redirect to='/home'/> :<Login onLogin={handleGoToHome}/>}/>
          <Route path="/register" render={()=> token? <Redirect to='/home'/> : <Register onGoToLogin={handleGoToLogin}/>}/>
          <Route path="/home" render={()=> token? <Home userName={userName}/> : <Redirect to='/'/>} />
          <Route path="/my-family" render={()=> token? <MyFamily token={token} handleGoToEdit={handleGoToEdit} rol={rol}/> : <Redirect to='/'/>} />
          <Route path="/create-member" render={()=> token? <CreateMember token={token} history={history} /> : <Redirect to='/'/>} />
          <Route path="/edit-member" render={()=> token? <EditMember token={token} memberInfo={memberInfo} history={history}/> : <Redirect to='/'/>} />
          <Route path="/set-mood" render={()=> token? <SetMood token={token} history={history} /> : <Redirect to='/'/>} />
          <Route path="/settings" render={()=> token? <Settings rol={rol} handleLogOut={handleLogout} /> : <Redirect to='/'/>} />
          <Route path="/edit-my-info" render={()=> token? <EditMyInfo token={token} history={history} /> : <Redirect to='/'/>} />
          <Route path="/main-stats" render={()=> token? <MainStats token={token} rol={rol}/> : <Redirect to='/'/>} />
          <Route path="/handle-accounts" render={()=> token? <HandleAccounts token={token} history={history}/> : <Redirect to='/'/>} />
          {token && <Footer history={history}/>}
        </Container>
      </header>
    </div>
  );

  // return (
  // <section className='footerContainer'>
  //   <div className='footerContainer__div'></div>
  // </section>
  // );
}

export default withRouter(App);
