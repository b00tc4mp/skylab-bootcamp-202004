// class Component {
//     constructor(template) {
//         this.container = this.mount(template)
//     }

//     mount(template) {
//         const temp = document.createElement('div')

//         temp.innerHTML = template

//         return temp.firstChild
//     }
// }

const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            view: 'landing'
        }
    }

    handleView = (input) => this.setState({view: input})

    render(){
        return <>
            {this.state.view === 'landing' && <Landing callback={this.handleView}/>}
            {this.state.view === 'register' && <Register callback={this.handleView}/>}
            {this.state.view === 'login' && <Login callback={this.handleView}/>}
            {this.state.view === 'home' && <Home callback={this.handleView}/>}
            </>
    }
}


