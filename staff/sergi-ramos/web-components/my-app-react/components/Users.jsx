class Users extends Component {

    constructor() {
        super()

        this.state = { users: undefined,
            query: undefined 
        }
    }


    handleSubmit = (query) => {
        console.log(query)

        searchUsers(query, this.props.token,this.props.following, (error, users) => {
            if (error) console.log(error) //TODO feedaback
            else this.setState({ users, query })
        })
    }
    handleOnFollowing = (username) => {
        toggleFollowUser(this.state.users,username, this.props.token, (error, novale, isFollowed ) => { //TODO novale var
            if (error) console.log(error) //TODO feedback
           else this.handleSubmit(this.state.query)
           this.setState({isFollowed})
        })
    }
  


    render() {
        return <section className="users">
            <h2>Users</h2>
            <Search onSubmit={this.handleSubmit} />
            {this.state.users && <Results user={this.state.users} onSubmitFollowing={this.handleOnFollowing} onSubmitFollowingButton={this.handleOnFollowButton} />}

        </section>

    }
}


