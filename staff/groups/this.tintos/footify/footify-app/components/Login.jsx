
const { Component } = React

class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            error: ''
        }
    }
    
    handleGoToLanding = (event) => {
        event.preventDefault()
        this.props.onGoToLanding()
    }
    handleGoToRegister = (event) => {
        event.preventDefault()
        this.props.onGoToRegister()
    }

    handleSubmitLogin = (event) => {


        event.preventDefault()

        const username = event.target.username.value
        const password = event.target.password.value
        try {
            authenticateUser(username, password, (error, token) => {
                if (error) return this.setState({error: error.message})
            
                this.props.onGoToHome(token)
            })
        } catch ({ message }) {
            this.setState({error: message})
        }
    }

    render(){
        return <>
        <section className="login">
            <div className="login__container">
                <div className="login__logo">
                    <img src="img/logo.svg" className="login__logo-item" />
                </div>

                <form className="login__input" onSubmit={this.handleSubmitLogin}>
                    <h1 className="login__title">LOGIN</h1>
                    <input type="text" name="username" className="login__input-item" placeholder="email*" />
                    <input type="password" name="password" className="login__input-item" placeholder="password*" />
                    <button className="login__input-button">LOGIN</button>
                    {this.state.error && <Feedback message={this.state.error} level="login" />}
                </form>

                <div className="login__goto">
                    <a href="" onClick={this.handleGoToLanding}><img src="img/arrow_left.svg" alt="go-to-landing" className="login__goto-landing" /></a>
                    <p className="login__goto-text-landing">landing</p>
                    <p className="login__goto-text-register">register</p>
                    <a href="" onClick={this.handleGoToRegister}><img src="img/arrow_right.svg" alt="go-login" className="login__goto-register" /></a>
                </div>
            </div>
        </section>
    </>
    }  
}