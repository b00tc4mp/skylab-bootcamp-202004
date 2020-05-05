const { useState } = React

function Login(props) {

    const [error, setError] = useState('')

    function handleSubmitLogin(event) {
        event.preventDefault()

        let { email, password } = event.target

        email = email.value
        password = password.value

        try {
            props.onSubmitLogin(email, password)
        } catch ({ message }) {
            setError(message)

        }
    }
    return <section className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmitLogin}>
            <input type="email" name="email" placeholder="e-mail*"></input>
            <input type="password" name="password" placeholder="password*"></input>
            <button>Submit</button>
                to <a href="" onClick={event => {

                event.preventDefault()
                props.onRegister('register')
            }}>Register</a>

            {error !== '' && <Feedback message={error} level="error" />}
        </form>
    </section>


}
