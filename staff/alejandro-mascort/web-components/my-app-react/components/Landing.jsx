function Landing({ onRegister, onLogin }) {
    return <section className="landing">
        <a href="" onClick={ event => {
            event.preventDefault()

            onRegister()
        }}>Register</a> or <a href="" onClick={ event => {
            event.preventDefault()

            onLogin()
        }}>Login</a>
    </section>
}