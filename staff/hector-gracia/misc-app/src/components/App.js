import React from 'react';
import logo from '../logo.svg';
import './App.css';
import Landing from "./Landing"
import Login from "./Login"
import Register from "./Register"
const { Component } = React
const {registerUser,authenticateUser}=require("misc-client-logic")

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
            authenticateUser(email,password)
                .then(token=> console.log(token))
                .catch(error=>{
                    this.setState({error: error.message})
                })

        }catch(error){
            return this.setState({error: error.message})
        }
        
    }
    handleSubmitRegister=(name,surname,email,password)=>{
        try{
            registerUser(name,surname,email,password)
                .then(this.setState({view:"login"}))
                .catch(error=>{
                    this.setState({error: error.message})
                })
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
        {this.state.view==="landing" && <Landing onResgister={this.handleGoToRegister} onLogin={this.handleGoToLogin} />}
        {this.state.view==="login" && <Login onRegister={this.handleGoToRegister} onSubmit={this.handleSubmitLogin} />}
        {this.state.view==="register" && <Register onLogin={this.handleGoToLogin} onSubmit={this.handleSubmitRegister} />}
        </>
    }
}

export default App;
