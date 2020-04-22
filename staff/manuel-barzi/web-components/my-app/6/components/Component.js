function Component(template) {
    this.container = this.mount(template)
}   

Component.prototype.mount = function(template) {
    const temp = document.createElement('div')

    temp.innerHTML = template

    return temp.firstChild
}