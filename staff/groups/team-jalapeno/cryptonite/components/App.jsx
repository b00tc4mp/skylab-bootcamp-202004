const { useState, Component } = React

function App() {
    const [view, setView] = useState('register')


    const handleGoToLogin = () => setView('login')


    return(
        <> 
            {view === 'register' && <Register goToLogin={handleGoToLogin} />}
            {view === 'login' && <p>soy login</p>}
        
        </>
    )
   
}