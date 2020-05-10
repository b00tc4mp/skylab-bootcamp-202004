const { Component } = React

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {error: ''}
    }

    handleSubmit = event => {
        event.preventDefault()

        let {email, password} = event.target

        email = email.value
        password = password.value

        try {
            authenticateUser(email, password, (error, token) => {
                if (error) return this.setState({error: error.message})

                retrieveUser(token, (error) => {
                    if (error) return this.setState({error: error.message})
                    else this.props.onSubmit(token)
                })
            })

        } catch ({ message }) {
            this.setState({error: message})
        }
    }
    
    handleRegister = event => {
        event.preventDefault()

        this.props.onRegister()
    }

    handleLanding = event => {
        event.preventDefault()

        this.props.onLanding()
    }

    render() {
        return <>
        <div className='section-container'>
            <div className='login-card-container'>
                <section className="menu-title">
                    <h1 className='name title'>Login</h1>
                    <div className="frame-art-container">
                        <img className='frame-art' src='https://i.pinimg.com/originals/0a/32/77/0a3277ef0b12f7ae989ef690ea022f24.jpg' alt='jace art'/>
                    </div>
                    <h1 className="type title">Legendary Enchantment</h1>
                    <div className="form-container">
                        <form className='form' onSubmit={this.handleSubmit}>
                            <input className='form__item' type="email" name="email" placeholder="e-mail" required />
                            <input className='form__item' type="password" name="password" placeholder="password" required minLength="8" />
                            <button className='form__item'>Submit</button>
                        </form>
                        {this.state.error && <Feedback message={this.state.error} level='error' />}
                        <div className="nav">
                            <a className="nav__item" href="" onClick={this.handleRegister}>Register</a>
                            <a className="nav__item" href="" onClick={this.handleLanding}>Return to main page</a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        </>
    }
}