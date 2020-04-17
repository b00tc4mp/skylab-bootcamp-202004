var log = console.log

console.__calls__ = []

function Call(stack, args) {
    this.stack = stack
    this.args = args
    this.time = new Date
}

console.log = function() {
    var stack = new Error().stack.split('\n')
    stack.splice(0, 1)
    
    this.__calls__.push(new Call(stack, arguments))

    log.apply(undefined, arguments)
}

console.log('hola', 'mundo', 'cruel')
console.log('hello', 'cruel', 'world')

function fun() {
    console.log('ciao', 'mondo', 'cruel')
}

fun()

setTimeout(function() {
    console.log('adeu', 'mon', 'cruel')
}, 1000) 

console.__calls__