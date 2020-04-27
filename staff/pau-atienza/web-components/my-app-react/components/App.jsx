// class Component{
//     constructor(template){this.container = this.mount(template)}

//     mount(template){
//         const temp = document.createElement('div')
//         temp.innerHTML = template
//         return temp.firstChild
//     }
// }

const { Component } = React

class App extends Component{
    constructor() {
        super()

        this.state = {
            view: 'home'
        }
    }

    changeView = (input) => this.setState({view: input })

    // submitRegister = (event) => {
    //     event.preventDefault();
    //     let {name, surname, email, password} = event.target;
    //     name = name.value
    //     surname = surname.value
    //     email = email.value
    //     password = password.value
    //     try{
    //     registerUser(name,surname,email,password)
    //     } catch(error){
    //         console.log(error)
    //     }
    // }
    

    render(){
        return <>
            {this.state.view === 'landing' && <Landing callback = {this.changeView}/>}
            {this.state.view === 'register' && <Register callback = {this.changeView} uponRegister = {this.submitRegister}/>}
            {this.state.view === 'login' && <Login callback = {this.changeView}/>}
            {this.state.view === 'home' && <Home callback = {this.changeSearchBar}/>}
            {/* {this.state === 'login' && </>}
            {this.state === 'register' && </>}
            {this.state === '' && <Home/>}*/}
        </>
    }
}

// function App(){return <><Landing/></>}
