class SearchGoogle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searched: ''
        }
    }
    handleSubmit = () => {
        event.preventDefault()
        let query = event.target.query.value
        google(query, function(data){this.setState({ searched: data})}
    }
    render() {
        return <section className="search-google">
            <form onSubmit = {this.handleSubmit}>
                <input type="text" name="query"/>
                <button>🔍</button>
                {this.state.searched && <ResultsGoogle input = {this.state.searched}/>}
            </form>
        </section>
    }
}

// const googleSearch = new SearchGoogle(query => {
//     google(query, (data) => {

//         if (!results) {
//             results = new ResultsGoogle(data)

//             this.container.appendChild(results.container)
//         } else {
//             const _results = results

//             results = new ResultsGoogle(data)

//             _results.container.replaceWith(results.container)
//         }
//     })

// })