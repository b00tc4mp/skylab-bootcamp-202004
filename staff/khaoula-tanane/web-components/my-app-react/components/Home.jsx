class Home extends Component{
    constructor(props){
        super()

        this.state = {
            foundUsers: [],
            view: 'search',
            error: null,
            user: null,


        }  
    }

    componentDidMount(){
        retrieveUser(this.props.token, (error, user) => {
            if (error) return this.setState({ error: error.message })
            this.setState({user})
        })
    }



    handleSearchUsers = (query) =>  {
        searchUsers(this.props.token, query, (error, foundUsers) => {
            if(error) throw error
            this.setState({foundUsers})
    })}



    handleFollow = (followEmail) => {
        toggleFollowUser(this.props.token, followEmail, (error, email) => {
            if(error) throw error
            retrieveUser(this.props.token, (error, user) => {
                if (error) return this.setState({ error: error.message })
                this.setState({user})
            })
        })
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
             <Search onSubmit={this.handleSearchUsers} token={this.state.token}/>
             <UsersResults foundUsers={this.state.foundUsers} user={this.state.user} handleFollow={this.handleFollow} />
            </>
         )}

         {this.state.view === 'google' && <Google />}
         {this.state.view === 'twitter' && <Twitter token={this.props.token}/> }

        </section>}
        {!user && <p>LOADING...</p>}
    </>
}
}