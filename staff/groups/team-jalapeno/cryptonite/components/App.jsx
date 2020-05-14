const { useState, Component } = React

function App() {
    const [view, setView] = useState('landing')
    const [token, setToken] = useState(null)


    useEffect(() => {
        const token = sessionStorage.token
        token && retrieveUser(sessionStorage.token, (_error) => {
            if (!_error) setView('home')
        })
    }, [])

    const handleGoToRegister = (event) => {
        event.preventDefault()
        setView('register')
    }


    const handleGoToLogin = () => {
        setView('login')
    }

    const handleGoToLoginFromLanding = (event) => {
        event.preventDefault()
        setView('login')
    }


    const handleRegisterSubmit = () => {
        setView('login')
    }

    const handleLoginSubmit = (_token) => {
        setToken(_token)
        setView('home')
    }

    const handleOnLogout = () => {
        sessionStorage.token = undefined
        setView('landing')
    }

    return <>
        {view === 'landing' && <Landing toRegister={handleGoToRegister} toLogin={handleGoToLogin} handleGoToLoginFromLanding={handleGoToLoginFromLanding} />}
        {view === 'login' && <Login toRegister={handleGoToRegister} loginSubmit={handleLoginSubmit} />}
        {view === 'register' && <Register registerSubmit={handleRegisterSubmit} goToLogin={handleGoToLogin} />}
        {view === 'home' && <Home onLogout={handleOnLogout} />}
    </>
}