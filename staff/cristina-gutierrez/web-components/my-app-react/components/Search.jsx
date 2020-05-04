const { Component } = React

class Search extends Component {
    handleSubmit = (event) => {
        event.preventDefault()

        this.props.onSubmit(event.target.query.value)
    }

    render() {
        return <section className="search">
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="query" defaultValue={this.props.query} />
                <button type="submit">🔍</button>
            </form>
        </section>
    }
}