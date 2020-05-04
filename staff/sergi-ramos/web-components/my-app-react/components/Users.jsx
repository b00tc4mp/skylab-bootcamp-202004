class Users extends Component {

    constructor() {
        super()

        this.state = { users: undefined, 
        }
    }


    handleSubmit = (query) => {
        const users = searchUsers(query, this.props.token,this.props.following, (error, users) => {
            if (error) console.log(error) //TODO feedaback
            else this.setState({ users })
        })
    }
    handleOnFollowing = (username) => {
        toggleFollowUser(this.state.users,username, this.props.token, (error, novale, isFollowed ) => {
            if (error) console.log(error) //TODO feedback
            this.setState({isFollowed})
        })
    }


    render() {
        return <section className="users">
            <h2>Users</h2>
            <Search onSubmit={this.handleSubmit} />
            {this.state.users && <Results user={this.state.users} onSubmitFollowing={this.handleOnFollowing} isFollowed={this.state.isFollowed} />}

        </section>

    }
}


