const { Component } = React

class App extends Component {
    constructor(){
        super()
        this.state = {
            view: 'load',
            token: undefined,
            error: undefined
        }
    }


    componentDidMount (){
        if(sessionStorage.token){
            try{

                isUserAuthenticated(sessionStorage.token , (error, isAuthenticated)=>{
                    if(error) this.setState({error:error.message})

                 
                    if(isAuthenticated){
                        this.setState({token: sessionStorage.token})
                        this.setState({view:'home'})
                    }else{
                        this.setState({view:'login'})
                    }
                })
            }catch({message}){
                this.setState({error:error.message})
            }
        }else{
            const hash = address.hash()

            if(hash === 'login' || hash === 'register') setHashView(view)
            else{
                address.hash.clear()

                this.setState({view:'landing'})
            }
            

        }
    }

    setHashView =(view)=>{
        if(view === 'landing'){
            address.hash.clear()
            this.setState({view})
        } else{
            address.hash(view)
            this.setState({view})
        }
    }

    handleGoToLogin =() =>{this.setState({view:'login'})}

    handleGoToRegister= () =>{ this.setState({view:'register'}) }

    handleGoToLanding= () =>{ this.setState({view:'landing'}) }

    handleOnGoToLogOut= () =>{
        this.setState({yoken:undefined})
        delete sessionStorage.token
        location.hash = ''
        this.setState({view:'landing'})
    }

    handleGoToHome = (token)=>{ 
        sessionStorage.token = token
        this.setState({token}) 
        this.setState({view:'home'})     

    } 
    
    handleUserSessionExpired= () => { this.setState({view:'login'})}

    render(){
        return <>
        {this.state.view === 'load' && <Spinner />}
        {this.state.view === 'landing' && <Landing onGoToLogin={this.handleGoToLogin} onGoToRegister={this.handleGoToRegister} />}
        {this.state.view === 'login' && <Login onGoToRegister={this.handleGoToRegister} onGoToLanding={this.handleGoToLanding} onGoToHome={this.handleGoToHome}/>}
        {this.state.view === 'register' && <Register onGoToLogin={this.handleGoToLogin} onGoToLanding={this.handleGoToLanding}/>}
        {this.state.view === 'home' && <Home token={this.state.token} onUserSessionExpired={this.handleUserSessionExpired} onGoToLogOut={this.handleOnGoToLogOut}/>}
        {this.state.error && <Feedback message={this.state.error} level="error" />}
    </>
    }


}


