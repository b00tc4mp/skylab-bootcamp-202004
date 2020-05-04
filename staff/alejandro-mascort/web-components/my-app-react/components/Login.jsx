// class Login extends Component {
//     constructor(props) {
//         super(props)

//         this.state = { error: ''}

//     }

//     handleSubmit = event => {
//         event.preventDefault()

//         let { email, password } = event.target

//         email = email.value,
//             password = password.value

//         try {
//             authenticateUser(email, password, (error, token) => {
//                 if (error) return this.setState({error: error.message})

//                 retrieveUser(token, (error, user) => {
//                     if (error) return this.setState({error: error.message})
//                     else this.props.onSubmit(user.name, token, user.following)
//                 })
//             })

//         } catch ({ message }) {
//             this.setState({ error: message })
//         }
//     }

//     handleGoToRegister = event => {
//         event.preventDefault()

//         this.props.onRegister()
//     }

//     render() {
//         return <section className="login">
//             <h1>Login</h1>
//             <form onSubmit={this.handleSubmit}>
//                 <input type="email" name="email" placeholder="e-mail" required />
//                 <input type="password" name="password" placeholder="password" required minLength="8" />
//                 <button>Submit</button>
//                 <a href="" onClick={this.handleGoToRegister}>Register</a>
//                 {this.state.error && <Feedback message={this.state.error} level='error' />}
//             </form>
//         </section>
//     }
// }


function Login({onSubmit, onRegister}) {
    const [error, setError] = useState(undefined)
    
    function handleSubmit(event) {
        event.preventDefault()

        let { email, password } = event.target

        email = email.value,
        password = password.value

        try {
            authenticateUser(email, password, (error, token) => {
                if (error) return setError(error.message)

                retrieveUser(token, (error, user) => {
                    if (error) return setError(error.message)
                    else onSubmit(user.name, token)
                })
            })

        } catch ({ message }) {
            setError(message)
        }
    }

    function handleGoToRegister(event) {
        event.preventDefault()

        onRegister()
    }

    return <section className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password" required minLength="8" />
            <button>Submit</button>
            <a href="" onClick={handleGoToRegister}>Register</a>
            {error && <Feedback message={error} level='error' />}
        </form>
    </section>
}