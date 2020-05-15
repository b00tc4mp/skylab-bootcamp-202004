const { useState, Component } = React

function Login({ onLogin1, onGoToRegister }) {

    const [error, setError] = useState('')

    const handleOnRegister = event => {
        event.preventDefault()
    }

    const handleSubmit = event => {
        debugger
        event.preventDefault()

        let { email, password } = event.target

        email = email.value
        password = password.value

        try {
            onLogin1(email, password)
        } catch ({ message }) {
            setError(error.message)

        }
    }

    return <section className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password" required />
            <button>Submit</button>
            or <a onClick={() => { event.preventDefault(); onGoToRegister('register') }} className="home__link" href="">Register</a>
            {error === error.message && <Feedback message={error} level='error' />}
        </form>
    </section>
}

