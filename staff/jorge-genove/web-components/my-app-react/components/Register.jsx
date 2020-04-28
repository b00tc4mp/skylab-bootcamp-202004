

class Register extends Component {
constructor(){
    super()
     
    this.state = { error: ''}    
} 
     
  handleSubmit = event => {debugger
      event.preventDefault()
  
      let { name, surname, email, password } = event.target

      name = name.value
      surname = surname.value
      email = email.value
      password = password.value

        try{debugger
            this.props.onRegister1(name, surname, email, password)
        } catch({message}){
            this.setState({ error: message })
        }
     
    
    
    }      

render() {

    return <section className="register">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
            <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}"/>
            <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}"/>
            <input type="email" name="email" placeholder="e-mail" required/>
            <input type="password" name="password" placeholder="password" required minLength="1"/>
            <button>Submit</button>
            or <a href="">Login</a>
            
            {this.state.error && <Feedback message={this.state.error} level = 'error'/>}
        </form>
    </section>
}

}