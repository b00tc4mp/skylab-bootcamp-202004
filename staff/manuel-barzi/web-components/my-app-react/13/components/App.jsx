const { useState, useEffect } = React

function App() {
    const [view, setView] = useState('load')
    // const [view, setView] = useState('home')
    const [token, setToken] = useState()
    // const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWFjNDg5OTZiMzNjNzAwMTU0MmU5MmIiLCJpYXQiOjE1ODg2NzE4MDEsImV4cCI6MTU4ODY3NTQwMX0.RS0HvoBYhCY7Li4oEAiOB1AtwfoPSLRTQTAd4vKk4OA')

    useEffect(() => {
        if (sessionStorage.token)
            try {
                isUserAuthenticated(sessionStorage.token, (error, isAuthenticated) => {
                    if (error) throw error

                    if (isAuthenticated) {
                        setToken(sessionStorage.token)
                        setView('home')
                    } else setHashView('login')
                })
            } catch (error) {
                if (error) throw error
            }
        else {
            const hash = address.hash()

            if (hash === 'login' || hash === 'register') setHashView(hash)
            else {
                address.hash.clear()

                setView('landing')
            }
        }
    }, [])


    const setHashView = view => {
        address.hash(view)

        setView(view)
    }

    const handleGoToRegister = () => setHashView('register')

    const handleRegister = () => setHashView('login')

    const handleLogin = token => {
        sessionStorage.token = token
        setToken(token)
        address.hash.clear()
        setView('home')
    }

    const handleGoToLogin = () => setHashView('login')

    const handleLogout = () => {
        setToken()
        delete sessionStorage.token
        address.hash.clear()
        setView('landing')
    }

    const handleUserSessionExpired = () => setHashView('login')

    return <>
        {view === 'load' && <Spinner />}
        {view === 'landing' && <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
        {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />}
        {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />}
        {view === 'home' && <Home token={token} onLogout={handleLogout} onUserSessionExpired={handleUserSessionExpired} />}
    </>
}