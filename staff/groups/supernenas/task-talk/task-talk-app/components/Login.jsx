const { useState} = React

function Login ({ onLogin, onGoToRegister }) {
    const [error, setError] = useState()
 
    const handleSubmit = event => {
        event.preventDefault()

        let { email, password } = event.target

        email = email.value
        password = password.value

        try {
            authenticateUserSkylab(email, password, (error, token) => {
                if (error) return setError(error.message)

                onLogin(token)
            })
        } catch ({ message }) {
            setError(message)
        }
    }

    const handeGoToRegister = event => { 
        event.preventDefault()
         
        onGoToRegister() 
    }

    return <div className="aux">
        <section className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input className="navigation__input" type="email" name="email" placeholder="e-mail" required />
                <input className="navigation__input" type="password" name="password" placeholder="password" />
                <br/><br/>    
                <button className="button__navigation button__navigation--regular ">Submit</button>
                    {" "} or {" "} <a className="navigation__link" href="" onClick={handeGoToRegister}>Register</a>
                {error && <Feedback message={error} level="error" />}
            </form>
        </section>
    </div>
}