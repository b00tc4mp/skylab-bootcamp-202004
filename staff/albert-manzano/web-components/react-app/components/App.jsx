
const { useState,useEffect } = React


function App() {

    
    const [view, setView] = useState ('load')

    const [token, setToken] = useState();

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
            const hash = location.hash.substring(1)

            if (hash === 'login' || hash === 'register') setHashView(hash)
            else {
                location.hash = ''
                
                setView('landing')
            }
        }
    }, [])

    const handleUserSessionExpired = () => setHashView('login')

    const setHashView = view => {
        location.hash = view
        debugger
        setView(view)
    }

    function handleGoToRegister() {
        setView('register')
    }

    function handleRegister() {
        setView('login')
    }

    function handleLogin(token) {
        sessionStorage.token=token
        setToken(token)
        setView("home")
        location.hash =''
    }

    function handleGoToLogin() {
        setView('login')
    }

    function handleLogout() {
        setToken()
        delete sessionStorage.token
        setView("landing")
        location.hash =''
    }

    return <>
        {view === 'load' && <Spinner />}
        {view === 'landing' && <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
        {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />}
        {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />}
        {view === 'home' && <Home token={token} onLogout={handleLogout} onUserSessionExpired ={handleUserSessionExpired} />}
    </>

}