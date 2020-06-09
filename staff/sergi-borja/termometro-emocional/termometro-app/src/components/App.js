import React from 'react'
import './App.sass';
import { Route, withRouter } from 'react-router-dom'
import Container from './Container';
import Login from './Login';
import Register from './Register';


function App({history}) {


  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Route exact path="/" render={()=> <Login />}/>
          <Route path="/register" render={()=> <Register/>}/>
        </Container>
      </header>
    </div>
  );
}

export default withRouter(App);
