function Person(name, surname, gender) {
    this.name = name
    this.surname = surname
    this.gender = gender

/*
    this.dance = function() { // NO! define it the prototype
        console.log(this.name + ': 🕺')
    };
*/
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

Person.prototype.dance = function() {
    console.log(this.name + ': ' + (this.gender === '♀︎'? '💃' : '🕺')) // ♂︎
};

Person.prototype.toString = function() {
    return this.name + ' ' + this.surname;
};

var peter = new Person('Peter', 'Grillo', '♂︎')
var john = new Person('John', 'Wayne', '♂︎')
var mary = new Person('Mary', 'Garcia', '♀︎')

/*
peter.poo()
john.pee()
peter.fart()
peter.dance()
john.dance()
*/
/*
console.log(peter.poo === john.poo)
console.log(peter.dance === john.dance)
*/
peter.dance()
mary.dance()
// Peter: 🕺
// Mary: 💃
