import React from 'react';
import './App.sass';
import Register from "./Register";
import Login from "./Login";

const{useState} = React

function App() {
  const [view,setView] = useState('register');
  const [token,setToken] = useState()
  function handleGoToLogin() {
    setView('login')
  }

  function handleGoToRegister() {
    setView('register');
  }
  // function handleRegister(token) {
  //   setToken(token)
  //   setView('login');
  // }

  // const handleState = (input) =>{
  //       setView(input);
  //   }
    // const handleRegister =() =>{
    //     setView('login')
    // }
    // const handleLogin =(token) =>{
    //     setToken(token)
    //     setView('home')
    // }
    // const handleLogout = () =>{
    //     setView('landing')

    // }
  return (
    <div className="App">
      <header className="App-header">  
      <div>
      {view === 'register' && <Register goToLogin={handleGoToLogin}/>}
      {view === 'login' && <Login goToRegister={handleGoToRegister} />}
      </div>
      </header>
    </div>
  );
}

export default App;


// function App (){
//     const [view,setView] = useState('landing');
//     const [token,setToken] = useState('landing');

//     const handleState = (input) =>{
//         setView(input);
//     }
//     const handleRegister =() =>{
//         setView('login')
//     }
//     const handleLogin =(token) =>{
//         setToken(token)
//         setView('home')
//     }
//     const handleLogout = () =>{
//         setView('landing')

//     }

  

//         return <>
            
//             {view === 'landing' && <Landing onClick={handleState}/>}
//             {view === 'register' && <Register onClick={handleState} onRegister={handleRegister}/>}
//             {view === 'login' && <Login onClick={handleState} onLogin={handleLogin}/>}
//             {view === 'home' && <Home onLogout={handleLogout} token={token}/>}

//         </>
 
// }