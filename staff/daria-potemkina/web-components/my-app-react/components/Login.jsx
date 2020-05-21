const {Component} = React
class Login extends Component {
    constructor(props) {
        super(props)

        this.state = { error: ''}

    }

    handleSubmit = event => {
        event.preventDefault()

        let { email, password } = event.target

        email = email.value,
            password = password.value

        try {
            authenticateUser(email, password, (error, token) => {
                if (error) return this.setState({error: error.message})

                // retrieveUser(token, (error, user) => {
                //     if (error) return this.setState({error: error.message})
                    else this.props.onSubmit(token)
                // })
            })

        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleGoToRegister = event => {
        event.preventDefault()

        this.props.onRegister()
    }

    render() {
        return <section className="login">
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                <input type="email" name="email" placeholder="e-mail" required />
                <input type="password" name="password" placeholder="password" required minLength="8" />
                <button>Submit</button>
                <a href="" onClick={this.handleGoToRegister}>Register</a>
                {this.state.error && <Feedback message={this.state.error} level='error' />}
            </form>
        </section>
    }
}