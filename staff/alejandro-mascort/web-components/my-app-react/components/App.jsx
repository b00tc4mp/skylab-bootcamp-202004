const { Component } = React

const { useState, useEffect } = React

function App() {
    const [view, setView] = useState('spinner')
    const [token, setToken] = useState(undefined)

    useEffect(() => {
        if (sessionStorage.token) {
            try {
                isUserAuthenticated(sessionStorage.token, (error, isAuthenticated) => {
                    if (error) throw error
                    if (isAuthenticated) {
                        setToken(sessionStorage.token)
                        setView('home')
                    } else {
                        sessionStorage.token = ''
                        setHashView('login')
                    }
                })
            } catch (error) {
                if (error) throw error
            }
        }
        else {
            const hash = location.hash.substring(1)

            if (hash === 'login' || hash == 'register') setHashView(hash)
            else {
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
    function handleGoToLogin() {
        setHashView('login')
    }
    function handleGoToLanding() {
        location.hash = ''
        delete sessionStorage.token 
        setToken()
        setView('landing')
    }
    function handleLogin(token) {
        sessionStorage.token = token
        location.hash = ''
        setToken(token)
        setView('home')
    }

    return <>
        {view === 'spinner' && <Spinner />}
        {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
        {view === 'login' && <Login onSubmit={handleLogin} onRegister={handleGoToRegister} />}
        {view === 'register' && <Register onLogin={handleGoToLogin} />}
        {view === 'home' && <Home token={token} onLogout={handleGoToLanding} onLogin={handleGoToLogin}/>}
    </>
}