class Ecosia extends Components {
    constructor(props) {
        super(props)

        this.state = { ecosiaFind: undefined }

    }
    handleEcosia(query) {
        searchEcosia(query, (error, (results) => {
            this.setState({ ecosiaFind: results })

        }))
    }


    render() {
        return <section className="ecosia">
            <h2>Ecosia</h2>
            <Search onSubmit={this.handleEcosia} />
            {this.state.ecosiaFind && <EcosiaResults ecosiaFind={this.state.ecosiaFind} />}
        </section >
    }

}
