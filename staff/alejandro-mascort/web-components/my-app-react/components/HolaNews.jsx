// class HolaNews extends Component{
//     constructor() {
//         super()

//         this.state = {
//             error: undefined,
//             results: undefined
//         }
//     }

//     componentDidMount() {
//         retrieveHolaNews((error, results) => {
//             if (error) this.setState({error: error.message})
//             else {
//                 let list = results.map(({image, link, text}) => <li><a href={link} target='_blank'><img src={image}/></a> <p>{text}</p></li>)
//                 this.setState({results: list})
//             }
//         })
//     }

//     render() {
//         return <section className="hola-news">
//             <h2>Hola News</h2>
//             {this.state.error && <Feedback message={this.state.error} level='error' />}
//             {this.state.results && <ul>{this.state.results}</ul>}
//         </section>
//     }
// }

function HolaNews() {
    const [error, setError] = useState(undefined)
    const [results, setResults] = useState(undefined)

    useEffect( () => {
        retrieveHolaNews((error, results) => {
            if (error) setError(error.message)
            else {
                let list = results.map(({image, link, text}) => <li key={link}><a href={link} target='_blank'><img src={image}/></a> <p>{text}</p></li>)
                setResults(list)
            }
        })
    })

    return <section className="hola-news">
        <h2>Hola News</h2>
        {error && <Feedback message={error} level='error' />}
        {results && <ul>{results}</ul>}
    </section>
}