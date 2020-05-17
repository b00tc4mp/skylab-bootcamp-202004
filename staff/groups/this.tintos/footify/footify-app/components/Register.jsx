const { Component } = React

class Register extends Component {
    constructor(props){
        super(props)

        this.state = {
            error:''
        }
    }

    handleGoToLogin = () => {
        event.preventDefault()
        this.props.onGoToLogin()}
    handleGoToLanding = () => {
        event.preventDefault()
        this.props.onGoToLanding()
    }

    handleSubmitRegister = (event) =>{
        event.preventDefault()

        let{name,surname,email,password,confirmPassword} = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value
        confirmPassword = confirmPassword.value

        try{
            registerUser(name,surname,email,password,confirmPassword, (error) =>{
                if(error) return this.setState({error:error.message})

                this.props.onGoToLogin()
            })
        }catch({message}){
            this.setState({error:message})
        }

    }

    render() {
        return <>
        <section className="register">
            <div className="register__container">
                <div className="register__logo">
                    <img src="img/logo.svg" className="register__logo-item" />
                </div>
                <form className="register__input" onSubmit={this.handleSubmitRegister}>
                    <h1 className="register__title">REGISTER</h1>
                    <input type="text" name="name" className="register__input-item" placeholder="name*" />
                    <input type="text" name="surname" className="register__input-item" placeholder="surname*" />
                    <input type="text" name="email" className="register__input-item" placeholder="email*" />
                    <input type="password" name="password" className="password" className="register__input-item" placeholder="password*" />
                    <input type="password" name="confirmPassword" className="password" className="register__input-item" placeholder="confirm password*" />
                    <button className="register__input-button">REGISTER</button>
                    {this.state.error && <Feedback message={this.state.error} level="register" />}
                </form>
                <div className="register__goto">
                    <a href="" onClick={this.handleGoToLanding}><img src="img/arrow_left.svg" alt="go-to-landing" className="register__goto-landing" /></a>
                    <p className="register__goto-text-landing">landing</p>
                    <p className="register__goto-text-login">login</p>
                    <a href="" onClick={this.handleGoToLogin}><img src="img/arrow_right.svg" alt="go-login" className="register__goto-login" /></a>
                </div>
            </div>
        </section>
        </>
    }
}