const { useState, useEffect, Component } = React

function App() {
    const [view, setView] = useState('landing')

    const [token, setToken] = useState();

    useEffect(() =>{
        sessionStorage.token && isUserAuthenticated(sessionStorage.token, (error, isAuthenticated) => {
            if(error) {
                throw error;
            }

            if(isAuthenticated){
                setToken(sessionStorage.token);
                setView('home');
            } 
        })
    }, []);

    function handleGoToRegister (){ 
        setView('register');
    }

    function handleRegister() {
        setView('login');
    }
    
    function handleLogin (token){
        sessionStorage.token = token;

        setToken(token);

        setView('home');
    }
    
    function handleGoToLogin () {
        setView('login');
    } 
    
    function handleLogout (){
        setToken();
        delete sessionStorage.token;
        setView('landing');
    } 
    
        return <>
            {view === 'landing' && <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
            {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />}
            {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />}
            {view === 'home' && <Home token={token} onLogout={handleLogout}/>}
        </>
};