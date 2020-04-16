window.name = 'Window'

var o = {}

o.name = 'Peter'

var toString = function() { return 'I am ' + this.name; } // function toString() { ... }

o.toString = toString

console.log(o.toString())

o.name = 'Mary'

console.log(o.toString())

console.log(toString())

//toString = undefined

//console.log(o.toString())

var p = {}

p.name = 'John'

p.toString = toString

console.log(p.toString())

var q = { name: 'Anna' }

console.log(toString.apply(q))
console.log(toString.call(q))

var r = { name: 'Robert' }

console.log(toString.call(r))

