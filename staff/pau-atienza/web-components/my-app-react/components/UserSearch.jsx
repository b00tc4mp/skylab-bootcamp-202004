class UserSearch extends Component{
    constructor(props){
        super(props)
        this.state = {
            error: '',
            searched: ''
        }
    }

    handleSubmit = (event)=>{
        event.preventDefault()
        let query = event.target.query.value
        try{
            let usersFound = searchUser(query)
            this.setState({searched: usersFound})
        }catch({message}){
            this.setState({error: message})
            console.log(message)
        }
    }

    render(){
        return <section className="search">
                <form onSubmit = {(event) =>{this.handleSubmit(event)}}>
                    <input type="text" name="query"/>
                    <button>🔍</button>
                    {this.state.searched  && <UserResult input = {this.state.searched}/>}
                </form>
                </section>
    }
}



// class Search extends Component {
//     constructor(onSubmit) {
//         super(`<section class="search">
//     <form>
//         <input type="text" name="query">
//         <button>🔍</button>
//     </form>
//     </section>`)

        
//     const form = this.container.querySelector('form')

//         form.addEventListener('submit', function (event) {
//             event.preventDefault()

//             const query = event.target.query.value

//             onSubmit(query)
//         })
//     }
// }