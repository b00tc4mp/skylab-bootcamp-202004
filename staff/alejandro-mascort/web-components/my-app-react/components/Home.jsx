class Home extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            view: 'users',
            usersResults: undefined,
            usersQuery: undefined,
            googleResults: undefined,
            googleError: undefined,
            googleQuery: undefined
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

    handleTwitter = event => {
        event.preventDefault()
    
        this.displayView('twitter')
    }

    handleSearchUsers = query => {
        searchUsers(this.props.token, query, (error, users) => {
            if (error) this.setState({errorUsers: error.message})
            else this.setState({usersResults: users})
        })
        this.setState({usersQuery: query})
    }

    handleGoogleSearch = query => {
        google(query, (error, results) => {
            if (error) this.setState({googleError: error.message})
            else this.setState({googleResults: results})
        })
        this.setState({googleQuery: query})
    }

    render() {
        return <section className="home">
            <h1>Welcome, {this.props.name}!</h1>
            <a className={`home__link ${this.state.view === 'users' ? 'home__link--active' : '' }`} href="" onClick={this.handleUsers}> Users </a>
            <a className={`home__link ${this.state.view === 'google' ? 'home__link--active' : '' }`} href="" onClick={this.handleGoogle}> Google </a>
            <a className={`home__link ${this.state.view === 'news' ? 'home__link--active' : '' }`} href="" onClick={this.handleNews}> Hola News </a>
            <a className={`home__link ${this.state.view === 'twitter' ? 'home__link--active' : '' }`} href="" onClick={this.handleTwitter}> Twitter </a>
            <button onClick={() => {
                this.props.onLogout()
            }}>Logout</button>

            {this.state.view === 'users' && <Users usersResults={this.state.usersResults} handleSearchUsers={this.handleSearchUsers} query={this.state.usersQuery}/>}
            {this.state.view === 'google' && <Google googleResults={this.state.googleResults} googleError={this.state.googleError} handleGoogleSearch={this.handleGoogleSearch} query={this.state.googleQuery}/>}
            {this.state.view === 'news' && <HolaNews />}
            {this.state.view === 'twitter' && <Tweet token={this.props.token}/>} 
        </section>
    }

}  



//-----------------------------------------------------------------


// class Home extends Component {
//     constructor(name, onLogout) {

//         super(`<section class="home">
//                 <h1'>Welcome ${name} !</h1>
//             <button>Log out</button>
//         </section>`)

//         const button = this.container.querySelector('button');

//         button.addEventListener('click', function () {
//             event.preventDefault();

//             onLogout()
//         });

//         let results

//         const search = new Search((request, requestGoogle, requestEcosia) => {
//             if (results) {
//                 this.container.removeChild(results.container);
//                 results = undefined
//             }
//             if (request) {
//                 const usersFound = searchUsers(request);
//                 results = new Results(usersFound);
//                 this.container.appendChild(results.container);
//             }

//             if (requestGoogle) {
//                 searchGoogle(requestGoogle, (error, listResults) => {
//                     results = new SearchResults(listResults);
//                     this.container.appendChild(results.container);
//                 })
//             }

//             if (requestEcosia) {
//                 searchEcosia(requestEcosia, (error, listResults) => {
//                     results = new SearchResults(listResults);
//                     this.container.appendChild(results.container);
//                 })
//             }
//         });

//         this.container.appendChild(search.container);

//         dailyNews(result =>{
//             const NewsResults = new News (result)
//             this.container.appendChild(NewsResults.container)
//         })

//     }
// }   
//------------------------------------------------------------------------------------------------------
// class Home extends Component {
//     constructor(props) {
//         super(props)


//         this.state = {
//             view: 'home',
//             errorUsers: undefined,
//             usersSearched: undefined,
//             tweets: undefined,
//             user: undefined
//         }
//     }
    
//     handleUsers = (event) => {
//         event.preventDefault()

//         this.setState({view: 'users'})
//     }

//     handleTweeter = (event) => {
//         event.preventDefault()

//         this.setState({view: 'tweeter'})
//     }

//     handleRetriveTweets = (event) => {
//         event.preventDefault()
//         const myTweets =  retrieveTweets(this.props.userEmail)

//         this.setState({tweets: myTweets, view: 'tweeter'})
//     }

//     handleGoToLogout = event => {
//         event.preventDefault();

//         this.props.onLogout()
//     }

//     handleSearchUsers = query => {
//         searchUsers(this.props.token, query, (error, users) => {
//             if (error) this.setState({errorUsers: error.message})
//             else this.setState({usersSearched: users})
//         })
//     }

//     render() {
//         return <section className="home">
//             <h1>Welcome {this.props.name}</h1>
//             <a className="home__link" href="" onClick = {this.handleUsers}>Users  </a>
//             <a className="home__link" href="">Google  </a>
//             <a className="home__link" href="">Ecosia  </a>
//             <a className="home__link" href="" onClick={this.handleRetriveTweets}>Tweeter </a>
//             <button onClick={this.handleGoToLogout}>Log out</button>

//             <News />
//             {this.state.view === 'users' && <Search onSubmit={this.handleSearchUsers}/>}
//             {this.state.view === 'users' && this.state.usersSearched && <Results results={this.state.usersSearched} />}
//             {this.state.view === 'users' && this.state.usersSearched && <Feedback message={this.state.errorUsers} level={'warning'}/>}
//             {this.state.view === 'tweeter' && <Tweeter tweetList = {this.state.tweets}/>}
//         </section>
//     }
// }