const { Component } = React

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {error: ''}
    }

    handleSubmit = event => {
        event.preventDefault()

        let { username, email, password } = event.target

        username = username.value,
        email = email.value,
        password = password.value

        try {
            registerUser(username, email, password, error => {
                if (error) return this.setState(error.message)

                this.props.onLogin()
            })

        } catch ({ message }) {
           this.setState(message)
        }
    }

    handleLogin = event => {
        event.preventDefault()

        this.props.onLogin()
    }

    render() {
        return <section className="register"><h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" placeholder="username" required patern="[A-Za-z]{1,20}" />
                <input type="email" name="email" placeholder="e-mail" required />
                <input type="password" name="password" placeholder="password" required minLength="8" />
                <button>Submit</button>
                <a href="" onClick={this.handleLogin}>Log in</a>
                {this.state.error && <Feedback message={this.state.error} level='error' />}
            </form>
        </section>
    }


}