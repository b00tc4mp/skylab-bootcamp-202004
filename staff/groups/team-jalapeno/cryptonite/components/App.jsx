const { useState, Component } = React

function App() {
    const [view, setView] = useState('landing')
    const [error, setError] = useState()



    useEffect(()=>{
        isAuthenticated()
        handleCheckHash()

        window.addEventListener('hashchange', handleCheckHash)
        return () => {
          window.removeEventListener('hashchange', handleCheckHash)
          clearInterval(interval)
        }
    },[])

    const isAuthenticated = () => {
        const token = sessionStorage.token
        if (!token) return setView('landing')

        try{
            retrieveUser(sessionStorage.token, (_error) => {
                if (_error) setView('landing')
                else setView('home')
            })
        } catch (_error) {
            setError(_error.message)
        }

    }
    
    
    const handleCheckHash = () => {
        let _view = window.location.hash
        if (view === 'home') return
        
        const appRoutes = ['register', 'login', 'landing']
        _view = _view.substring(1)
        if (appRoutes.includes(_view)) {
            setView(_view)
        } else isAuthenticated()

      }


    const handleGoToRegister = (event) => {
        event.preventDefault()
        window.location.hash = 'register'
    }


    const handleGoToLogin = () => {
        window.location.hash = 'login'
    }

    const handleGoToLoginFromLanding = (event) => {
        event.preventDefault()
        window.location.hash = 'login'
    }


    const handleRegisterSubmit = () => {
        window.location.hash = 'login'
    }

    const handleLoginSubmit = (_token) => {
        window.location.hash = 'cryptos-list'
        setView('home')
    }


    const handleOnLogout = () => {
        sessionStorage.token = undefined
        setView('landing')
    }

    return <>
        {view === 'landing' && <Landing toRegister={handleGoToRegister} toLogin={handleGoToLogin} handleGoToLoginFromLanding={handleGoToLoginFromLanding} />}
        {view === 'login' && <Login toRegister={handleGoToRegister} loginSubmit={handleLoginSubmit} />}
        {view === 'register' && <Register registerSubmit={handleRegisterSubmit} goToLogin={handleGoToLoginFromLanding } />}
        {view === 'home' && <Home onLogout={handleOnLogout} />}

    </>
}