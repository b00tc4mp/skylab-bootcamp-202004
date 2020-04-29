// class Search extends Component {
//     constructor(onSubmit) {
//         super(`<section class="search">
//     <form>
//         <input type="text" name="query" placeholder="Find Users">
//         <button>🔎</button>
//     </form>
//     </section>`)

//         const form = this.container.querySelector('form')

//         form.addEventListener('submit', (event) => {
//             event.preventDefault()

//             const query = event.target.query.value

//             onSubmit(query)
//         })
//     }
// }
const {Component} = React

class Users extends Component {
    constructor(){
        super()
        this.state = {users:undefined}
    }

    handleSearch = query =>{ debugger
        const users = searchUsers(query);
        this.setState({users})

    }

    




    render() {
        return <section>

            <SearchUsers onSubmit = {this.handleSearch}/>
            {this.state.users && <Results users={this.state.users} loggedUser={this.props.user} />} 
        
        </section>
        
    }
  
}