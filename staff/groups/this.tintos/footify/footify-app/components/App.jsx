const { useState } = React
function App() {

    const [view, setView] = useState('landing')
    const [token, setToken] = useState(undefined)

    const handleGoToLogin = () => { setView('login') }
    const handleGoToRegister = () => { setView('register') }
    const handleGoToLanding = () => { setView('landing') }
    const handlGoToHome = (token) => { 
        setToken(token) 
        setView('home')      
    } 

    return <>
        {view === 'landing' && <Landing onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} />}
        {view === 'login' && <Login onGoToRegister={handleGoToRegister} onGoToLanding={handleGoToLanding} onGoToHome={handlGoToHome}/>}
        {view === 'register' && <Register onGoToLogin={handleGoToLogin} onGoToLanding={handleGoToLanding}/>}
        {view === 'home' && <Home token={token}/>}
    </>

}


