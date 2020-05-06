const { useState } = React;

function App (){
    const [view,setView] = useState('landing');
    const [token,setToken] = useState('landing');

    const handleState = (input) =>{
        setView(input);
    }
    const handleRegister =() =>{
        setView('login')
    }
    const handleLogin =(token) =>{
        setToken(token)
        setView('home')
    }
    const handleLogout = () =>{
        setView('landing')

    }

  

        return <>
            
            {view === 'landing' && <Landing onClick={handleState}/>}
            {view === 'register' && <Register onClick={handleState} onRegister={handleRegister}/>}
            {view === 'login' && <Login onClick={handleState} onLogin={handleLogin}/>}
            {view === 'home' && <Home onLogout={handleLogout} token={token}/>}

        </>
 
}