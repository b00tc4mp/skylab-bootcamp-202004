// class Home extends Component {
//     constructor(name, onLogout) {
//         super(`<span> 
//         <h1>Welcome ${name}</h1>
//         <button>Log out</button>    
//         <br>
//         </span>`)

//         // const button = this.container.querySelectorAll('button')
//         // const {search, logout} = button

        
//         const button = this.container.querySelector("button");
//         button.addEventListener("click", (event) => {
//             event.preventDefault();
//             onLogout();
//         })

//         let results


//         this.container.appendChild(new Search(query => {
//             const users = searchUsers(query)

//             if (!results) {
//                 results = new Results(users)

//                 this.container.appendChild(results.container)
//             } else {
//                 const _results = results

//                 results = new Results(users)

//                 _results.container.replaceWith(results.container)
//             }
//         }).container)



//         let googleResults
//         this.container.appendChild(new Google(query => {
            
//             googleSearch(query, (error, data)  => {
//                 if (!googleResults) {
//                     googleResults = new GoogleResults(data)
    
//                     this.container.appendChild(googleResults.container)
//                 } else {
//                     const _googleResults = googleResults
    
//                     googleResults = new GoogleResults(data)
    
//                     _googleResults.container.replaceWith(googleResults.container)
//                 }
//             }) 

           
//         }).container)

//         let wiredResults
//         this.container.appendChild(new Wired(query => {

//             wiredSearch(query, (error, data)  => {
//                 if (!wiredResults) {
//                     wiredResults = new WiredResults(data)
    
//                     this.container.appendChild(wiredResults.container)
//                 } else {
//                     const _wiredResults = wiredResults
    
//                     wiredResults = new WiredResults(data)
    
//                     _wiredResults.container.replaceWith(wiredResults.container)
//                 }
//             }) 

           
//         }).container)
       

//     }
// }
const {Component} = React

class Home extends Component {
    constructor(props) { // props = {user, }{user}
        super(props)

        
        this.state = {
            view: 'feed'
        }

    }

    changeView = (_view) => this.setState({view: _view})

    debugger
    render() {
        return <>
        
        <h1>Welcome, {this.props.user.name}!</h1>
        
        <Navbar onChangeView={this.changeView}/>

        {this.state.view === 'users' && <Users user={this.props.user} />}
        {this.state.view === 'google' && <Google/>}
        {this.state.view === 'wired' && <Wired/>}
        {this.state.view === 'feed' && <Feed loggedUser={this.props.user} />}
    </>
    }
}