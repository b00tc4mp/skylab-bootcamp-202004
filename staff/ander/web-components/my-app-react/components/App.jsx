/* function PeopleAndColors(props) {
    const { colors, people } = props

    // return <section>
    //     <List items={people} />
    //     <List items={colors} />
    // </section>

    return <>
        <List items={people} />
        <List items={colors} />
    </>
}

const { Component } = React

function Header({ view, onChangeView }) {
    return <header>
        <nav>
            <ul>
                <li>
                    <a className={`header-link ${view === 'home' ? 'header-link--active' : ''}`} href="" onClick={event => {
                        event.preventDefault()

                        onChangeView('home')
                    }}>Home</a>
                </li>

                <li>
                    <a className={`header-link ${view === 'about' ? 'header-link--active' : ''}`} href="" onClick={event => {
                        event.preventDefault()

                        onChangeView('about')
                    }}>About</a>
                </li>

                <li>
                    <a className={`header-link ${view === 'contact' ? 'header-link--active' : ''}`} href="" onClick={event => {
                        event.preventDefault()

                        onChangeView('contact')
                    }}>Contact</a>
                </li>
            </ul>
        </nav>
    </header>
}

function Home() {
    return <>
        <h1>Home</h1>

        <PeopleAndColors colors={colors} people={names} />
    </>
}

function About() {
    return <h1>About</h1>
}

function Contact() {
    return <h1>Contact</h1>
}
 */
const {Component} = React
class App extends Component {
    constructor() {
        super()

        this.state = {
            view: 'landing'
        }

        //this.handleChangeView = this.handleChangeView.bind(this)
    }

    // handleChangeView(view) {
    //     this.setState({ view })
    // }

    handleGoToLogin = () => this.setState({ view: "login" })
    handleGoToRegister = (name,surname,email,password) => this.setState({ view: "register" })
    
    handleGoToHome = () => this.setState({ view: "home" })
    handleGoToLanding = () => this.setState({ view: "landing" })

    render() {
        return <>
             {this.state.view === 'landing' && <Landing onlogin = {this.handleGoToLogin} onRegister={this.handleGoToRegister} />}
             {this.state.view === 'register' && <Register onSubmit = {this.handleGoToLogin} onlogin = {this.handleGoToLogin} />}
             {this.state.view === 'login' && <Login onSubmit = {this.handleGoToHome}  onRegister={this.handleGoToRegister}/>}
             {this.state.view === 'home' && <Home onLogout = {this.handleGoToLanding} />}
            
        </>
    }
}
ReactDOM.render(<App />, document.getElementById('root'))