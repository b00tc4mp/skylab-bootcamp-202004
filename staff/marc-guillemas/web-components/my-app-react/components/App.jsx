const { useState } = React
//HOOKS
function App() {
    
    const [view, setView] = useState('login')
    const[token, setToken] = useState()
   
     

    function changeView(_view){
        setView(_view)
    } 

    // handleGoToLogin = () => this.setState({view: 'login'})

    function handleRegister(name, surname, email, password){
        registerUser(name, surname, email, password, (error) =>{
            if(error) throw error

            setView('login')
    
        })

    }

    function handleLogin(email, password){
       authenticateUser(email, password, (error,token) => {
           if(error) throw error

           sessionStorage.token = token
           setToken(token)
        //    setTimeout(setView('loading'),7000)
           setView('home')
       })
        
    }

    function handleLogout(){
        setToken(token)  
        setView('view')
    }

    const handleUserSessionExpired = () => {setView('login')}
    return <>
        {view === 'loading' && <Spinner/>}
        {view === 'landing' && <Landing onRegister={changeView} onLogin={changeView}/>}
        {view === 'register' && <Register onLogin={changeView} onSubmit = {handleRegister}/>}
        {view === 'login' && <Login onRegister={changeView} onSubmit={handleLogin}/>}
        {view === 'home' && <Home token={token} onLogout={handleLogout} onUserSessionExpired={handleUserSessionExpired}/>}
    </>
    
}



