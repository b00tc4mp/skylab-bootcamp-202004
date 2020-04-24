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

///

function Person(name) {
    this.name = name
}

Person.prototype.salute = function(name) {
    console.log(`${this.name}: Hello, ${name}!`)
}

var peter = new Person('Peter')

peter.salute('Anna')
// Peter: Hello, Anna!

/// WARN now

window.name = 'Window'

function Person(name) {
    this.name = name
}

Person.prototype.salute = name => {
    console.log(`${this.name}: Hello, ${name}!`)
}

var peter = new Person('Peter')

peter.salute('Anna')
/// Window: Hello, Anna!