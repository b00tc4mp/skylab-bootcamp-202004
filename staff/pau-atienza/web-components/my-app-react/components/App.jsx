const { useState, useEffect } = React

function App(){
    const [view, setView] = useState('landing')
    const [error, setError] = useState(undefined)
    const [token, setToken] = useState(undefined)

    const handleLogin = event => {
        let {email, password} = event.target;

        email = email.value
        password = password.value
        try{
            authenticateUser(email, password, (functionError, token) => {
                if (functionError) return setError(functionError.message)
                setToken(token)
                setView('home')
            })
        }catch ({message}){setError(message)}
    }

    const handleRegister = event => {
        let { name, surname, email, password } = event.target;

        name = name.value; surname = surname.value
        email = email.value; password = password.value
        try{
            registerUser(name, surname, email, password, (functionError) => {
                if (functionError) return setError(functionError.message)
                setView('login')
            })
        }catch ({message}){setError(message)}
    }

    return <>
        {view === 'landing' && <Landing setView = {setView}/>}
        {view === 'register' && <Register setView = {setView} handleRegister = {handleRegister}/>}
        {view === 'login' && <Login setView = {setView} handleLogin = {handleLogin}/>}
        {view === 'home' && <Home token = {token} setToken = {setToken} setError = {setError}/>}
        {error && <Feedback message = {error} level = 'error'/>}
    </>
}
