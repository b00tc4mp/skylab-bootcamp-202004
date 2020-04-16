function keepSafe(secret) {
    var __secret__ = secret

    return function(password) {
        return password === '123'? __secret__ : null
    }
}

var box = keepSafe('me gusta el chocolate de limon')

console.log(box.__secret__) // undefined

console.log(box('123'))