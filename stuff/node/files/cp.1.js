const fs = require('fs')

const [, , from, to] = process.argv

console.log('BEFORE', process.memoryUsage())

fs.readFile(from, (error, content) => {
    if (error) throw error

    console.log('AFTER', process.memoryUsage())

    fs.writeFile(to, content, error => {
        if (error) throw error
    })  
})
