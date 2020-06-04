const { Component } = React

class Google extends Component {
    handleSearch = (query) => {
        google(query, (error, results) => {
            if (error) throw error

            this.props.onSearch(results, query)
        })
    }

    render() {
        return <section className="google">
            <h2>Google</h2>

            <Search onSubmit={this.handleSearch} query={this.props.query} />
            {this.props.results && <GoogleResults results={this.props.results} />}
        </section>
    }
}