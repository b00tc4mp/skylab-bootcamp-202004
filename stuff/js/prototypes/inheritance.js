function Person(name, surname, gender) {
    this.name = name
    this.surname = surname
    this.gender = gender
}

Person.prototype.fart = function() {
    console.log(this.name + ': 💨')
};

Person.prototype.poo = function() {
    console.log(this.name + ': 💩')
};

Person.prototype.pee = function() {
    console.log(this.name + ': 💦')
};

Person.prototype.toString = function() {
    return this.name + ' ' + this.surname + ' (' + this.gender + ')';
};

function Woman(name, surname) {
    Person.call(this, name, surname, '♀︎')
}

Woman.prototype = Object.create(Person.prototype)
Woman.prototype.constructor = Woman

Woman.prototype.giveBirth = function() {
    console.log(this.name + ': 👶🏻')
} 

function Man(name, surname) {
    Person.call(this, name, surname, '♂︎')
}

Man.prototype = Object.create(Person.prototype)
Man.prototype.constructor = Man

Man.prototype.monoDo = function() {
    console.log(this.name + ': 📺🍺') 
} 

var peter = new Man('Peter', 'Grillo')
var john = new Man('John', 'Wayne')
var mary = new Woman('Mary', 'Garcia')

console.log(peter.toString())
console.log(john.toString())
console.log(mary.toString())

console.log(peter.monoDo())
console.log(mary.giveBirth())

var anna = new Woman('Anna', 'Garcia')
var jessica = new Woman('Jessica', 'Garcia')

var people = [peter, john, mary, anna, jessica, { name: 'Alien', surname: '8 passenger' }]

console.table(people.filter(function(person) { return person instanceof Woman }))
console.table(people.filter(function(person) { return person instanceof Man }))
console.table(people.filter(function(person) { return person instanceof Person }))