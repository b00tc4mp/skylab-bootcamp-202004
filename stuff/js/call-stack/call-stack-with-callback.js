function normalize(name) {
    debugger
    return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()
}

function hello(name) {
    debugger
    return 'Hello, ' + name + '!'
}

function salute(from, to) {
    debugger
    console.log(normalize(from) + ': ' + hello(normalize(to)))
}


var names = ['anna', 'mary', 'jessica', 'vicky']

/*names.forEach(function(name) {
    debugger
    salute('peter', name)
})*/

function forEach(array, callback) {
    debugger
    for (var i in array) {
        debugger
        callback(array[i])
    }
}

forEach(names, function(name) {
    debugger
    salute('peter', name)
})
