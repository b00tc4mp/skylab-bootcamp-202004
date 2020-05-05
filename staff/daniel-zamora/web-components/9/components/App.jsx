const { Component, useState } = React

function App (){

    const [token, setToken] = useState()
    const [view, setView] = useState(view)

    const handleGoToRegister = () => setView ('register')

    const handleRegister = () => setView ('login')

    const handleLogin = token => {
        setToken(token)
        setView('home')
    }

    const handleGoToLogin = () => setView('login')

    const handleLogout = () => {
        setToken(undefined)
        setView('landing')
    }

        return <>
            {view === 'landing' && <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
            {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />}
            {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />}
            {view === 'home' && <Home token={token} onLogout={handleLogout}/>}
        </>
}