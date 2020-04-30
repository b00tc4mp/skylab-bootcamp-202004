class Login extends Component {
    constructor(props) {
        super(props)

        this.state = { error: '' }
    }

    handleSubmit = event => {
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
            this.setState({ error: message })
        }
    }

    handeGoToRegister = event => {
        event.preventDefault()

        this.props.onGoToRegister()
    }

    render() {
        return <section className="login">
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                <input type="email" name="email" placeholder="e-mail" required />
                <input type="password" name="password" placeholder="password" required minLength="8" />
                <button>Submit</button>
                or <a href="" onClick={this.handeGoToRegister}>Register</a>

                {this.state.error && <Feedback message={this.state.error} level="error" />}
            </form>
        </section>
    }
}