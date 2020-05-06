const { useState, Component } = React;

function App() {

  const [view, setView] = useState('home')
  const [token, setToken] = useState()

  const goToRegister = () => setView('register')
  const goToLogin = () => setView('login')

  const registerSubmit = (name, surname, email, password) => {
    registerUser(name, surname, email, password, (error) => {
      if (error) throw new Error(error)

      setView('login')
    })
  }

  const loginSubmit = (email, password) => {
    authenticateUser(email, password, (error, token) => {
      if (error) throw new Error(error)

      setToken(token)
      setView('home')
    })
  }

  const onLogout = () => {
    setView('landing')
    setToken(undefined)
  }

  return <>
    {view === 'landing' && <Landing toRegister={goToRegister} toLogin={goToLogin} />}
    {view === 'register' && <Register onSubmit={registerSubmit} toLogin={goToLogin} />}
    {view === 'login' && <Login onSubmit={loginSubmit} toRegister={goToRegister} />}
    {view === 'home' && <Home token={token} onLogout={onLogout} />}
  </>

}
