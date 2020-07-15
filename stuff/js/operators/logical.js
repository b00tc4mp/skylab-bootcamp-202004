function isTwo(a, b) {
    debugger
    return a + b === 2
}

function isFour(a, b) {
    debugger
    return a + b === 4
}

if (isTwo(1, 1) && isFour(2, 3)) console.log('yes')
//if (isTwo(1, 2) || isFour(2, 2)) console.log('yes')

// short-circuit

function hello(name) {
    console.log('Hello, ' + name + '!') 
}

var salute = true

salute && hello('Peter')