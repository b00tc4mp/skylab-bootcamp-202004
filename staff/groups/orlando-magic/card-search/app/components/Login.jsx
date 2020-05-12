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
                <section className="card-container__section">
                    <h1 className='card-container__name card-container__title'>Login</h1>
                    <div className="card-container__frame-art-container">
                        <img className='card-container__frame-art' src='https://i.pinimg.com/originals/0a/32/77/0a3277ef0b12f7ae989ef690ea022f24.jpg' alt='jace art'/>
                    </div>
                    <h1 className="card-container__type card-container__title">Legendary Enchantment</h1>
                    <div className="card-container__form-container">
                        <form className='card-container__form' onSubmit={this.handleSubmit}>
                            <input className='card-container__form-item' type="email" name="email" placeholder="e-mail" required />
                            <input className='card-container__form-item' type="password" name="password" placeholder="password" required minLength="8" />
                            <button className='card-container__form-item'>Submit</button>
                        </form>
                        {this.state.error && <Feedback message={this.state.error} level='error' />}
                        <div className="card-container__nav">
                            <a className="card-container__nav-item" href="" onClick={this.handleRegister}>Register</a>
                            <a className="card-container__nav-item" href="" onClick={this.handleLanding}>Return to main page</a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        </>
    }
}