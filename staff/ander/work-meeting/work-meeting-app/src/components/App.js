import React from 'react';
import Landing  from './Landing'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import {Route, withRouter} from 'react-router-dom'




function App({history}) {
const handleLogin = (token)=>{debugger; history.push('./home')}
const handleRegister = () => history.push('./login')
const handleGoToLogin= () => history.push('./login')
const handleGotoRegister=()=> history.push('./register')
  return (
    <div className="App">
      <header className="App-header">
      <Route exact path="/" render={() => <Landing/>} />
      <Route path='/register' render={()=> <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin}/>}/>
      <Route path='/Login' render={()=> <Login onGoToRegister={handleGotoRegister} onLogin={handleLogin}/>}/>
      <Route path='/Home' render={()=> <Home/>}/>
      </header>
    </div>
  )
}


export default withRouter(App)

