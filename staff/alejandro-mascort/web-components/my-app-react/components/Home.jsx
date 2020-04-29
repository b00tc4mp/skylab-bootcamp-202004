class Home extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            view: 'users'
        }
    }

    displayView = view => {this.setState({ view:view })}

    handleUsers = event => {
        event.preventDefault()
                
        this.displayView('users')
    }

    handleGoogle = event => {
        event.preventDefault()
                
        this.displayView('google')
    }

    handleNews = event => {
        event.preventDefault()
                
        this.displayView('news')
    }

    render() {
        return <section className="home">
            <h1>Welcome, {this.props.name}!</h1>
            <a className={`home__link ${this.state.view === 'users' ? 'home__link--active' : '' }`} href="" onClick={this.handleUsers}> Users </a>
            <a className={`home__link ${this.state.view === 'google' ? 'home__link--active' : '' }`} href="" onClick={this.handleGoogle}> Google </a>
            <a className={`home__link ${this.state.view === 'news' ? 'home__link--active' : '' }`} href="" onClick={this.handleNews}> Hola News </a>
            <button onClick={() => {
                this.props.onLogout()
            }}>Logout</button>

            {this.state.view === 'users' && <Users />}
            {this.state.view === 'google' && <Google />}
            {this.state.view === 'news' && <HolaNews />}
        </section>
    }

}    

