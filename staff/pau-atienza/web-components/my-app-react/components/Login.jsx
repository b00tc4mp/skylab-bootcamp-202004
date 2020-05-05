function Login({handleLogin, setView}){

    return <section className="login">
        <h1 className="title-login">Login</h1>
        <form onSubmit={event => {event.preventDefault(); handleLogin(event)}}>
        <input className="input-mail" type="email" name="email" placeholder="e-mail"/>
            <input className="input-pass" type="password" name="password" placeholder="password"/>
            <button className="submit-button">Submit</button>
            or <a className="register-login" href="" onClick={event => {event.preventDefault(); setView('register')}}>Register</a>
        </form>
    </section>

}   