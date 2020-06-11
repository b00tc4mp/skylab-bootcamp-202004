import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import Register from './Register';
import Login from './Login';
import Home from './Home';

function App() {

 return(

     <>
            <BrowserRouter>
                <Route path='/' exact component={Login} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Register} />
                <Route path='/home' component={Home} />
            </BrowserRouter>
     </>
)
}

export default App;
