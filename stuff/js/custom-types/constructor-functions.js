function Person(name, surname) {
    this.name = name
    this.surname = surname
}

var peter = new Person('Peter', 'Grillo')
var john = new Person('John', 'Wayne')

console.log(peter)
console.log(john)

console.log(peter == john)