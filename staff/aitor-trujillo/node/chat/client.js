const net = require('net')
const readline = require('readline')
const style = require('./chat.style') //estilo añadido, hay que probar si funciona

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let username = null

//======
function ask() {
    interface.question('Username? ', answer => {
        username = answer

        askMessage()

    })
}
function askMessage() {
    interface.question('message? ', mssg => {
        client.write(`${username}: ${mssg}`)
    })
}


const client = net.createConnection({ host: 'localhost', port: 8080 }, () => {
    ask()

})

client.on('data', data => {

    // let array = data.split(',')

    console.log(data.toString())

    askMessage()
})