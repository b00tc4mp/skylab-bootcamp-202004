class Component {

    constructor(template){this.container = this.mount(template)}

    mount(template){
        temp = document.createElement('div')
        temp.innetHTML = template
        this.container = temp.firstChild
    }
}