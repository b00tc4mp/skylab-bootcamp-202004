const { Component } = React;

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = { error: '' }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value,
      password = event.target.password.value;

    try {
      this.props.onSubmit(email, password);
    } catch (error) {
      const { message } = error
      this.setState({ error: message })
    }

  }

  toRegister = (event) => {
    event.preventDefault();

    this.props.toRegister();
  }

  render() {
    return <section className="login">
      <h1>Login</h1>
      <form onSubmit={this.handleSubmit}>
        <input type="email" name="email" placeholder="e-mail" required />
        <input type="password" name="password" placeholder="password" required minLength="8" />
        <button>Submit</button>
        <a href="" onClick={this.toRegister}>Register</a>

        {this.state.error && <Feedback message={this.state.error} level='error' />}

      </form>
    </section>

  }
}
