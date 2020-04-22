function Component(template) {
    const temp = document.createElement('div')

    temp.innerHTML = template

    this.container = temp.firstChild
}