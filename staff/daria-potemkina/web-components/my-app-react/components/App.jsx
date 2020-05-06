const { useState, useEffect } = React

function App() {

    const [view, setView] = useState('load')
    // const [name, setName] = useState()
    const [token, setToken] = useState()
    // const [following, setFollowing] = useState([])

    useEffect(() => {
        if (sessionStorage.token) {
            try {
                isUserAuthenticate(sessionStorage.token, (error, isAuthenticated) => {
                    if (error) throw error

                    if (isAuthenticated) {
                        setToken(sessionStorage.token)
                        setView('home')
                    }
                })
            } catch (error) {
                if (error) throw error
            }
        }else setHashView('landing')
    }, [])

    const setHashView =(view)=> {
        location.hash = view
        setView(view)
    }

    function handleGoToLogin() {
        setHashView('login')
    }

    function handleLogin(token) {
        sessionStorage.token = token
        setToken(token)
        setView('home')
        location.hash = ''
        // setName(name)
        // if (following) setFollowing(following)
    }

    function handleGoToRegister() {
        setHashView('register')
    }

    function handleRegister() {
        setHashView('login')
    }

    function handleGoToLanding() {
        setToken()
        delete sessionStorage.token
        setView('landing')
        location.hash = ''
    }


    return <>
        {view === 'load' && <Spinner />}
        {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
        {view === 'login' && <Login onSubmit={handleLogin} onRegister={handleGoToRegister} />}
        {view === 'register' && <Register onSubmit={handleRegister} onLogin={handleGoToLogin} />}
        {view === 'home' && <Home token={token} onLogout={handleGoToLanding} />}
    </>

}