const net = require('net')
const readline = require('readline')

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const socket = net.createConnection({ host: 'localhost', port: 8080 }, () => {
    askFrom(name => {
        socket.write(`FROM: ${name}`)

        askToMessage(toMessage => {
            socket.write(toMessage)
        })
    })
})

function askFrom(callback) {
    interface.question('from? ', callback)
}

function askToMessage(callback) {
    interface.question('to: message? ', callback)
}

socket.on('data', data => {
    console.log(`
${data.toString()}`)

    askToMessage(toMessage => {
        socket.write(toMessage)
    })
})