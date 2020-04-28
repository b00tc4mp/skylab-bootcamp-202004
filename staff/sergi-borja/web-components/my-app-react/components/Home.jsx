class Home extends Component{
    constructor(props){
        super(props)

        this.state = {
            home: 'user'
        }
    }

    handleSearchBar = (input) => this.setState({home: input})

    render(){
        return <section className="home">
             <h1>Welcome, ${name}!</h1>
             <a href = '' onClick = {(event) =>{event.preventDefault()}}>Logout</a>
             <a href = '' onClick = {(event) =>{event.preventDefault(); this.handleSearchBar('user')}}>Users Search</a>
             <a href = '' onClick = {(event) =>{event.preventDefault(); this.handleSearchBar('google')}}>Google Search</a>
             <a href = '' onClick = {(event) =>{event.preventDefault(); this.handleSearchBar('hola')}}>Hola News</a>
                {this.state.view === 'user' && <UserSearch/>}
                {/* {this.state.view === 'google' && <GoogleSearch/>}
                {this.state.view === 'hola' && <HolaNews/>} */}
         </section>
    }
}

class UserSearch extends Component{

    constructor(props){
        super(props)

        this.state = {
            error: ''
        }
    }

    XXX = function(){}

    render(){
        return <section class="search">
    <form>
        <input type="text" name="query"/>
        <button>🔍</button>
    </form>
    </section>
    }
}

let results

        const searchUsersCont= new Search(query => {
            const users = searchUsers(query)

            if (!results) {
                results = new Results(users)

                this.container.appendChild(results.container)
            } else {
                const _results = results

                results = new Results(users)

                _results.container.replaceWith(results.container)
            }

        })


// class Home extends Component {
//     constructor(name, logout, toGoogle, toHola) {
//         super(`<section class="home">
//     <h1>Welcome, ${name}!</h1>
//     <button id="logout">Logout</button>
//     <button id="google">toGOOGLE</button>
//     <button id="hola">toHola</button>
// </section>`)

//         const buttonLogout = this.container.querySelector('#logout')
//         const buttonGoogle = this.container.querySelector('#google')
//         const buttonHola = this.container.querySelector('#hola')
//         buttonLogout.addEventListener('click', function () {
//             logout()
//         })
//         buttonGoogle.addEventListener('click', function () {
//             toGoogle()
//         })
//         buttonHola.addEventListener('click', function () {
//             toHola()
//         })

//         let results

//         const searchUsersCont= new Search(query => {
//             const users = searchUsers(query)

//             if (!results) {
//                 results = new Results(users)

//                 this.container.appendChild(results.container)
//             } else {
//                 const _results = results

//                 results = new Results(users)

//                 _results.container.replaceWith(results.container)
//             }

//         })

//         this.container.appendChild(searchUsersCont.container)
//     }
// }