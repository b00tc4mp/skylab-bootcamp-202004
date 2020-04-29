const { Component } = React

class Google extends Component {
    constructor() {
        super()

        this.state = { results: undefined }
    }

    handleSearch = query => {
        google(query, (error, results) => {
            if (error) throw error // TODO do something with error (feedback panel?) 

            this.setState({ results })
        })
    }

    render() {
        return <section className="google">
            <h2>Google</h2>

            <Search onSubmit={this.handleSearch} />
            {this.state.results && <GoogleResults results={this.state.results} />}
        </section >
    }
}