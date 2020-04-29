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
            this.props.onSubmit(email, password)
            this.props.goToHome()
        } catch ({message}){
            this.setState({error : message})
        }
    }

    render(){
        return <section className="login">
        <form onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            <input  name="email" placeholder="e-mail" value='kau@gmail.com' required />
            <input type="password" name="password" placeholder="password" value='123123123' required />
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