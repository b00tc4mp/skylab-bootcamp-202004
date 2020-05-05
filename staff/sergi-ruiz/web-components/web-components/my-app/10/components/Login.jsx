const { useState, Component } = React

function Login({onGoToRegister}) {

    const [error, setError] = useState()
    const [token, setToken] = useState()
    
    
    const handleSubmit = event => {
        event.preventDefault()

        let { email, password } = event.target

        email = email.value
        password = password.value

        try {
            authenticateUser(email, password, (error, token) => {
                if (error) return this.setState({ error: error.message })

                this.props.onLogin(token)
            })
        } catch ({ message }) {
            setError(message)
        }
    }

    const handleGoToRegister = event => {
        event.preventDefault()

        this.props.onGoToRegister()
    }

        return <section className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="e-mail" required />
                <input type="password" name="password" placeholder="password" required minLength="8" />
                <button>Submit</button>
                or <a href="" onClick={handleGoToRegister}>Register</a>

                {error && <Feedback message={error} level="error" />}
            </form>
        </section>
    
}

// const { useState } = React

// function Register({ onRegister, onGoToLogin }) {
//     const [error, setError] = useState()

//     const handleSubmit = event => {
//         event.preventDefault()

//         let { name, surname, email, password } = event.target

//         name = name.value
//         surname = surname.value
//         email = email.value
//         password = password.value

//         try {
//             registerUser(name, surname, email, password, error => {
//                 if (error) return setError(error.message)

//                 onRegister()
//             })
//         } catch ({ message }) {
//             setError(message)
//         }
//     }

//     const handleGoToLogin = event => {
//         event.preventDefault()

//         onGoToLogin()
//     }

//     return <section className="register">
//         <h1>Register</h1>
//         <form onSubmit={handleSubmit}>
//             <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
//             <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
//             <input type="email" name="email" placeholder="e-mail" required />
//             <input type="password" name="password" placeholder="password" required minLength="8" />
//             <button>Submit</button>
//                 or <a href="" onClick={handleGoToLogin}>Login</a>

//             {error && <Feedback message={error} level="error" />}
//         </form>
//     </section>
// }