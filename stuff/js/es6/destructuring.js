var o = { a: { b: {}, c: { d: [1, true, 'hello world'] } }, b: [1, 2, { ciao: 'ciao mondo' }], c: function() { return 'hola mundo' } }

var { a: { c: { d: [,, helloworld] } }, b: [,,{ciao: ciaomondo}], c: holamundo } = o

console.log(helloworld, ciaomondo, holamundo())

///

var o = { x: 1, y: 2 }

var { x, y, z = 10 } = o

console.log(x, y, z)
// 1 2 10

var p = { x: 1, y: 2, z: 3 }

var { x, y, z = 10 } = p

console.log(x, y, z)
// 1 2 3

///

var o = { a: 1, b: 2, c: 3 }

/*var a = o.a
var b = o.b
var c = o.c*/

/*var { a, b, c } = o

console.log(a, b, c)*/

/*function f(obj) {
    var { a, b, c } = obj

    console.log(a, b, c)
}*/

function f({ a, b, c }) {
    console.log(a, b, c)
}

/*function f({ x, y, z }) {
    console.log(x, y, z)
}*/

//f(o)

var a = 1, b = 2, c = 3

f({ a, b, c })
// 1 2 3

f({ a, b })
// 1 2 undefined

///

var o = [ 1, 2, 3 ]

/*var a = o[0]
var b = o[1]
var c = o[2]*/

/*var [a, b, c] = o

console.log(a, b, c)*/

/*function f(obj) {
    var [ a, b, c ] = obj

    console.log(a, b, c)
}*/

/*function f([ a, b, c ]) {
    console.log(a, b, c)
}*/

function f([ x, y, z ]) {
    console.log(x, y, z)
}

//f(o)

var a = 1, b = 2, c = 3

//f([ a, b, c ])
// 1 2 3

f([ a, b ])
// 1 2 undefined

///

//var o = { a: 1, b: 2, c: 3 }
var o = { 0: 1, 1: 2, 2: 3, length: 3 }

var [a, b, c] = o

console.log(a, b, c)
// Uncaught TypeError: o is not iterable
//    at <anonymous>:4:17

///

var o = [1, 2, 3]

var { 0: a, 1: b, 2: c} = o

console.log(a, b, c)
// 1 2 3