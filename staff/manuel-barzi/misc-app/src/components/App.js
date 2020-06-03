import React from 'react'
import './App.sass'
import Hello from './Hello'
import Register from './Register'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hello name="Manuel" />
        
        <Register onRegister={() => console.log('ok, registered!')} onGoToLogin={console.log} />
      </header>
    </div>
  )
}

export default App
