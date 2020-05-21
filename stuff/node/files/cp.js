const fs = require('fs')

const [, , from, to] = process.argv

console.log('BEFORE', process.memoryUsage())

const rs = fs.createReadStream(from)
const ws = fs.createWriteStream(to)

// rs.on('data', chunk => ws.write(chunk))

// rs.on('end', () => {
//     ws.close()
//     rs.close()

//     console.log('AFTER', process.memoryUsage())
// })

// OR
rs.pipe(ws)

rs.on('end', () => {
    console.log('AFTER', process.memoryUsage())
})
