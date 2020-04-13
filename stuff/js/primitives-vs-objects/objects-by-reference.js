var o = { name: 'Peter' }
var p = o

var rename = function(person, name) {
    person.name = name
}

rename(o, 'John')

console.log(o.name)
console.log(p.name)