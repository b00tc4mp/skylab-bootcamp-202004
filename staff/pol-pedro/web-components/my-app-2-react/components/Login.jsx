
class Login extends Component{
    constructor(props) {
        super(props)

        this.state = {error: ''}
    }

    // || render ||

    render= () => {
        return <div className="login" onClick = { event => {
            this.props.onLanding()
        }}>
        <section className="login__container" onClick = { event => { event.stopPropagation()}}>
            <h1>Login</h1>
            <form>
                <label for="email">Email</label>
                <input type="email" name="email" placeholder="e-mail"/>
                <label for="password">Password</label>
                <input type="password" name="password" placeholder="password"/>
                <button>Submit</button>
                <a href="" onClick = { event => { 
                    event.preventDefault()
                    this.props.onRegister()
                }}>register</a>
            </form>
        </section>
    </div>
    }
}