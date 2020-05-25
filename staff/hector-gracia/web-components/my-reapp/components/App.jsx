const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            view: 'landing',
            user: undefined,
            error: ""
        }
    }

    handleGoToRegister=()=>this.setState({view: "register"});
    handleGoToLogin=()=>this.setState({view: "login"});
    handleSubmitLogin=(email,password)=>{
        try{
            authenticateUser(email,password,(error,token)=>{
                if(error) return this.setState({error: error.message})
                retrieveUser(token,(error,user)=>{
                    this.setState({view: "navigation",user: user,token:token});                
                })
            });
        }catch(error){
            return this.setState({error: error.message})
        }
        
    }
    handleSubmitRegister=(name,surname,email,password)=>{
        try{
            registerUser(name,surname,email,password,(error)=>{ 
                if(error)this.setState({error: error.message})
            });
        }catch(error){
            console.log(error.message)
            this.setState({error: error.message})
        }
        this.handleGoToLogin();
    }
    handleOnLogOut=()=>{
        this.setState({view:"landing"})
    }
    render() {
        return <>
        {this.state.view==="landing" && <Landing onResgister={this.handleGoToRegister} onLogin={this.handleGoToLogin}/>}
        {this.state.view==="login" && <Login onSubmit={this.handleSubmitLogin} onRegister={this.handleGoToRegister}/>}
        {this.state.view==="register" && <Register onSubmit={this.handleSubmitRegister} onLogin={this.handleGoToLogin}/>}
        {this.state.view==="navigation" && <Navigation user={this.state.user} token={this.state.token} onLogOut={this.handleOnLogOut} />}
        </>
    }
}