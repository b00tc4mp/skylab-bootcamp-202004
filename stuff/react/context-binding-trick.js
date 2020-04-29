class Person {
    constructor(name) {
        this.name = name
    }

    hello(name) { console.log(`${this.name}: Hello, ${name}!`) }
}

const peter = new Person('Peter')

peter.hello('John')
// Peter: Hello, John!

const hello = peter.hello

hello('John')
// Uncaught SyntaxError: Identifier 'peter' has already been declared
//    at <anonymous>:1:1

///

class Person {
    constructor(name) {
        this.name = name

        this.hello = this.hello.bind(this)
    }

    hello(name) { console.log(`${this.name}: Hello, ${name}!`) }
}


const peter = new Person('Peter')

peter.hello('John')
// Peter: Hello, John!

const hello = peter.hello

hello('John')
// Peter: Hello, John!

///

class Person {
    constructor(name) {
        this.name = name

        //this.hello = this.hello.bind(this)
    }

    //hello(name) { console.log(`${this.name}: Hello, ${name}!`) }
    hello = name => { console.log(`${this.name}: Hello, ${name}!`) }
}

const peter = new Person('Peter')

peter.hello('John')
// Peter: Hello, John!

const hello = peter.hello

hello('John')
// Peter: Hello, John!