const { useState, Component } = React

function Register({ onGoToLogin, onRegister1 }) {

    const [error, setError] = useState('')

    const handleSubmit = event => {
        debugger
        event.preventDefault()

        let { name, surname, email, password } = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        try {
            debugger
            onRegister1(name, surname, email, password)
        } catch ({ message }) {
            setError(error.message)
        }
    }

    return <section className="register">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
            <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
            <input type="email" name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password" required minLength="1" />
            <button>Submit</button>
            or <a onClick={() => { event.preventDefault(); onGoToLogin('login') }} className="home__link" href="">Login</a>

            {error === error.message && <Feedback message={error} level='error' />}
        </form>
    </section>
}