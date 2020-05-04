const { Component } = React

// class App extends Component {
//     constructor() {
//         super()

//         this.state = {
//             view: "landing",
//             name: undefined,
//             token: undefined,
//         }
//     }

//     handleGoToLogin = () => this.setState({ view: 'login' })

//     handleLogin = (name, token) => {
//         this.setState({ view: 'home', name, token})
//         if (following) this.setState({following})
//     }

//     handleGoToRegister = () => this.setState({ view: 'register' })

//     handleRegister = () => {this.setState({ view: 'login' })}

//     handleGoToHome = () => this.setState({ view: 'home' })

//     handleGoToLanding = () => this.setState({ view: 'landing' })

//     render() {
//         return <>
//             {this.state.view === 'landing' && <Landing onLogin={this.handleGoToLogin} onRegister={this.handleGoToRegister} />}
//             {this.state.view === 'login' && <Login onSubmit={this.handleLogin} onRegister={this.handleGoToRegister} />}
//             {this.state.view === 'register' && <Register onSubmit={this.handleRegister} onLogin={this.handleGoToLogin} />}
//             {this.state.view === 'home' && <Home name={this.state.name} token={this.state.token} following={this.state.following} onLogout={this.handleGoToLanding} />}
//         </>
//     }
// }

const { useState } = React

function App() {
    const [view, setView] = useState('landing')
    const [name, setName] = useState(undefined)
    const [token, setToken] = useState(undefined)

    function handleGoToRegister() {
        setView('register')
    }
    function handleGoToLogin() {
        setView('login')
    }
    function handleGoToLanding() {
        setView('landing')
    }
    function handleGoToHome()  {
        useState('home')
    }
    function handleLogin(name, token) {
        setView('home')
        setName(name)
        setToken(token)
    }

    return <>
        {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
        {view === 'login' && <Login onSubmit={handleLogin} onRegister={handleGoToRegister} />}
        {view === 'register' && <Register onLogin={handleGoToLogin} />}
        {view === 'home' && <Home name={name} token={token} onLogout={handleGoToLanding} />}
    </>
}