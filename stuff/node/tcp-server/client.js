const net = require('net')
const readline = require('readline')

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function ask() {
    interface.question('message? ', message => {
        client.write(message)
    })
}

const client = net.createConnection({ host: 'localhost', port: 8080 }, () => {
    ask()
})

client.on('data', data => {
    console.log(data.toString())

    ask()
})