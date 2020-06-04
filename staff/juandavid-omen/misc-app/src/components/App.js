import React from 'react'
import './App.sass'
import Register from './Register'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Register onRegister={() => console('Ok, resgistered')} onGoToLogin={console.log}/>
      </header>
    </div>
  )
}

export default App
