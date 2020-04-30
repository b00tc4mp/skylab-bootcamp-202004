function Landing({ onGoToRegister, onGoToLogin }) {
    function handleGoToRegister(event) {
        event.preventDefault()

        onGoToRegister()
    }

    function handleGoToLogin(event) {
        event.preventDefault()

        onGoToLogin()
    }

    return <section className="landing">
        <a href="" onClick={handleGoToRegister}>Register</a> or <a href="" onClick={handleGoToLogin}>Login</a>
    </section>
}