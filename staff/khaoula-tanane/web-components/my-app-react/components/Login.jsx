const { Component } = React

class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            error: null
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let { email, password } = event.target
        email = email.value
        password = password.value

        try{
          authenticateUser(email, password, (error, token) => {
            if (error) return this.setState({ error: error.message })
            this.props.goToHome(token)
          })
        } catch ({message}){
            this.setState({error : message})
        }
    }

    render(){
        return <section className="login">
        <form onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            <input  name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password" required />
            <button type='submit'>Submit</button>
             or <a href="" onClick={event => {
                event.preventDefault()
                this.props.onRegister()
               }}>Register</a>
             {this.state.error && <Feedback message={this.state.error} level="error" />}
        </form>
    </section>
}
}