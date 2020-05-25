const { Component } = React

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = { error: null }
    }

    handleSubmit = event => {
        event.preventDefault()

        let { name, surname, email, password } = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        try {
            registerUser(name, surname, email, password, (error) => {
                if (error) return this.setState({error: error.message})
                this.props.onLogin()
            })
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    render() {
        return <section className="register">
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
                <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
                <input type="email" name="email" placeholder="e-mail" required />
                <input type="password" name="password" placeholder="password" required minLength="8" />
                <button>Submit</button>
                or <a href="" onClick={event => {
                event.preventDefault()
                this.props.onLogin()
               }}>Login</a>
                {this.state.error && <Feedback message={this.state.error} level="error" />}
            </form>
        </section>
    }
}
