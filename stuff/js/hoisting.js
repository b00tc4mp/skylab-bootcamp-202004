"use strict";

var a = 1

console.log(a)
// 1

// ex 2

"use strict";

var a

console.log(a)
// undefined

a = 1

// ex 3

"use strict";

console.log(a)
// ReferenceError

a = 1

// ex 4

"use strict";

console.log(fun())
// hello world

function fun() { return 'hello world' }
//var fun = function() { return 'hello world' }

// ex 5

"use strict";

console.log(fun())
// TypeError: fun is not a function

//function fun() { return 'hello world' }
var fun = function() { return 'hello world' }

// ex 6

"use strict";

console.log(fun())
// ReferenceError: fun is not defined

//function fun() { return 'hello world' }
fun = function() { return 'hello world' }