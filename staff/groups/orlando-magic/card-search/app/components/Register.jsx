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
                if (error) return this.setState(error.message)

                this.props.onLogin()
            })

        } catch ({ message }) {
           this.setState(message)
        }
    }

    handleLogin = event => {
        event.preventDefault()

        this.props.onLogin()
    }

    handleLanding = event => {
        event.preventDefault()

        this.props.onLanding()
    }

    render() {
        return <>
        <div className='card-container'>
            <section className="register">
                <h1 className='name title'>Register</h1>
                <div className="frame-art-container">
                    <img className='frame-art' src='https://image.ibb.co/fqdLEn/nissa.jpg' alt='nissa art'/>
                </div>
                <h1 className="type title">Legendary Enchantment</h1>
                <div className="form-container">
                    <form className='form' onSubmit={this.handleSubmit}>
                        <input className='form__item' type="text" name="username" placeholder="username" required patern="[A-Za-z]{1,20}" />
                        <input className='form__item' type="email" name="email" placeholder="e-mail" required />
                        <input className='form__item' type="password" name="password" placeholder="password" required minLength="8" />
                        <button className='form__item'>Submit</button>
                    </form>
                </div>
            </section>
        </div>
        <a href="" onClick={this.handleLogin}>Log in</a>
        <a href="" onClick={this.handleLanding}>Return to main page</a>
        {this.state.error && <Feedback message={this.state.error} level='error' />}
        </>
    }


}