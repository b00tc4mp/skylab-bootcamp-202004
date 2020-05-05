// class Home extends Component {
//     constructor(props) {
//         super(props)
        
//         this.state = {
//             view: 'users',
//             usersResults: undefined,
//             usersQuery: undefined,
//             usersError: undefined,
//             googleResults: undefined,
//             googleError: undefined,
//             googleQuery: undefined
//         }
//     }

//     displayView = view => {this.setState({ view:view })}

//     handleUsers = event => {
//         event.preventDefault()
                
//         this.displayView('users')
//     }

//     handleGoogle = event => {
//         event.preventDefault()
                
//         this.displayView('google')
//     }

//     handleNews = event => {
//         event.preventDefault()
    
//         this.displayView('news')
//     }

//     handleTwitter = event => {
//         event.preventDefault()
    
//         this.displayView('twitter')
//     }

//     handleSearchUsers = query => {
//         searchUsers(this.props.token, query, (error, users) => {
//             if (error) this.setState({errorUsers: error.message})
//             else this.setState({usersResults: users})
//         })
//         this.setState({usersQuery: query})
//     }

//     handleGoogleSearch = query => {
//         google(query, (error, results) => {
//             if (error) this.setState({googleError: error.message})
//             else this.setState({googleResults: results})
//         })
//         this.setState({googleQuery: query})
//     }

//     handleToggle = id => {
//         toggleFollowUser(this.props.token, id, error => {
//             if (error) this.setState({errorUsers: error.message})
//             else {
//                 searchUsers(this.props.token, this.state.usersQuery, (error, users) => {
//                     if (error) this.setState({errorUsers: error.message})
//                     else this.setState({usersResults: users})
//                 })
//             }
//         })
//     }

//     render() {
//         return <section className="home">
//             <h1>Welcome, {this.props.name}!</h1>
//             <a className={`home__link ${this.state.view === 'users' ? 'home__link--active' : '' }`} href="" onClick={this.handleUsers}> Users </a>
//             <a className={`home__link ${this.state.view === 'google' ? 'home__link--active' : '' }`} href="" onClick={this.handleGoogle}> Google </a>
//             <a className={`home__link ${this.state.view === 'news' ? 'home__link--active' : '' }`} href="" onClick={this.handleNews}> Hola News </a>
//             <a className={`home__link ${this.state.view === 'twitter' ? 'home__link--active' : '' }`} href="" onClick={this.handleTwitter}> Twitter </a>
//             <button onClick={() => {
//                 this.props.onLogout()
//             }}>Logout</button>

//             {this.state.view === 'users' && <Users usersResults={this.state.usersResults} handleSearchUsers={this.handleSearchUsers} query={this.state.usersQuery} handleToggle={this.handleToggle} errorUsers={this.state.errorUsers}/>}
//             {this.state.view === 'google' && <Google googleResults={this.state.googleResults} googleError={this.state.googleError} handleGoogleSearch={this.handleGoogleSearch} query={this.state.googleQuery}/>}
//             {this.state.view === 'news' && <HolaNews />}
//             {this.state.view === 'twitter' && <Tweet token={this.props.token}/>} 
//         </section>
//     }

// }  


function Home({name, token, onLogout}) {
    const [view, setView] = useState('users')
    const [usersResults, setUsersResults] = useState(undefined)
    const [usersQuery, setUsersQuery] = useState(undefined)
    const [usersError, setUsersError] = useState(undefined)
    const [googleResults, setGoogleResults] = useState(undefined)
    const [googleError, setGoogleError] = useState(undefined)
    const [googleQuery, setGoogleQuery] = useState(undefined)

    function handleUsers(event) {
        event.preventDefault()
                
        setView('users')
    }

    function handleGoogle(event) {
        event.preventDefault()
                
        setView('google')
    }

    function handleNews(event) {
        event.preventDefault()
    
        setView('news')
    }

    function handleTwitter(event) {
        event.preventDefault()
    
        setView('twitter')
    }

    function handleSearchUsers(query) {
        searchUsers(token, query, (error, users) => {
            if (error) setUsersError(error.message)
            else setUsersResults(users)
        })
        setUsersQuery(query)
    }

    function handleGoogleSearch(query) {
        google(query, (error, results) => {
            if (error) setGoogleError(error.message)
            else setGoogleResults(results)
        })
        setGoogleQuery(query)
    }

    function handleToggle(id) {
        toggleFollowUser(token, id, error => {
            if (error) this.setState({errorUsers: error.message})
            else {
                searchUsers(token, usersQuery, (error, users) => {
                    if (error) setUsersError(error.message)
                    else setUsersResults(users)
                })
            }
        })
    }

    return <section className="home">
            <h1>Welcome, {name}!</h1>
            <a className={`home__link ${view === 'users' ? 'home__link--active' : '' }`} href="" onClick={handleUsers}> Users </a>
            <a className={`home__link ${view === 'google' ? 'home__link--active' : '' }`} href="" onClick={handleGoogle}> Google </a>
            <a className={`home__link ${view === 'news' ? 'home__link--active' : '' }`} href="" onClick={handleNews}> Hola News </a>
            <a className={`home__link ${view === 'twitter' ? 'home__link--active' : '' }`} href="" onClick={handleTwitter}> Twitter </a>
            <button onClick={() => {
                onLogout()
            }}>Logout</button>

            {view === 'users' && <Users usersResults={usersResults} handleSearchUsers={handleSearchUsers} query={usersQuery} handleToggle={handleToggle} errorUsers={usersError}/>}
            {view === 'google' && <Google googleResults={googleResults} googleError={googleError} handleGoogleSearch={handleGoogleSearch} query={googleQuery}/>}
            {view === 'news' && <HolaNews />}
            {view === 'twitter' && <Tweet token={token}/>} 
        </section>
}