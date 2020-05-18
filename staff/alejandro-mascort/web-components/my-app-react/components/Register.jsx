function Register({onLogin}) {
    const [error, setError] = useState(undefined)

    function handleSubmit(event) {
        event.preventDefault()

        let { name, surname, email, password } = event.target
        name = name.value,
        surname = surname.value,
        email = email.value,
        password = password.value

        try {
            registerUser(name, surname, email, password, error => {
                if (error) return setError(error.message)

                onLogin();
            })

        } catch ({ message }) {
            setError(message)
        }
    }

    function handleGoToLogin(event) {
        event.preventDefault()

        onLogin()
    }

    return <section className="register"><h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="name" required patern="[A-Za-z]{1,20}" />
            <input type="text" name="surname" placeholder="surname" required patern="[A-Za-z]{1,20}" />
            <input type="email" name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password" required minLength="8" />
            <button>Submit</button>
            <a href="" onClick={handleGoToLogin}>Log in</a>
            {error && <Feedback message={error} level='error' />}
        </form>
    </section>
    
}