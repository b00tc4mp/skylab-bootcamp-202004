const {Component} = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            view: 'landing'
        }
    }
}

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