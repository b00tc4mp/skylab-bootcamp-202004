const { useState, Component } = React

function App() {
    const [view, setView] = useState('home')
    const [token, setToken] = useState(undefined)
    const [cryptoView, setCryptoView] = useState(undefined)

    const handleGoToRegister = (event) => {
        event.preventDefault()
        setView('register')
    }

    const handleGoToLogin = (event) => {
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

        console.log(email, password)

        authenticateUser(email, password, (error, token) => {
            if (error) throw error

            if (token) {
                setToken(token)
                setView('home')
            }
        })
    }

    const handleCoinClick = (event) => {
        event.preventDefault()
        setView('coin-page')
        // setCryptoView({ name, symbol })
    }

    return <>
        {view === 'landing' && <Landing toRegister={handleGoToRegister} toLogin={handleGoToLogin} />}
        {view === 'login' && <Login toRegister={handleGoToRegister} loginSubmit={handleLoginSubmit} />}
        {view === 'register' && <Register registerSubmit={handleRegisterSubmit} goToLogin={handleGoToLogin} />}
        {view === 'home' && <Home coinClick={handleCoinClick} />}
        {view === 'coin-page' && <CoinPage />}
        {/* thisCrypto={cryptoView} */}

    </>
