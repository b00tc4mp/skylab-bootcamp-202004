const { useState, Component } = React

function App() {
    const [view, setView] = useState('landing')
    const [token, setToken] = useState(null)

    const handleGoToRegister = (event) => {
        event.preventDefault()
        setView('register')
    }

    const handleGoToLogin = (event) => {
        // event.preventDefault()
        setView('login')
    }

    const handleGoToLoginFromLanding = (event) => {
        event.preventDefault()
        setView('login')
    }


    const handleRegisterSubmit = (event) => {
        setView('login')
    }

    const handleLoginSubmit = (event) => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            authenticateUser(email, password, (error, token) => {
                if (error) throw error

                if (token) {
                    setToken(token)
                    sessionStorage.token = token
                    setView('home')
                }
            })
        } catch (error) {
            if (error) new Error(error.message)
        }
    }


    return <>
        {view === 'landing' && <Landing toRegister={handleGoToRegister} toLogin={handleGoToLogin} handleGoToLoginFromLanding={handleGoToLoginFromLanding} />}
        {view === 'login' && <Login toRegister={handleGoToRegister} loginSubmit={handleLoginSubmit} />}
        {view === 'register' && <Register registerSubmit={handleRegisterSubmit} goToLogin={handleGoToLogin} />}
        {view === 'home' && <Home />}

    </>
}