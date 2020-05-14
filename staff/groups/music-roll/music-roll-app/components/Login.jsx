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
            if (error) return this.setState({error: error.message})
            this.props.onSubmit(token)
        })
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }
    
    render(){
        return <section className="login">
        <div className="login__container">
          <h1 className="login__header">Login</h1>
          <hr className="login__divider" />
          <form onSubmit={this.handleSubmit} className="login__form"> 
            <label htmlFor="email" className="email-label">Email</label>
            <input className="login__input login--mail" type="email" name="email" placeholder="john@mail.com" required />
            <label htmlFor="password">Password</label>
            <input className="login__input login--pass" type="password" name="password" placeholder="********" required />
            <button className="login__button">Sign In</button>
            <a href="" onClick={ event => {
                    event.preventDefault()
            
                    this.props.onRegister('register')
                }}>Already not a member? Register now!</a>            
          </form> 
        </div>
      
      {this.state.error && <Feedback  message = {this.state.error}/>}
      
      </section>
 
    }
    
}