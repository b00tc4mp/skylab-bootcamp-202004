window.name = 'Window'

// my anchor (emulator)
const anchor = {
  listeners: {},

  addEventListener(eventName, listener) {
    (this.listeners[eventName] || (this.listeners[eventName] = [])).push(listener)
  },

  fireEvent(eventName) {
    const eventListeners = this.listeners[eventName]

    if (eventListeners)
      for (const i in eventListeners) {
        const listener = eventListeners[i]

        debugger // INSPECT this

        const event = { target: this }

        listener.call(this, event)
      }
  }
}

const anna = { name: 'Anna' }
const charles = { name: 'Charles' }

const helloFromAnna = hello.bind(anna)
const helloFromCharles = hello.bind(charles)

anchor.addEventListener('click', function (event) {
  debugger // INSPECT this

  hello('Peter') // Window: Hello, Peter!
  //hello.call(anna, 'Peter') // Anna: Hello, Peter!
  helloFromAnna('Peter')
  //hello.call(charles, 'Peter') // Charles: Hello, Peter!
  helloFromCharles('Peter')
})

anchor.fireEvent('click')


// my business logic
function hello(name) {
  debugger // INSPECT this
  console.log(`${this.name}: Hello, ${name}!`)
}

