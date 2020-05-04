
const { Component } = React


class User extends Component {
    constructor(){
    super()
  
    this.state = {
    users: undefined,
    query: undefined
  }  
  
  }
   


    handleSearch = query => {debugger
      searchUsers(query, this.props.token, (error,users) =>  { debugger
        if (error) console.log(error)

      this.setState({ users : users,
                      query : query})
                    })}
                    
      onToggleFollow = query => {debugger
      this.handleSearch(this.state.query)}
   
   
   
  render(){
   return <section className="users">
            <h2>Users</h2>
            <Search onSubmit = {this.handleSearch}/>
            {this.state.users && <Result users={this.state.users} onToggleFollow ={this.onToggleFollow} token = {this.props.token}/>}
        </section>
        
      }
    }

    