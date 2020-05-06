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
                    } else setView("login")
                })
            } catch (error) {
                if (error) setView("login")
            }
        else setView("landing")
    }, [])

    const handleGoToRegister = () => setView("register")

    const handleGoToLogin = () => setView("login")

    const handleRegister = () => setView("login")

    const handleLogin = (name, token, following) => {
        sessionStorage.token = token
        setToken(token)
        setView("home")
        if (following) setFollowing (following)
    }

    const handleLogout = () => {
        setToken()
        delete sessionStorage.token
        setView("landing")
    }

    const handleUserSessionExpired = () => setView("login")

    
    return <>
        {view === "load" && <Spinner />}
        {view === 'landing' && <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
        {view === 'register' && <Register onSubmit={handleRegister} onGoToLogin={handleGoToLogin}/>}
        {view === 'login' && <Login onSubmit={handleLogin} onGoToRegister={handleGoToRegister}/>}
        {view === 'home' && <Home name={name} following={following} token={token} onLogout={handleLogout} onUserSessionExpired={handleUserSessionExpired} />}
    </>
    
}