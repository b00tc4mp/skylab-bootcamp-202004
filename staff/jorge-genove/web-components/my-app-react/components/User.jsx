
const { Component } = React


class User extends Component {
    constructor(){
    super()
  
    this.state = {
    users: undefined
  }  
  
  }
    onFollow = (username) => {
      toggleFollowUser(username, this.props.token, this.props.useremail, (error) => {
        if(error) console.log(error)
      })
    }


    handleSearch = query => {debugger
      searchUsers(query, this.props.token, (error,users) =>  { 
        if (error) console.log(error)

      this.setState({ users : users})
    })}
   render(){
   return <section className="users">
            <h2>Users</h2>
            <Search onSubmit = {this.handleSearch}/>
            {this.state.users && <Result users={this.state.users} onFollow ={this.onFollow}/>}
        </section>
        
      }
    }

    