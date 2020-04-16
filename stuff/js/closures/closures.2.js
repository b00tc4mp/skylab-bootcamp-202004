function person(name) {
    return {
        toString: function() {
            return 'i am ' + name
        },
        
        setName: function(_name) {
            name = _name
        }
    }
}

var peter = person('Peter')
var mary = person('Mary')

console.log(peter.toString())
peter.setName('John')
console.log(peter.toString())

console.log(mary.toString())
mary.setName('Anna')
console.log(mary.toString())