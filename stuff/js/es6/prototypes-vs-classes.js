function A(name) {
    this.name = name
}

A.prototype.hello = function() { console.log('my name is ' + this.name + ', i am an instance of A') }

function B(name) {
    A.call(this, name)
}

B.prototype = Object.create(A.prototype)
B.prototype.constructor = B

B.prototype.hello = function() { console.log('my name is ' + this.name + ', i am an instance of B') }

a = new A('Anna')

//console.dir(a)
console.log(a.hello())

b = new B('Bob')

//console.dir(b)
console.log(b.hello())

// ES6

class A {
    constructor(name) {
        this.name = name
    }

    hello() { console.log('my name is ' + this.name + ', i am an instance of A') }
}


class B extends A {
    constructor(name) {
        super(name)
    }

    hello() { console.log('my name is ' + this.name + ', i am an instance of B') }
}

a = new A('Anna')

//console.dir(a)
console.log(a.hello())

b = new B('Bob')

//console.dir(b)
console.log(b.hello())