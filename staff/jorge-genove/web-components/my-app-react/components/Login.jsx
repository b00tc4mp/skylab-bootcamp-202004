
class Login extends Component {
    constructor(){
    super()

        this.state = { error : ''}

    }


handleOnRegister = event => {
    event.preventDefault()


}


handleSubmit = event => {debugger
    event.preventDefault()

    let { email, password } = event.target

    email = email.value
    password = password.value


    try{
        this.props.onLogin1(email, password)
    }catch({message}){
        this.setState({error: message})

    }
}
render() {

    return <section className="login">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}> 
            <input type="email" name="email" placeholder="e-mail" required/>
            <input type="password" name="password" placeholder="password" required/>
            <button>Submit</button>
            or <a onClick={ () => {event.preventDefault(); this.props.onRegister('register')}} className="home__link" href="">Register</a>
            
 
            {this.state.error && <Feedback message={this.state.error} level = 'error'/>}
        </form>
    </section> 
    }
    }
