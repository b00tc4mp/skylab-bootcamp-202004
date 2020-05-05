const { useState } = React

function App() {

    const [view, setView] = useState('landing')
    const [user, setUser] = useState(undefined)
    const [name, setName] = useState(undefined)
    const [surname, setSurname] = useState(undefined)
    const [userEmail, setUserEmail] = useState(undefined)
    const [token, setToken] = useState(undefined)
    const [following, setFollowing] = useState(undefined)


    function handleGoToRegisterOrLogin(view) { setView(view) }

    function handleLogout(view) { setView(view) }

    function handleLogin(email, password) {
        loginUser(email, password, (error, token) => {
            if (error) console.log(error) // TODO feedback
            else {
                retrieveUser(token, (error, { name, surname, email, following }) => {
                    if (error) console.log(error)
                    else {
                        setView('home')
                        setToken(token)
                        setName(name)
                        setSurname(surname)
                        setUserEmail(email)
                        setFollowing(following)
                    }
                })
            }
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
        {view === 'landing' && <Landing onRegister={handleGoToRegisterOrLogin} onLogin={handleGoToRegisterOrLogin} />}
        {view === 'register' && <Register onLogin={handleGoToRegisterOrLogin} onSubmitRegister={handleRegister} />}
        {view === 'login' && <Login onRegister={handleGoToRegisterOrLogin} onSubmitLogin={handleLogin} />}
        {view === 'home' && <Home token={token} name={name} surname={surname} email={userEmail} logOut={handleLogout} following={following} />}
    </>

}