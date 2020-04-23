window.name = 'Window'

const f = () => console.log(this.name)

f()
// Window

const peter = { name: 'Peter' }

f.call(peter)
// Window

window.name = 'Window'

// WHAT happens when `this` is not used inside an arrow? where does it point to?

//const f = () => console.log(this.name)
const f = () => {
    debugger // INSPECT this
    console.log('hola mundo')
}

f()

const peter = { name: 'Peter' }

f.call(peter)
