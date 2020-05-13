const { Component } = React

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {error: ''}
    }

    handleSubmit = event => {
        event.preventDefault()

        let { username, email, password } = event.target

        username = username.value,
        email = email.value,
        password = password.value

        try {
            registerUser(username, email, password, error => {
                if (error) return this.setState({error: error.message})

                this.props.onLogin()
            })

        } catch ({ message }) {
           this.setState({error: message})
        }
    }

    handleLogin = event => {
        event.preventDefault()

        this.props.setHashView('login')
    }

    handleLanding = event => {
        event.preventDefault()

        this.props.onLanding()
    }

    render() {
        return <>
        <div className='section-container'>
            <div className='card-container'>
                <section className="card-container__section">
                    <h1 className='card-container__name card-container__title'>Register</h1>
                    <div className="card-container__frame-art-container">
                        <img className='card-container__frame-art' src='https://image.ibb.co/fqdLEn/nissa.jpg' alt='nissa art'/>
                    </div>
                    <h1 className="card-container__type card-container__title">Legendary Enchantment</h1>
                    <div className="card-container__form-container">
                        <form className='card-container__form' onSubmit={this.handleSubmit}>
                            <input className='card-container__form__item' type="text" name="username" placeholder="username" required patern="[A-Za-z]{1,20}" />
                            <input className='card-container__form__item' type="email" name="email" placeholder="e-mail" required />
                            <input className='card-container__form__item' type="password" name="password" placeholder="password" required minLength="8" />
                            <button className='card-container__form__item'>Submit</button>
                        </form>
                        {this.state.error && <Feedback message={this.state.error} level='error' />}
                        <div className="card-container__nav">
                            <a className="card-container__nav-item" href="" onClick={this.handleLogin}>Log in</a>
                            <a className="card-container__nav-item" href="" onClick={this.handleLanding}>Return to main page</a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        </>
    }


}