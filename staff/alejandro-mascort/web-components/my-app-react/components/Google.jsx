// class Google extends Component {
//     constructor() {
//         super()

//         this.state = {
//             error: undefined,
//             results: undefined
//         }
//     }

//     handleSubmit = query => {
        
//         google(query, (error, results) => {
//             if (error) this.setState({error: error.message})
//             else this.setState({results: results})
//         })
//     }

//     render() {
//         return <section className="google">
//             <h2>Google</h2>
//             <Search onSubmit={this.handleSubmit}/>
//             {this.state.error && <Feedback message={this.state.error} level={'error'} />} 
//             {this.state.results && <GoogleResults results={this.state.results} />}
//         </section>
//     }
// }

function Google({googleResults, googleError, handleGoogleSearch, query}) {
    return <section className="google">
        <h2>Google</h2>
        <Search onSubmit={handleGoogleSearch} query={query} />
        {googleError && <Feedback message={googleError} level={'error'} />} 
        {googleResults && <GoogleResults results={googleResults} />}
    </section>    
}