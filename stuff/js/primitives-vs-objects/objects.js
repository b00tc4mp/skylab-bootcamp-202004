var o = {}

o.name = 'Peter'

var p = o

p.name = 'John'

console.log(o.name)
console.log(p.name)

var q = { name: 'Mary' }

o = q

console.log(o.name)
console.log(p.name)

o.name = 'Anna'

console.log(q.name)
console.log(o.name)