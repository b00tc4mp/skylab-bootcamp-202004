import React from 'react'
import './App.sass'
import Hello from './Hello'
import RegisterUser from './RegisterUser'
import Login from './Login' 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hello name="Manuel" />
        <RegisterUser/>
        <Login/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
