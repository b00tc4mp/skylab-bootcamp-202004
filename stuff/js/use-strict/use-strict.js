// es5 - "normal mode"

function A(value) {
    this.value = value
}

A.prototype.print = function() {
    console.log(this.value)
}

var a = new A('whatever')

a.print()

var print = a.print

print() // 'whatever'

// es5 - "strict mode"

function A(value) {
    'use strict'

    this.value = value
}

A.prototype.print = function() {
    'use strict'

    console.log(this.value)
}

var a = new A('whatever')

a.print()

var print = a.print

print() // ERROR!

// es6 - "strict mode" (by default)

class A {
    constructor(value) {
        this.value = value
    }

    print() {
        console.log(this.value)
    }
}

var a = new A('whatever')

a.print()

var print = a.print

print() // ERROR