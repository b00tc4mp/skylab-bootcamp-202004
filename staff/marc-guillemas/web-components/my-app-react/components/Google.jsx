// class Google extends Component {
//     constructor(onSubmit) {
//         super(`<section class="search">
//         <form>
//             <input type="text" name="query" placeholder="Search Google">
//             <button>🌐</button>
//         </form>
//         </section>`)

//         const form = this.container.querySelector('form')

//         form.addEventListener('submit', (event) => {
//             event.preventDefault()

//             const query = event.target.query.value

//             onSubmit(query)
//         })
//     }
// }
const {Component} = React
class Google extends Component {
    constructor(){
        super()
        this.state = {data:undefined}
    }

    handleSearch = query => { debugger
        googleSearch(query, (error, data) => {
               try {
                   this.setState({data})
                } catch (error) {
                   console.log(error.message)
                } 
        })

    }

    render(){
        return <section>
            
            <SearchGoogle onSubmit = {this.handleSearch}/>
            {this.state.data && <GoogleResults data= {this.state.data} />}
            
        </section>
    }
  
} 