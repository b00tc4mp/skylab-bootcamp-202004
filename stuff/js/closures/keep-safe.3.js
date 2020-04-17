function keepSafe(secret) {
    var __password__ = '123'
    var __secret__ = secret

    return function(password, newPassword) {
        if (typeof password !== 'string') throw new TypeError(password + ' is not a string')

        if (typeof newPassword !== 'undefined') {
            if (typeof newPassword !== 'string') throw new TypeError(newPassword + ' is not a string')
            
            if (password === __password__) __password__ = newPassword
            else throw new Error('wrong password')
        } else {
            if (password === __password__) return __secret__
            else throw new Error('wrong password')
        }
    }
}

var box = keepSafe('me gusta el chocolate de limon')

box('123', '567')
//console.log(box('123')) // ERROR
console.log(box('567'))

//var box2 = keepSafe('el padre de mi abuela paterna tenia una doble vida')