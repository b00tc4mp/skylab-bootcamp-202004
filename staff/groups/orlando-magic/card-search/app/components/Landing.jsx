function Landing(props){

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

            <a href="" onClick = {() => {event.preventDefault();props.setView('adv')}}>Advanced Search</a>
            <a href="" onClick = {() => {event.preventDefault();props.setView('account')}}>Your Account</a>
            <a href="" onClick = {props.handleLogin}>Login</a>
            <a href="" onClick = {props.handleRegister}>Register</a> 

        </section>
    </>
}