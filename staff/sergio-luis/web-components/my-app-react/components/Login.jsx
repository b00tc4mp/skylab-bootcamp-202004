
const {Component} = React;

class Login extends Component{
    constructor(props){
        super(props)

        this.state = { error :''}
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let {email,password} = event.target;

        email = email.value;
        password = password.value;

        try{
            authenticateUser(email,password,(error,token) => {
                if(error) return this.setState({error: error.message});

                this.props.onLogin(token);
            })
        }catch({message}){
            this.setState({error:message})
        }
    }

    render(){
        return <section className="login">
        <h2 className='login__title'>LOGIN</h2>
        <form action="" className="login__form" onSubmit={this.handleSubmit}>
            <input className="login__input" type="email" name='email' placeholder="E-Mail" required/>
            <input className="login__input" type="password" name='password' placeholder="Password" required/>
            <button className='login__button'>Submit</button>
            <a href="" onClick={event =>{
                event.preventDefault()
                this.props.onClick('register')
            }}>Register</a>
            {this.state.error && <Feedback message={this.state.error} level='error'/>}
        </form>
    </section>
    }
}