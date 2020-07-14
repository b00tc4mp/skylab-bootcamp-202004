function Landing({onRegister, onLogin}) {
    return <section className="landing">
        <a href="" onClick={ event => {
            event.preventDefault()

            onRegister('register')
        }}>Register</a> or <a href="" onClick={event => {
            event.preventDefault()

            onLogin('login')
        }}>Login</a>
    </section>
}