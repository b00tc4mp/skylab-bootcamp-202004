import React from 'react'
import './App.sass'
import Hello from './Hello'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hello name="Manuel" />
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
