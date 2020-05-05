const { useState, Component } = React
// const { Component } = React

function App () {
    const [ view, setView ] = useState('home') //deberia ser landing...
    const [ token, setToken ] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWIwMTkxNmNkY2ZkZDAwMTU3YmM0ZDciLCJpYXQiOjE1ODg2MTMxMzUsImV4cCI6MTU4ODYxNjczNX0.YsxDVIO5Srdjo4Wq6SajXBi1Nbllg_gMhfxXuj5NAnM')

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