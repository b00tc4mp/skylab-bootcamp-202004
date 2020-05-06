
const { Component, useState } = React

function App (){

    const [view, setView] = useState('landing')
    const [token, setToken] = useState()

    const handleGoToRegister = () => setView('register')

    const handleRegister = () => setView('login')

    const handleLogin = token => {
    setToken(token)
    setView('home')
    }

    const handleGoToLogin = () => setView('login')

    const handleLogout = () => {
        setToken()
        delete sessionStorage.token
        setView('landing')
        }
  
        return <>
            {/* {view === 'loading' && <Spinner />} */}
            {view === 'landing' && <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
            {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />}
            {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />}
            {view === 'home' && <Home token={token} onLogout={handleLogout}/>}
        </>
}