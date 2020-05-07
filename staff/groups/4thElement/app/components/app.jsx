const { useState } = React

function App() {
     
    const [view, setView] = useState('home')
    
    const handleGoToRegister= () => setView('register')

    const handleGoToLogin= () => setView('login')

    const handleRegister= () => setView('login')
    

    // const setHashView = view => {
    //     location.hash = view
    //     setView(view)
    // }

        return <>
            {view === 'home' && <Home onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
            {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin}/>}
            {view === 'login' && <Login onGoToRegister={handleGoToRegister}/>}
        </>
    
}