import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Register from './Register';
import Login from './Login';
import Editor from './Editor';
import Panel from './Panel';
import '../styles/App.sass'

function App() {

 return(

     <>
            <BrowserRouter>
                <Route path='/' exact component={Panel} />
                <Route path='/signin' component={Login} />
                <Route path='/signup' component={Register} />
                <Route path='/panel' component={Panel} />
                <Route path='/editor' component={Editor} />
            </BrowserRouter>
     </>
)
}

export default App;
