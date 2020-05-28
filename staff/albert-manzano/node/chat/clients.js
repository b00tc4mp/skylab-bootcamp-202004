const net = require('net')
const readline = require('readline')

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const socket = net.createConnection({ host: 'localhost', port: 8080 }, () => {
    askUser(name => {
        socket.write(`from: ${name}`)
    })
})

function askUser() {
    interface.question('Who are you? ', callback)
}

function askTo(){
    interface.question
}


socket.on('data', data => {
    console.log(data.toString())

    ask()
})