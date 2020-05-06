
const { useState, Component } = React

function App () {
    const  [ view, setView ] = useState('landing')

    const handleGoToRegister = () => setState({ view: 'register' })

    const handleRegister = () => setState({ view: 'login' })
    
    const handleLogin = token => 
    
    setState({ token, view: 'home' })
    
    const handleGoToLogin = () => setState({ view: 'login' })

    const handleLogout = () => setState({ token: undefined, view: 'landing'})


/*
 class App extends Component {
    constructor() {
        super()

        this.state = {
            view: 'landing'
        }
    }
*/
   

  
        return <>
            {view === 'landing' && <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
            {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />}
            {view === 'login' && <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />}
            {view === 'home' && <Home token={state.token} onLogout={handleLogout}/>}
        </>

}