import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import Register from './Register';
import Login from './Login';
import Editor from './Editor';
import Panel from './Panel';
// import Challenge from './Challenge';

function App() {

 return(

     <>
            <BrowserRouter>
                <Route path='/' exact component={Panel} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Register} />
                <Route path='/panel' component={Panel} />
                <Route path='/editor' component={Editor} />

                {/* <Route path='/challenge' component={Challenge} /> */}

            </BrowserRouter>
     </>
)
}

export default App;
