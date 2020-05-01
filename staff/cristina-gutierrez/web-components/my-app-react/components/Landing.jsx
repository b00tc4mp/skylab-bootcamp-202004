function Landing({ onGoToRegister , onGoToLogin }) {
    return <section className="landing">
        <a href="" onClick= { event => {
            event.preventDefault()

            onGoToRegister()
        }}>Register</a> or <a href="" onClick={event => {
            event.preventDefault()

            onGoToLogin()
        }}>Login</a>
    </section>
}