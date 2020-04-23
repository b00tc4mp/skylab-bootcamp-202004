function A() {
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

        hello()
    })

    // my business logic
    function hello() {
        debugger // INSPECT this
        console.log(this)
    }

    this.anchor = anchor
}

const a = new A()

a.anchor.fireEvent('click')
// Window

// WHAT if this is a class instead?

class A {
    constructor() {
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

            hello()
        })

        // my business logic
        function hello() {
            debugger // INSPECT this
            console.log(this)
        }

        this.anchor = anchor
    }
}

const a = new A()

a.anchor.fireEvent('click')
// undefined