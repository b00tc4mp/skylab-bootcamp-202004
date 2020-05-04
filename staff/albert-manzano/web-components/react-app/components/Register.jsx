const {Component}= React

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = { error: '' }
    }

    handleSubmit = event => {
        event.preventDefault()

        let { name, surname, email, password } = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        try {
            //this.props.onSubmit(name, surname, email, password)
            registerUser(name, surname, email, password, error => {
                if (error) return this.setState({ error: error.message })

                this.props.onRegister()
            })
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleGoToLogin = event => {
        event.preventDefault()

        this.props.onGoToLogin()
    }

    render() {
        return <section className="register">
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
                <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
                <input type="email" name="email" placeholder="e-mail" required />
                <input type="password" name="password" placeholder="password" required minLength="8" />
                <button>Submit</button>
                or <a href="" onClick={this.handleGoToLogin}>Login</a>

                {this.state.error && <Feedback message={this.state.error} level="error" />}
            </form>
        </section>
    }
}