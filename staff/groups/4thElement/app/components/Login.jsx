function Login({onGoToRegister}) {

    const handleSubmit = () => {
        authenticateUser(name, surname, username, password)
    }

    const handleGoToRegister = (event) => {
        event.preventDefault()
        onGoToRegister()
    }

    return <section className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="e-mail" required />
                <input type="password" name="password" placeholder="password" required minLength="8" />
                <button>Submit</button>
                or <a href="" onClick={handleGoToRegister}>Register</a>

                {/* {error && <Feedback message={error} level="error" />} */}
            </form>
        </section>
}