const net = require('net')
const readline = require('readline')
// let status = 0

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function ask() {
    
    interface.question('message? ', message => {
        client.write(message)
    })
}

// function register() {
    
// }

// function selectUser(){

//  }
const client = net.createConnection({ host: 'localhost', port: 8080 }, () => {
    // switch (status){
    //     case 0:
    //         register
    //         status ++
    //         break
    //     case 1:

    // }
    //en vez del ask registrar usuario
    //pregutar con quien quieres chatear
    ask()
})

client.on('data', data => {
    
    console.log(data.toString())
    ask()
})

