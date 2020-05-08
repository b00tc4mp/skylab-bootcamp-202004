function Landing({onLogin, onRegister}){

    const handleLogin = event => {
        event.preventDefault()
    
        onLogin()
    }

    const handleRegister = event => {
        event.preventDefault()

        onRegister()
    }

    return <>
        <section className = 'landing'>
            <form onSubmit = {() => {event.preventDefault(); props.onBasicSearch(event)}}>
                <input type="text" name="query"/>
                <button>Card Search</button>
            </form>

            <a href="" onClick = {() => props.setView('adv')}>Advanced Search</a>
            <a href="" onClick = {() => props.setView('account')}>Your Account</a>
            <a href="" onClick = {handleLogin}>Login</a>
            <a href="" onClick = {handleRegister}>Register</a> 

        </section>
    </>
}