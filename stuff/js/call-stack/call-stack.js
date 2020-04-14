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

salute('peter', 'mary')