const f = () => 1

console.log(f())
// 1

// and now?

const f = () => { 1 }

console.log(f())
// undefined

// and now?

const f = () => { 
    // ...

    return 1 
}

console.log(f())
// 1