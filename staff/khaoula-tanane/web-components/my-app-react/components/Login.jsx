const { Component } = React

class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            error: null
        }
    }    

    handleLoginSubmit = (event) => {
        let { email, password } = event.target
        email = email.value
        password = password.value
        try{
            this.props.onSubmit(email, password)
            this.setState({user, view: 'home'})
        } catch (error){
            this.setState({error : message})
        }
    }


    render(){

        return <section className="login">
        <h1>Login</h1>
        <form onSubmit={(event) => {
            event.preventDefault()
            this.props.onLogin()
        }}>
            <input  name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password" required />
            <button type='submit'>Submit</button>
             or <a href="" onClick={event => {
                 event.preventDefault()
                 this.props.onRegister()
                }}>Register</a>
        </form>
    </section>
}
}