import React, { useState, useEffect } from 'react'
import './App.sass';
import { Route, withRouter, Redirect } from 'react-router-dom'
import Container from './Container';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import MyFamily from './MyFamily';
import Footer from './Footer'
import {isAuthenticated} from 'termometro-client-logic'
import CreateMember from './CreateMember';
import EditMember from './EditMember';
import SetMood from './SetMood';
import Settings from './Settings';
import EditPlan from './EditPlan';
import EditMyInfo from './EditMyInfo';
import MainStats from './MainStats';

function App({history}) {

  const [token, setToken] = useState()
  const [userName, setUserName] = useState()
  const [memberInfo, setMemberInfo] = useState()

  useEffect(() => {
    if(sessionStorage.token){
      try {
        isAuthenticated(sessionStorage.token)
          .then(user => {
            if (user) {
              setToken(sessionStorage.token)
              setUserName(user.name)
            }
          })
          .catch(error => { throw error })
      } catch (error) {
        if (error) throw error
      }
    }else history.push('/')
  }, [])

  const handleGoToHome = (token) => {
    sessionStorage.token = token
    try {
      isAuthenticated(token)
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


  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Route exact path="/" render={()=> token? <Redirect to='/home'/> :<Login onLogin={handleGoToHome}/>}/>
          <Route path="/register" render={()=> token? <Redirect to='/home'/> : <Register onGoToLogin={handleGoToLogin}/>}/>
          <Route path="/home" render={()=> token? <Home userName={userName}/> : <Redirect to='/'/>} />
          <Route path="/my-family" render={()=> token? <MyFamily token={token} handleGoToEdit={handleGoToEdit}/> : <Redirect to='/'/>} />
          <Route path="/create-member" render={()=> token? <CreateMember token={token}/> : <Redirect to='/'/>} />
          <Route path="/edit-member" render={()=> token? <EditMember token={token} memberInfo={memberInfo} history={history}/> : <Redirect to='/'/>} />
          <Route path="/set-mood" render={()=> token? <SetMood token={token} /> : <Redirect to='/'/>} />
          <Route path="/settings" render={()=> token? <Settings token={token} /> : <Redirect to='/'/>} />
          <Route path="/edit-plan" render={()=> token? <EditPlan token={token} /> : <Redirect to='/'/>} />
          <Route path="/edit-my-info" render={()=> token? <EditMyInfo token={token} /> : <Redirect to='/'/>} />
          <Route path="/main-stats" render={()=> token? <MainStats token={token} /> : <Redirect to='/'/>} />
          {token && <Footer/>}
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
