function fun() {
    var [a, b, c] = arguments

    console.log(a, b, c)
}

fun(1, 2, 3, 4, 5)
// 1 2 3

var values = [1, 'a', true]

fun(...values)
// 1 a true

function salute(name, ...values) {
    console.log('hello ' + name, values)
}

salute('Peter', 'chocolate', 'caramelo', 'libro')
// hello Peter (3) ["chocolate", "caramelo", "libro"]