const { useState } = React

function Register({ goToLogin, registerSubmit }) {
    const [error, setError] = useState(null)

    const handleRegister = (event) => {
        event.preventDefault();
        const {
            name: { value: name },
            surname: { value: surname },
            email: { value: email },
            password: { value: password },
        } = event.target;

        try {
            register(name, surname, email, password, (_error) => {
                if (_error) setError(_error.message)
                else registerSubmit()
            })
        } catch ({ message }) {
            setError(message)
        }
    };


    return (
        <section className="register">
            <h2 className="register__title">Register</h2>
            <form onSubmit={handleRegister} className="register__form">
                <input name="name" type="text" placeholder="Name" />
                <input name="surname" type="text" placeholder="Surname" />
                <input name="email" type="email" placeholder="Email" />
                <input name="password" type="password" placeholder="Password" />
                {error && <Feedback message={error} modifier={'feedback--warning'} />}
                <button type="submit">Create account</button>
            </form>
            <p className="register__to-login">
                Already registered?<a href="#" onClick={goToLogin}>Login</a>
            </p>
        </section>
    );
}
