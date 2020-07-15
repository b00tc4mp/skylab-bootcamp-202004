console.log('process id', process.pid)

let count = 0
setInterval(() => console.log(`tick ${count++}`), 1000)