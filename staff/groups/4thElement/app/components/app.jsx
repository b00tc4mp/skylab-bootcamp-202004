const { useState } = React

function App() {
   
    const [view, setView] = useState('login')
    const [token, setToken] = useState(undefined)
    

    const handleGoToRegister= () => setHashView('register')

    const handleGoToLogin= () => setView('login')

    const handleRegister= () => setView('login')

    const handleLogin= (token) => {
        setToken(token)
        sessionStorage.token = token
        setHashView('home')
    }

    const handleGoToHome= () => setHashView('home')
    
    const setHashView = view => {
        location.hash = view
        setView(view)
    }

    const handleLogout = () => {
        setToken(undefined)
        delete sessionStorage.token
        setHashView('login')
    }

    const handleGoToSearch = () => {
        setHashView('search')
    }


        return <>
            {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin}/>}
            {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} onGoToHome={handleGoToHome}/>}
            {view === 'home' && <Home token={token} OnLogout={handleLogout} OnGoToSearch={handleGoToSearch} />}
            {view === 'search' && <Search token={token} OnLogout={handleLogout}/>}
        </>
    
}