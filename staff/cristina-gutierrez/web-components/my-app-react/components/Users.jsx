const { Component } = React

class Users extends Component {
    handleSearch = (query) => {
        searchUsers(this.props.token, query, (error, results) => {
            if (error) throw error

            this.props.onSearch(results, query)
        })
    }

    render() {
        return <section className="users">
            <h2>Users</h2>

            <Search onSubmit={this.handleSearch} query={this.props.query} />
            {this.props.results && <Results users={this.props.results} token={this.props.token} />}
        </section>
    }
}