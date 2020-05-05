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

const { useState, useEffect } = React

function App() {
    const [view, setView] = useState('spinner')
    const [token, setToken] = useState(undefined)

    useEffect(() => {
        if (sessionStorage.token) {
            try {
                isUserAuthenticated(sessionStorage.token, (error, isAuthenticated) => {
                    if (error) throw error
                    if (isAuthenticated) {
                        setToken(sessionStorage.token)
                        setView('home')
                    } else {
                        sessionStorage.token = ''
                        setHashView('login')
                    }
                })
            } catch (error) {
                if (error) throw error
            }
        }
        else {
            const hash = location.hash.substring(1)

            if (hash === 'login' || hash == 'register') setHashView(hash)
            else {
                location.hash = ''
                setView('landing')
            }
        }
    }, [])

    const setHashView = view => {
        location.hash = view

        setView(view)
    }

    function handleGoToRegister() {
        setHashView('register')
    }
    function handleGoToLogin() {
        setHashView('login')
    }
    function handleGoToLanding() {
        location.hash = ''
        delete sessionStorage.token 
        setToken()
        setView('landing')
    }
    function handleLogin(token) {
        sessionStorage.token = token
        location.hash = ''
        setToken(token)
        setView('home')
    }

    return <>
        {view === 'load' && <Spinner />}
        {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
        {view === 'login' && <Login onSubmit={handleLogin} onRegister={handleGoToRegister} />}
        {view === 'register' && <Register onLogin={handleGoToLogin} />}
        {view === 'home' && <Home token={token} onLogout={handleGoToLanding} onLogin={handleGoToLogin}/>}
    </>
}