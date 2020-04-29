class Home extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            view: 'users'
        }
    }

    displayView = view => {this.setState({ view:view })}

    render() {
        return <section className="home">
            <h1>Welcome, {this.props.name}!</h1>
            <a className="home__link" href="" onClick={ event => {
                event.preventDefault()
                
                this.displayView('users')
            }}>Users</a>
            <a className="home__link" href="" onClick={ event => {
                event.preventDefault()
                
                this.displayView("google")
            }}>Google</a>
            <a className="home__link" href="" onClick={ event => {
                event.preventDefault()
                
                this.displayView('news')
            }}>Hola News</a>
            <button onClick={() => {
                this.props.onLogout()
            }}>Logout</button>
            {this.state.view === 'users' && <Users />}
            {this.state.view === 'google' && <Google />}
            {this.state.view === 'news' && <HolaNews />}
        </section>
    }

}    

