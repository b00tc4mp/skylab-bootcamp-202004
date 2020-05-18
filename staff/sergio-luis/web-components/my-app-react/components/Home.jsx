
const {Component} = React;

class Home extends Component{
    constructor(){
        super()

        this.state ={
            view: 'users'

        }
    }
    componentDidMount(){
        try{
            retrieveUser(this.props.token,(error,user)=>{
                if(error) throw error
    
                this.setState({name : user.name})
            })
        }catch(error){
            throw error
        }
    }

    handleView = (input) => {
        this.setState({view:input})
    }
    handleSubmit =(query)=>{
        searchUsers(this.props.token,query,(error,users)=>{
            if(error) throw error;
            this.setState({users})
        })    
    }
    handleGoogle =(query)=>{
        searchGoogle(query,(error,resultsGoogle)=>{
            if(error) throw error
            this.setState({resultsGoogle})
        })
    }
   
    handleNews =()=>{
        searchNews((error,resultsNews)=>{
            if(error) throw error
            this.setState({resultsNews})
        })
    }
   
  
    render(){
        return <>
       <Navbar onClick={this.handleView} onLogout={this.props.onLogout} name={this.state.name}  />
       {this.state.view === 'users' && <Users onSubmit={this.handleSubmit} token={this.props.token} users={this.state.users}/>}
       {this.state.view === 'google' && <Google onSubmit={this.handleGoogle} results={this.state.resultsGoogle}/>}
       {this.state.view === 'news' && <News onSubmit={this.handleNews} results={this.state.resultsNews}/>}
       {this.state.view === 'twitter' && <Twitter />}
        </>

    }
}
