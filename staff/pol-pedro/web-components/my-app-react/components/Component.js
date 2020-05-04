class Component{
    constructor(template) {
        this.container = this.creat(template)
    }

    creat(template) {
        const temp = document.createElement('div')
        temp.innerHTML = template
        return temp.firstChild //first child because is the firs element iside de div we just created we are intersted 
    }
}