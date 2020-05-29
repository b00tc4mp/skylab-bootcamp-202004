const net = require('net')
const readline = require('readline')

let username;
let writing=false;

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
function askName(){
    interface.question("What is your name?", name=>{
        username=name
        sendMessage()
        
    })
}
function sendMessage(){
    writing=true;
    interface.question('', message=>{
        client.write(`${username} : ${message}`)
        writing=false;
    })
}

const client = net.createConnection({host: 'localhost', port: 8080}, () => {
    askName()
})
client.on("data",data=>{
    let [color, message=" "]= data.toString().split('-')
    
    console.log(color, message)
    console.log("\x1b[37m", '')
    if(writing==false){
        sendMessage()
    }
    // sendMessage()
})

