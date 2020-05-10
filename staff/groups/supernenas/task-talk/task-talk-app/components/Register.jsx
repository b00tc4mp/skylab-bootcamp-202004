const { useState } = React

function Register({ onRegister, onGoToLogin }) {
    const [error, setError] = useState()

    const handleSubmit = event => {
        event.preventDefault()

        let { name, surname, email, password } = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        try {
            registerUser(name, surname, email, password, error => {
                if (error) return setError(error.message)

                onRegister()
            })
        } catch ({ message }) {
            setError(message)
        }
    }

    const handleGoToLogin = event => {
        event.preventDefault()

        onGoToLogin()
    }

    return <div className="aux">
    <section className="register ">
        <h1>Register</h1>
        <form onSubmit= {handleSubmit}>
            <input className="navigation_inptut" type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
            <input className="navigation_inptut" type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
            <input className="navigation_inptut" type="email" name="email" placeholder="e-mail" required />
            <input className="navigation_inptut" type="password" name="password" placeholder="password" required minLength={ 6 } />
            <br/><br/>
            <button className="button__navigation button__navigation--regular">Submit</button> 
                {" "} or {" "} <a  className="navigation__link" href=" " onClick={handleGoToLogin}>Login</a>
            {error && <Feedback message={error} level="error" />}
        </form>
    </section>
    </div>
}