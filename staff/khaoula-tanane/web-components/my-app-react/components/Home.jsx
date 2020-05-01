class Home extends Component{
    constructor(props){
        super()

        this.state = {
            foundUsers: [],
            view: 'search',
            error: null,
            user: null
        }  
    }

    componentDidMount(){
        console.log(retrieveUser)
        retrieveUser(this.props.token, (error, user) => {
            if (error) return this.setState({ error: error.message })
            this.setState({user})
        })
    }

    handleSearchUsers = (query) => {
        const foundUsers = searchUsers(query)
        this.setState({foundUsers})  
    }


    handleTweet = (event) => {
        event.preventDefault()
        let text = event.target.tweet.value
        tweet(this.props.user.email, text)
    }

    changeView = (view) => {
        this.setState({view})
    }


    render(){

        const {user} = this.state

        return <>
       { user && <section className="home">
        <h1>HOME: Welcome {user.name} </h1>


        <ul>
            <li onClick={()=> this.changeView('search')}>Search Users</li>
            <li onClick={()=> this.changeView('google')}>Google Search</li>
            <li onClick={()=> this.changeView('twitter')}>Twitter</li>
        </ul>


         {this.state.view === 'search' && (
             <>
             <Search onSubmit={this.handleSearchUsers}/>
             <UsersResults foundUsers={this.state.foundUsers}/>
            </>
         )}

         {this.state.view === 'google' && <Google />}
         {this.state.view === 'twitter' && <CreateTweet onSubmit={this.handleTweet}/> }

        </section>}
        {!user && <p>LOADING...</p>}
    </>
}
}