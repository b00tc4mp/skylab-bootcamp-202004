const { useState } = React

function Login({onLogin, onGoToRegister, onGoToHome}) {

    const [error, setError] = useState('')

    const handleSubmit = event => {
        event.preventDefault()        

        let { email, password } = event.target

        email = email.value
        password = password.value

        try {
            authenticateUser(email, password, (error, token) => {
                if (error) return setError(error.message)

                onLogin(token)
            })
        } catch ({ message }) {
            setError(message)
        }
    }

    const handleGoToRegister = (event) => {
        event.preventDefault()
        onGoToRegister()
    }

    const handleSkipLogin = (event) => {
        event.preventDefault()
        onGoToHome()
    }

    return <section className="login">
            <h2>Welcome to the 4thElement, <br/> to make the most of this app:</h2>
            <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <br/>
                <input type="email" name="email" placeholder="e-mail" required />
                <br/>
                <input type="password" name="password" placeholder="password" required minLength="8" />
                <br/>
                <button>Submit</button>
                <br/>
                or <a href="" onClick={handleGoToRegister}>Register</a>
                {error && <Feedback message={error} level="error" />}
            </form>
            <br/>
                <h3>Made from surfers to surfers</h3>
                <a onClick={handleSkipLogin}>SKIP LOGIN</a>
        </section>
}