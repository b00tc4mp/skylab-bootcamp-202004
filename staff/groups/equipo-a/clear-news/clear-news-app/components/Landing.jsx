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
        <img className='landing__image' src="images/logo.png"></img>
        <section className="landing__navigation">
        <a href="" onClick={handleGoToRegister}>Register</a>
        <a href="" onClick={handleGoToLogin}>Login</a>
        </section>
    </section>
}