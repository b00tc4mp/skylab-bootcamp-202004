const { useState, useEffect } = React
function App() {

    const [view, setView] = useState('load')
    const [token, setToken] = useState()
    const [error,setError] = useState()

    useEffect(()=>{
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
            const hash = address.hash()

            if(hash === 'login' || hash === 'register') setHashView(view)
            else{
                address.hash.clear()
                setView('landing')
            }
            
        }
    },[])

    const setHashView = (view) =>{
        if(view === 'landing'){
            address.hash.clear()
            setView(view)
        } else{
            address.hash(view)
            setView(view)
        }
    }

    const handleGoToLogin = () => {setHashView('login') }

    const handleGoToRegister = () => { setHashView('register') }

    const handleGoToLanding = () => { setHashView('landing') }

    const handlGoToHome = (token) => { 
        sessionStorage.token = token
        setToken(token) 
        setView('home')      
    } 
    
    const handleUserSessionExpired = () =>{ setHashView('login')}

    return <>
        {view === 'load' && <Spinner />}
        {view === 'landing' && <Landing onGoToLogin={handleGoToLogin} onGoToRegister={handleGoToRegister} />}
        {view === 'login' && <Login onGoToRegister={handleGoToRegister} onGoToLanding={handleGoToLanding} onGoToHome={handlGoToHome}/>}
        {view === 'register' && <Register onGoToLogin={handleGoToLogin} onGoToLanding={handleGoToLanding}/>}
        {view === 'home' && <Home token={token} onUserSessionExpired={handleUserSessionExpired}/>}
        {error && <Feedback message={error} level="error" />}
    </>

}


