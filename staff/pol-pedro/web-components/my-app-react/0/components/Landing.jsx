function Landing({ onRegister }) {
    return <section className="landing">
        <a href="" onClick={ event => {
            event.preventDefault()

            onRegister('register')
        }}>Register</a> or <a href="" onClick={ event => {
            event.preventDefault()

            onRegister('login')
        }}>Login</a>
    </section>
}