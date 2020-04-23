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

anchor.addEventListener('click', function (event) {
    //console.log(this, event, 'hola mundo')

    debugger // INSPECT this

    hello('Peter')
})

anchor.addEventListener('click', function (event) {
    //console.log(this, event, 'hello world')

    hello('Anna')
})

anchor.fireEvent('click')


// my business logic
function hello(name) {
    debugger // INSPECT this
    console.log(`Hello, ${name}!`)
}