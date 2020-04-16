function person(name) {
    return function() { // new Function...
        return 'i am ' + name
    }
}

var peter = person('Peter')
var mary = person('Mary')

console.log(peter())
console.log(mary())