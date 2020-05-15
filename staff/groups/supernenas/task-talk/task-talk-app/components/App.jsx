const { useState, Component } = React

const App = () => {
    const [view, setView] = useState(sessionStorage.token ? 'home' : 'landing')
    
    const [token, setToken] = useState(sessionStorage.token)

    const handleGoToRegister = () => setView('register')

    const handleRegister = () => setView('login')

    const handleLogin = token => {
        sessionStorage.token = token
        setToken(token)
        setView('home')
    }

    const handleGoToLogin = () => setView('login')

    const handleLogout = () => { setToken(); localStorage.removeItem("trello_token"); setView('landing'); Trello.setToken(undefined) }

    return <>
        {view === 'landing' && <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
        {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />}
        {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />}
        {view === 'home' && <Home token={token} onLogout={handleLogout} tokenskylab={token} />}
    </>
}