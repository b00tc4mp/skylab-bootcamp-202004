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
// const {Component} = React

// class Users extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             users:undefined
//         }
//     }

//     handleSearch = query =>{
//         searchUsers(this.props.token, query, (error, users) => {
//             if(error) throw Error 

//             this.setState({users})

//         });

//     }

    




//     render() {
//         return <section>

//             <SearchUsers onSubmit = {this.handleSearch}/>
//             {this.state.users && <UserResults users={this.state.users} token={this.props.token}/>} 
        
//         </section>
        
//     }
  
// }

function Users({ onSearch, users, query, token, onUserSessionExpired }) {
    function handleSearch(query) {debugger
        try {
            searchUsers(token, query, (error, users) => {debugger
                if (error) {
                    if (error.message === 'invalid token')
                        onUserSessionExpired()
                    else throw error
                } else onSearch(users, query)
            })
        } catch (error) {
            throw error
        }

    }

    function handleToggleFollow() {
        handleSearch(query)
    }

    return <section className="users">
        <h2>Users</h2>

        <Search onSubmit={handleSearch} query={query} />
        {users && <UserResults users={users} token={token} onToggleFollow={handleToggleFollow} onUserSessionExpired={onUserSessionExpired} />}
    </section>
}