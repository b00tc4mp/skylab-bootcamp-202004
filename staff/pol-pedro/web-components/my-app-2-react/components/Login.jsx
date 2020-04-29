
class Login extends Component{
    constructor(props) {
        super(props)

        this.state = {error: ''}
    }

    // || function ||

    logicLogin = (event) => {
        event.preventDefault()
        let {email, password} = event.target
        email = email.value
        password = password.value

        try {
            this.props.onSumbmit(email, password)
        } catch ({message}) {
               this.classButon = 'buton-cross'
               this.setState ({error: message})
        }
    }

    input = () => {
        this.classButon = undefined
        this.setState ({error: ''})
    }

    // || render ||

    render= () => {
        return <div className="login" onClick = { event => {
            this.props.onLanding()
        }}>
        <section className="login__container" onClick = { event => { event.stopPropagation()}}>
            <h1>Login</h1>
            <form onSubmit = {this.logicLogin} onInput = {this.input}>
                <label for="email">Email</label>
                <input type="email" name="email" placeholder="e-mail"/>
                <label for="password">Password</label>
                <input type="password" name="password" placeholder="password"/>
                <button className={this.classButon}>
                    Submit
                    {this.state.error && <Feedback message={this.state.error} level="error" />}
                </button>
                <a href="" onClick = { event => { 
                    event.preventDefault()
                    this.props.onRegister()
                }}>register</a>
            </form>
        </section>
    </div>
    }
}