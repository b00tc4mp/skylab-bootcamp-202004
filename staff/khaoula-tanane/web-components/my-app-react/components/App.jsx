const { useState } = React

function App(){
  const [view, setView] = useState('landing')
  const [eltoken, setToken] = useState('')


  function handleGoToRegister() {
  setView('register')
  }


  function handleGoToLogin(){
    setView('login')
  } 

  function handleGoToHome(token){
    setToken(token)
    setView('home')
  }

    return (
      <>
        {view === "landing" && (
          <Landing
            onRegister={handleGoToRegister}
            onLogin={handleGoToLogin}
          />
        )}
        {view === "register" && (
          <Register
            onLogin={handleGoToLogin}
          />
        )}
        {view === "login" && (
          <Login
            goToHome={handleGoToHome}
            onRegister={handleGoToRegister}
          />
        )}
        {view === "home" && <Home token={eltoken}/>}
      </>
    );
  }

