const { Component } = React

class Register extends Component{
    constructor(props){
        super(props)

        this.state = {
            error: ""
        }
    }
    handleLoginSubmit = (event) => {
        let { email, password } = event.target
        email = email.value
        password = password.value
        try{
            this.props.onRegisterSubmit(name, surname, email, password)
        } catch ({message}){
            this.setState({error : message})
        }
    }
    render(){
        return <section className="register">
        <h1>Register</h1>
        <form onSubmit={(event) => {
            event.preventDefault()
            this.props.onRegisterSubmit(event)
        }}>
            <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
            <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
            <input type="email" name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password" required minLength="8" />
            <button type='submit'>Submit</button>
             or <a href="" onClick={event => {
                 event.preventDefault()
                 this.props.onLogin()
                }}>Login</a>
        </form>
    </section>
}
}
