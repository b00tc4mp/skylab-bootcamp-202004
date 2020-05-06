const { useState, Component, useEffect } = React

function App () {
    const [ view, setView ] = useState('load')  
    const [ token, setToken ] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWIxNWZlNTMxOTlkODAwMTU5ZWVmMDUiLCJpYXQiOjE1ODg3NTY0NjgsImV4cCI6MTU4ODc2MDA2OH0.r70NkLNi3SmLuI5wUiAsTcE9W-JQscsbpxZ0fb1lYi8')

            //view: 'landing',
            //view: 'home',
            //token: undefined

    useEffect(() => {
        if (sessionStorage.token) {
            try {
                isUserAuthenticated(sessionStorage.token, (error, validToken) => {
                    if (error) throw error
                    else {
                        if (validToken) setView('home')
                        else setView('login')
                    }
                })
            } catch (error) {
                if (error) throw error
            }
        } else {
            setView('landing')
        }
    }, [])
    
    const handleGoToRegister = () => setView('register')

    const handleRegister = () => setView('login' )

    const handleLogin = token => {
        setToken(token);
        sessionStorage.token = token
        setView ('home')
        }

    const handleGoToLogin = () => setView('login')

    const handleLogout = () => {
        setToken(undefined);
        setView ('landing')
    }
    

        return <>
            {view === 'load' && <Load /> }
            {view === 'landing' && <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
            {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />}
            {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />}
            {view === 'home' && <Home token={token} onLogout={handleLogout}/>}
        </>
    
}