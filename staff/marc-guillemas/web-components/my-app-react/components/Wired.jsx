// class Wired extends Component {
//     constructor(onSubmit) {
//         super(`<section class="search">
//         <form>
//         <br>
//             <label for="news">Latest news about:</label>
//         <br>
//             <select name="news" id="news">
//             <option value="artificial-intelligence">Artificial Intelligence</option>
//             <option value="virtual-reality">Virtual Reality</option>
//             <option value="amazon">Amazon</option>
//             <option value="google">Google</option>
//             <option value="apple">Apple</option>

//             </select>
            // <button>👨🏻‍💻</button>
        // </form>
//         </section>`)

//         const form = this.container.querySelector('form')

//         form.addEventListener('submit', (event) => {
//             event.preventDefault()

//             const query = event.target.news.value
//             onSubmit(query)
//         })
//     }
// }
const {Component} = React;

class Wired extends Component {
    constructor(){
        super()
        
        this.state = {
            news:''
        }
    }
   
    handleSubmit = (event) =>{
        event.preventDefault()

        // consq
        // t query = event.target.news.value;

        wiredSearch((error,_news)=>{
            if(error) throw Error

            this.setState({news:_news})
        })

    }

    render(){
    return <section className="search">
        <form onSubmit={this.handleSubmit}>
             <br/>
            {/* <label htmlFor="news">Latest news about:</label>
            <br/>
            <select name="news" id="news">
                <option value="artificial-intelligence">Artificial Intelligence</option>
                <option value="virtual-reality">Virtual Reality</option>
                <option value="amazon">Amazon</option>
                <option value="google">Google</option>
                <option value="apple">Apple</option>
            </select>        */}
           <button>👨🏻‍💻</button>
        </form>
        {this.state.news && <WiredResults onPrint={this.state.news}/>}
        </section>
    }
}