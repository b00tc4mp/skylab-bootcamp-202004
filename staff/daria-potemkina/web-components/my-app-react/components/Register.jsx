class Register extends Component {
    constructor(props) {
        super(props)

        this.state = { error: '' }
    }

    handleSubmit = event => {
        event.preventDefault()

        let { name, surname, email, password } = event.target
        name = name.value,
            surname = surname.value,
            email = email.value,
            password = password.value

        try {
            this.props.onSubmit(name, surname, email, password);

        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleGoToLogin = event => {
        event.preventDefault()

        this.props.onLogin()
    }

    render() {
        return <section className="register"><h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" placeholder="name" required patern="[A-Za-z]{1,20}" />
                <input type="text" name="surname" placeholder="surname" required patern="[A-Za-z]{1,20}" />
                <input type="email" name="email" placeholder="e-mail" required />
                <input type="password" name="password" placeholder="password" required minLength="8" />
                <button>Submit</button>
                <a href="" onClick={this.handleGoToLogin}>Log in</a>
                {this.state.error && <Feedback message={this.state.error} level='error' />}
            </form>
        </section>
    }
}