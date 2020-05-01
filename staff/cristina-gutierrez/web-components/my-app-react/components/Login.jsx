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
            this.props.onSubmit(email, password)
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    render() {
        return <section className="login">
            <h1>Login</h1>
            <form>
                <input type="email" name="email" placeholder="e-mail" required />
                <input type="password" name="password" placeholder="password" required minLength="8" />
                <button>Submit</button>
                or <a href="" onClick={event => {
                    event.preventDefault()
        
                    this.props.onGoToRegister()
                }}>Register</a>

                {this.state.error && <Feedback message={this.state.error} level="error" />}
            </form>
        </section>
    }
}