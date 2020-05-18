const { useState } = React

function App(){
  const [view, setView] = useState('landing')
  const [eltoken, setToken] = useState('')


  useEffect(() => {
    if (sessionStorage.token){
      try {
        isUserAuthenticated(sessionStorage.token, (error, isValidToken) => {
          if (error) throw error
          if (isValidToken){
            setToken(sessionStorage.token)
            setView('home')
          } else setHashView('login')
        })

      } catch (error) {
        if (error) throw error
      }
    }else{
      const hash = location.hash.substring(1)

      if (hash === 'login' || hash === 'register'){
        setHashView(hash)
      } else {
        location.hash = ''
        setView('landing')
      }
    }
  }, [])



  const setHashView = view => {
    location.hash = view
    setView(view)
  }


  function handleGoToRegister() {
  setHashView('register')
  }


  function handleGoToLogin(){
    setHashView('login')
  } 

  function handleGoToHome(token){
    setToken(token)
    sessionStorage.setItem('token', token)
    setView('home')
  }

  const handleLogout = () => {
    setToken()
    sessionStorage.token = null
    location.hash = ''
    setView('landing')
}

  const handleUserSessionExpired = () => setHashView('login')

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
        {view === "home" && <Home token={eltoken} onUserSessionExpired={handleUserSessionExpired} handleLogout={handleLogout} />}
      </>
    );
  }

