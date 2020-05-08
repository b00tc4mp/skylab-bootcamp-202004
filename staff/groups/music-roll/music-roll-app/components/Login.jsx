const { Component } = React

class Login extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            error: undefined
        }
    }
    
    handleSubmit = event => {
        event.preventDefault()
        
        let { email, password } = event.target
        
        email = email.value
        password = password.value
        
        try {
        authenticateUser(email, password, (error, token) => {
            if (error) console.error(error)
            // return this.setState({ error: error.message })
            
            this.props.onSubmit(token)
        })
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }
    
    render(){
        return <section className="login">
        <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                <input type="email" name="email" placeholder="e-mail" required />
                <input type="password" name="password" placeholder="password" required />
                <button>Submit</button>
                or <a href="" onClick={ event => {
                    event.preventDefault()
            
                    this.props.onRegister('register')
                }}>Already not a member? Register now!</a> 
        
            </form> 
        </section>
    }
    
}