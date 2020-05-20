const { useState, useEffect } = React

function App() {
    const [view, setView] = useState('landing')

    const [token, setToken] = useState()

    useEffect(() =>{
        if (sessionStorage.token) {
            try {
                isUserAuthenticated(sessionStorage.token, (error, isAuthenticated) => {
                    if(error) throw error

                    if(isAuthenticated){
                        setToken(sessionStorage.token)
                        
                        setView('home')
                    } else {
                        setHashView('login')
                    }
                })
            } catch (error) {
                if(error) throw error
            }
        } else {
            const hash = location.hash.substring(1)
            
            if (hash === 'login' || hash === 'register') {
                setHashView(hash)
            } else {
                location.hash = ""

                setView('landing')
            }
        }
    }, [])

    const setHashView = view => { 
        location.hash = view

        setView(view)
    }

    const handleGoToRegister = () => setHashView('register')

    const handleRegister = () => setHashView('login')
    
    function handleLogin (token){
        sessionStorage.token = token
        setToken(token)
        location.hash = ""
        setView('home')
    }
    
    const handleGoToLogin = () => setHashView('login') 
    
    const handleLogout = () => {
        setToken()
        delete sessionStorage.token
        location.hash = ""
        setView('landing')
    } 

    const handleUserSessionExpired = () => setHashView('login')
    
    return <>
        {view === 'landing' && <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
        {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />}
        {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />}
        {view === 'home' && <Home token={token} onLogout={handleLogout} onUserSessionExpired={handleUserSessionExpired} />}
    </>
}