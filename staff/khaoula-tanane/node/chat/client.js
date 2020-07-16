const net = require('net')
const readline = require('readline')

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
function name(){
    interface.question('name?', message => {
        debugger
        client.write(message)
    })
}

function ask() {
    interface.question('message?', message => {
        client.write(message)
        
    })
}

const client = net.createConnection({ host: 'localhost', port: 8081 }, () => {
    debugger
   name()
    ask()
})

client.on('data', data => {
    debugger
    console.log(data.toString())
    ask()
})