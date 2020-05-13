const { useState, Component } = React

function App() {
    const [view, setView] = useState('landing')
    const [token, setToken] = useState(null)

    const handleGoToRegister = (event) => {
        event.preventDefault()
        setView('register')
    }

    const handleGoToLogin = (event) => {
        setView('login')
    }

    const handleGoToLoginFromLanding = (event) => {
        event.preventDefault()
        setView('login')
    }


    const handleRegisterSubmit = (event) => {
        setView('login')
    }

    const handleLoginSubmit = (_token) => {
        setToken(_token)
        setView('home')
    }


    return <>
        {view === 'landing' && <Landing toRegister={handleGoToRegister} toLogin={handleGoToLogin} handleGoToLoginFromLanding={handleGoToLoginFromLanding} />}
        {view === 'login' && <Login toRegister={handleGoToRegister} loginSubmit={handleLoginSubmit} />}
        {view === 'register' && <Register registerSubmit={handleRegisterSubmit} goToLogin={handleGoToLogin} />}
        {view === 'home' && <Home />}

    </>
}