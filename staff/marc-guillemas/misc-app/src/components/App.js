import React from "react";
import "./App.sass";
import Register from "./Register";
import Login from "./Login"

const { useState } = React

function App() {
  const [view, setView] = useState('register')
  
  const handleChangeView = (view) => {
    setView(view)
  }
  return (
    <div className="App">
      <header className="App-header">
        {view === 'register' && <Register onChangeView={handleChangeView}/>}
        {view === 'login' && <Login onChangeView={handleChangeView}/>}

      </header>
    </div>
  );
}

export default App;
