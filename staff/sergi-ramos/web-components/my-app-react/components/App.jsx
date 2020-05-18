const { useState, useEffect } = React

function App() {

    const [view, setView] = useState('load')
    const [user, setUser] = useState(undefined)
    const [name, setName] = useState(undefined)
    const [surname, setSurname] = useState(undefined)
   
    const [token, setToken] = useState(undefined)

    useEffect(() => {
        if (sessionStorage.token)
            try {
                isUserAuthenticated(sessionStorage.token, (error, isAuthenticate) => {
                    if (error) throw error
                    if (isAuthenticate) {
                        setToken(sessionStorage.token)
                        setName(name)
                        setSurname(surname)
                        setView('home')

                    } else setHashView('login')

                })
            } catch (error) {
                if (error) throw error
            }
        else {
            const hash = location.hash.substring(1)
            if (hash === 'login' || hash === 'register') setHashView(hash)
            else {
                location.hash = ''

                setView('landing')
            }
        }
    }, [])

    const setHashView = view => {
        location.hash = view
        setView(view)
    }

    function handleGoToRegisterOrLogin(view) { setView(view) }

    function handleLogout(view) { setView(view) }

    function handleLogin(email, password) {
        loginUser(email, password, (error, token) => {
            if (error) console.log(error) // TODO feedback
            else { setToken(token) 
                setView('home')}
        })
    }
   
    function handleRegister(name, surname, username, password) {
        registerUser(name, surname, username, password, (error) => {
            if (error) { console.log(error) }
            else {
                setView('login')
            }
        })
    }
    return <>
        {view === 'load' && <Spinner />}
        {view === 'landing' && <Landing onRegister={handleGoToRegisterOrLogin} onLogin={handleGoToRegisterOrLogin} />}
        {view === 'register' && <Register onLogin={handleGoToRegisterOrLogin} onSubmitRegister={handleRegister} />}
        {view === 'login' && <Login onRegister={handleGoToRegisterOrLogin} onSubmitLogin={handleLogin} />}
        {view === 'home' && <Home token={token} logOut={handleLogout} />}
    </>

}