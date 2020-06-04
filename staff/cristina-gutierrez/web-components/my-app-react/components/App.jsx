const { useState, useEffect } = React

function App() {
    const [view, setView] = useState("load");
    const [token, setToken] = useState();
    const [following, setFollowing] = useState();

    useEffect(() => {
        if (sessionStorage.token)
            try {
                isUserAuthenticated(sessionStorage.token, (error, isAuthenticated) => {
                    if (error) throw error

                    if (isAuthenticated) {
                        setToken(sessionStorage.token)
                        setView("home")
                    } else setHashView("login")
                })
            } catch (error) {
                if (error) throw error
            }
        else {
            const hash = location.hash.substring(1)

            if (hash === 'login' || hash === 'register') setHashView(hash)
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
    
    const handleGoToRegister = () => setHashView("register")

    const handleGoToLogin = () => setHashView("login")

    const handleRegister = () => setHashView("login")

    const handleLogin = (name, token, following) => {
        sessionStorage.token = token
        setToken(token)
        location.hash = ''
        setView("home")
        if (following) setFollowing (following)
    }

    const handleLogout = () => {
        setToken()
        delete sessionStorage.token
        location.hash = ''
        setView("landing")
    }

    const handleUserSessionExpired = () => setHashView("login")

    
    return <>
        {view === "load" && <Spinner />}
        {view === 'landing' && <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
        {view === 'register' && <Register onSubmit={handleRegister} onGoToLogin={handleGoToLogin}/>}
        {view === 'login' && <Login onSubmit={handleLogin} onGoToRegister={handleGoToRegister}/>}
        {view === 'home' && <Home name={name} following={following} token={token} onLogout={handleLogout} onUserSessionExpired={handleUserSessionExpired} />}
    </>  
}