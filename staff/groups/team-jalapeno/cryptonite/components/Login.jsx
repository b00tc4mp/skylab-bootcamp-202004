const { useState } = React

function Login({ loginSubmit, toRegister }) {
    
    const [error, setError] = useState(null)

    const handleLogin = (event) => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
                authenticateUser(email, password, (error, token) => {
                if (error) setError(error.message)

                if (token) {
                    
                    sessionStorage.token = token
                    loginSubmit(token)
                }
            })
        } catch ({ message }) {
            setError(message)
        }
    }

    return <section className="login">
        <h2 className="login__title">Login</h2>
        <form onSubmit={handleLogin} className="login__form">
            <input name="email" type="email" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            {error && <Feedback message={error} modifier={'feedback--warning'} />}
            <button type="submit">Login</button>
        </form>
        <p className="login__to-register">Don't have an account?<a href="" onClick={toRegister}>Register</a></p>
    </section>

}