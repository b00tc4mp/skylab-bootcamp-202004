const { useState, Component } = React

function App() {
    const [view, setView] = useState('landing')
    const [token, setToken] = useState(undefined)

    const handleGoToRegister = (event) => {
        event.preventDefault()
        setView('register')
    }

    const handleGoToLogin = (event) => {
        event.preventDefault()
        setView('login')
    }
    const handleLoginSubmit = (event) => {
        const email = event.target.email.value
        const password = event.target.password.value

        console.log(email, password)

        // authenticateUser(email, password, (error, token)=>{
        //     if (error) throw error

        //     if (token) setToken(token)
        // })

        setView('home')
    }

    return <>
        {view === 'landing' && <Landing toRegister={handleGoToRegister} toLogin={handleGoToLogin} />}
        {view === 'login' && <Login toRegister={handleGoToRegister} loginSubmit={handleLoginSubmit} />}
        {/* {view === 'login' && <Register />} */}
        {view === 'home' && <Home />}


    </>
    // LANDING
    // NAV
    // BRAND
    // CRYPTO COINS 
    // FOOTER

    // REGISTER

    // LOGIN

    //HOME
}

