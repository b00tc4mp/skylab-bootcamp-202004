
const { useState } = React


function App() {

    const [view, setView] = useState('landing');
    const [token, setToken] = useState();

    function handleGoToRegister() {
        setView('register')
    }

    function handleRegister() {
        setView('login')
    }

    function handleLogin(token) {
        
        setToken(token)
        setView("home")
    }

    function handleGoToLogin() {
        setView('login')
    }

    function handleLogout() {
        setView("landing")
    }


    return <>
        {view === 'landing' && <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
        {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />}
        {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />}
        {view === 'home' && <Home token={token} onLogout={handleLogout} />}
    </>

}