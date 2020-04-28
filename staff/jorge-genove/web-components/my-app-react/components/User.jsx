
const { Component } = React


class User extends Component {
    constructor(){
    super()
  
    this.state = {
    user: undefined
  }  
  
  }

    handleSearch = query => {debugger
      const user = searchUsers(query)

      this.setState({user})
    }
   render(){
   return <section className="users">
            <h2>Users</h2>
            <Search onSubmit = {this.handleSearch}/>
            {this.state.user && <Result user={this.state.user}/>}
        </section>
        
      }
    }

    