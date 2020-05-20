const net = require('net')
const readline = require('readline')

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const socket = net.createConnection({ host: 'localhost', port: 8080 }, () => {
    askFrom(name => {
        socket.write(`FROM: ${name}`)

        askTo(name => {
            askMessage(message => {
                socket.write(`${name}: ${message}`)
            })
        })
    })
})

function askFrom(callback) {
    interface.question('from?', callback)
}

function askTo(callback) {
    interface.question('to?', callback)
}

function askMessage(callback) {
    interface.question('message? ', callback)
}

socket.on('data', data => {
    console.log(`${data.toString()}`)

    askToMessage(toMessage => {
        socket.write(toMessage)
    })
})