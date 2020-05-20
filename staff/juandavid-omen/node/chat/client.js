const net = require('net')
const readline = require('readline')

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const client = net.createConnection({ host: 'localhost', port: 8080 }, () => {
    authenticate()
})


const authenticate = () => {
    interface.question('user name?', name => {
        client.write(name)
    })
}

function ask() {
    interface.question(`${this.name}?`, message => {
        client.write(message)
    })
}

client.on('data', data => {
    console.log(data.toString())

    ask()
})