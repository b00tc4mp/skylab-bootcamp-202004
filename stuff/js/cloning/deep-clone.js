function Person(name) {
    if (typeof name !== 'string') throw new Error('no name provided')

    this.name = name
}

var a = new Array(new Person('Peter'), {a : 1}, {b: 2}, {c: 3})
//var a = []

a.self = a

function deepClone(target) {
    console.log('deepClone')

    //var result = new target.constructor()
    var result = Object.create(target)

    for (var key in target) {
        var value = target[key]

        if (value instanceof Object) {
            result[key] = value === target? result : deepClone(value) // CAUTION this is to avoid infinite loop cloning itself (but it only works in a first-level property)
        } else result[key] = value
    }

    return result
}

var b = deepClone(a)

console.log(b)

console.assert(b !== a, 'b is a different instance from a')
console.assert(b instanceof Array, 'b is an instance of Array, like a')
for (var key in b)
    console.assert(b[key] !== a[key], 'key ' + key + ' in b is a copy of the same key-value in a')