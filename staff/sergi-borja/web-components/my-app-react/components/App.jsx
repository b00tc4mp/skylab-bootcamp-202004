const { useState, Component } = React

function App() {
       
    const [view, setView] = useState('landing')
    const [token, setToken] = useState()

    const handleGoToRegister = () => setView('register')

    const handleRegister = () => setView('login')

    function handleLogin(token) {
        setView('home'); 
        setToken(token);
    }   

    const handleGoToLogin = () => setView( 'login' )

    const handleLogout = () => {
        setView('landing')
        setToken(undefined)
    }


        return <>
            {view === 'landing' && <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
            {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />}
            {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />}
            {view === 'home' && <Home token={token} onLogout={handleLogout}/>}
        </>
    
}