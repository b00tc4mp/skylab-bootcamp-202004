function Landing ({ onGoToRegister, onGoToLogin }) {
    const handleGoToRegister = (event) => { event.preventDefault(); onGoToRegister() }

    const handleGoToLogin = (event) =>{ event.preventDefault(); onGoToLogin() }

    return <section className="landing">
        <h1>Task Talk</h1>
        <button className="button__navigation button__navigation--inverted " onClick = { handleGoToLogin }>Login</button>
        <button className="button__navigation button__navigation--regular " onClick = { handleGoToRegister }>Register</button>
    </section>
}