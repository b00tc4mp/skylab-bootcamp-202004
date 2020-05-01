const { Component } = React

class Users extends Component {
    constructor() {
        super()

        this.state = { users: undefined }
    }

    handleSearch = query => {
        const users = searchUsers(query)

        this.setState({ users })
    }

    render() {
        return <section className="users">
            <h2>Users</h2>

            <Search onSubmit={this.handleSearch} />
            {this.state.users && <Results users={this.state.users} />}
        </section>
    }
}