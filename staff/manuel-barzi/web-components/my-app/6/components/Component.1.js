function Component() {

}

Component.prototype.mount = function (template) {
    const temp = document.createElement('div')

    temp.innerHTML = template

    const container = temp.firstChild

    return container
};