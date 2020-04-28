

 const {Component} = React;

 class App extends Component{
     constructor(){
        super()


        this.state = {
        view: 'landing'
        }
     }    
    
    /* handleGoToRegister = () => this.setState({view: 'register'})
    handleGoToLogin = () => this.setState({view: 'login'}) */
    handleToGo = () => this.setState({view})

    render(){
        return <>
        <Landing view = {this.state.view} onChangeView = {this.handleToGo}/>
    {/* this.state.view === 'landing' && <Landing onRegister={this.handleGoToRegister}/>} 
        {this.state.view === 'register' && <Register />}
        {this.state.view === 'login' && <Login/>} */
    
    }
</>

}