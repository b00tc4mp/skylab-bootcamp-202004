// class Google extends Component {
//     constructor(message, level) {
//         super(`<section class="google">
//             <h2>Google</h2>
//         </section>`)

//         let _results

//         this.container.append(new Search(query => {
//             google(query, (error, results) => {
//                 if (error) throw error // TODO do something with error (feedback panel?) 

//                 if (!_results) {
//                     _results = new GoogleResults(results)

//                     this.container.append(_results.container)
//                 } else {
//                     const __results = _results

//                     _results = new GoogleResults(results)

//                     __results.container.replaceWith(_results.container)
//                 }
//             })
//         }).container)
//     }
// }

class Google extends Component {
    constructor() {
        super()

        this.state = {
            error: undefined,
            results: undefined
        }
    }

    handleSubmit = query => {
        debugger
        google(query, (error, results) => {
            if (error) this.setState({error: error.message})
            else{
                debugger
                this.setState = {results: results}
                console.log(results)
            }
        })


    }

    render() {
        return <section className="google">
            <h2>Google</h2>
            <Search onSubmit={this.handleSubmit}/>
            {this.state.error && <Feedback message={this.state.error} level={'error'} />} 
            {this.state.results && <GoogleResults results={this.state.results} />}

        </section>
    }
}