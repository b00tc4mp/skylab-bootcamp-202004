var o = { a: { b: {}, c: { d: [1, true, 'hello world'] } }, b: [1, 2, { ciao: 'ciao mondo' }], c: function() { return 'hola mundo' } }

var { a: { c: { d: [,, helloworld] } }, b: [,,{ciao: ciaomondo}], c: holamundo } = o

console.log(helloworld, ciaomondo, holamundo())

//

var o = { x: 1, y: 2 }

var { x, y, z = 10 } = o

console.log(x, y, z)
// 1 2 10

var p = { x: 1, y: 2, z: 3 }

var { x, y, z = 10 } = p

console.log(x, y, z)
// 1 2 3

