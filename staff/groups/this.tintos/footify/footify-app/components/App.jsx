const { useState, useEffect } = React
function App() {

    const [view, setView] = useState('load')
    const [token, setToken] = useState()
    const [error,setError] = useState()

    useEffect(()=>{
        console.log('mont App')
        if(sessionStorage.token){
            try{
                isUserAuthenticated(sessionStorage.token, (error, isAuthenticated)=>{
                    if(error) setError(error.message);
                 
                    if(isAuthenticated){
                        setToken(sessionStorage.token)
                        setView('home')
                    }else{
                        setView('login')
                    }
                })

            }catch({message}){
                setError(message)
            }
        }else{
            setView('landing')
        }
    },[])

    const handleGoToLogin = () => { setView('login') }

    const handleGoToRegister = () => { setView('register') }

    const handleGoToLanding = () => { setView('landing') }

    const handlGoToHome = (token) => { 
        sessionStorage.token = token
        setToken(token) 
        setView('home')      
    } 
    
    const handleUserSessionExpired = () =>{ setView('login')}

    return <>
        {view === 'load' && <Spinner />}
        {view === 'landing' && <Landing onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} />}
        {view === 'login' && <Login onGoToRegister={handleGoToRegister} onGoToLanding={handleGoToLanding} onGoToHome={handlGoToHome}/>}
        {view === 'register' && <Register onGoToLogin={handleGoToLogin} onGoToLanding={handleGoToLanding}/>}
        {view === 'home' && <Home token={token} onUserSessionExpired={handleUserSessionExpired}/>}
        {error && <Feedback message={error} level="error" />}
    </>

}


