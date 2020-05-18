class Component{
    constructor(template) {
        this.container = this.create(template)
    }

    create(template) {
        const temp = document.createElement('div')
        temp.innerHTML = template
        return temp.firstChild //first child because is the firs element iside de div we just created we are intersted 
    }
}