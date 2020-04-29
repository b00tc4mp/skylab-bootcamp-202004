const { Component } = React

class Google extends Component {

    constructor(props) {
        super(props)

        this.state = { googleFind: undefined }
    }

    handleGoogle = (query) => {

        googleSearch(query, (error, results) => {debugger
            this.setState({ googleFind: results })
        })
    }

    render() {
        return <section className="google">
            <h2>Google</h2>
            <Search onSubmit={this.handleGoogle}/>
            {this.state.googleFind && <GoogleResults googleFind={this.state.googleFind} />}
        </section >
    }

}