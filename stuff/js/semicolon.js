/*function a() {
    return function() {
        console.log('hola mundo')
    }
}

a()()*/

///

console.log('hello world')

(function() {
    console.log('hola mundo')
})()
// hello world
// Uncaught TypeError: console.log(...) is not a function
//    at <anonymous>:13:1

///

console.log('hello world');

(function() {
    console.log('hola mundo')
})()
// hello world
// hola mundo