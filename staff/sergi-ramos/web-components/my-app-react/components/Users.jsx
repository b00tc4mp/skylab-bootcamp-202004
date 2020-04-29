class Users extends Component {

    constructor() {
        super()

        this.state = { users: undefined }
    }

    handleSubmit = (query) => {
        const users = searchUser(query)
        this.setState({users})
    }


    render() {
        return <section className="users">
            <h2>Users</h2>
            <Search onSubmit={this.handleSubmit} />
            {this.state.users && <Results user={this.state.users}/> }
            
        </section>

    }
}


