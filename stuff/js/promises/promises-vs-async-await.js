async function fun() { 
    //return 1
    throw Error(2)
}

fun()
    .then(console.log)
    .catch(console.error)

; (async () => {
    try {
        const result = await fun()

        console.log(result)
    } catch(error) {
        console.error(error)
    }
})()