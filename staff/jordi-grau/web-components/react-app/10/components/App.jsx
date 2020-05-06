const { useState, Component } = React

function App () {
    const [ view, setView ] = useState('landing')  
    const [ token, setToken ] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWIxNWZlNTMxOTlkODAwMTU5ZWVmMDUiLCJpYXQiOjE1ODg3NTExMjgsImV4cCI6MTU4ODc1NDcyOH0.aoDLxu-F91CTin_5gVXgEYqBilPy1vM4IsP8f4eY1OA')

            //view: 'landing',
            //view: 'home',
            //token: undefined


    const handleGoToRegister = () => setView('register')

    const handleRegister = () => setView('login' )

    const handleLogin = token => {
        setToken(token);
        setView ('home')
        }

    const handleGoToLogin = () => setView('login')

    const handleLogout = () => {
        setToken(undefined);
        setView ('landing')
    }
    

        return <>
            {view === 'landing' && <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
            {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />}
            {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />}
            {view === 'home' && <Home token={token} onLogout={handleLogout}/>}
        </>
    
}