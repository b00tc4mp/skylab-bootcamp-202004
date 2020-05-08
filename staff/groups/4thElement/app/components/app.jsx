const { useState } = React

function App() {
     
    const [view, setView] = useState('login')
    
    const handleGoToRegister= () => setView('register')

    const handleGoToLogin= () => setView('login')

    const handleRegister= () => setView('login')
    
    const handleLogin= () => setView('home')

    const handleGoToHome= () => setView('home')
    

    // const setHashView = view => {
    //     location.hash = view
    //     setView(view)
    // }

        return <>
            {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin}/>}
            {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} onGoToHome={handleGoToHome}/>}
            {view === 'home' && <Home onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
        </>
    
}