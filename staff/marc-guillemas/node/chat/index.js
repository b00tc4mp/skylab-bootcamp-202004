const net = require('net')
const readline = require('readline')
const saveSocketUsers = []

const server = net.createServer(socket => {
    socket.on('data', data => {
        //hacer un if para ver si se esta registrando un nuevo usuario
        

        if(saveSocketUsers.indexOf(socket) === -1){
            console.log('guardando socket')
            saveSocketUsers.push(socket)
        }
        // console.log(socket)
        // console.log(data.toString())

        // socket.write(`i send you back your message in upper case :P ${data.toString().toUpperCase()}`)

        saveSocketUsers.forEach(element => {if(element !== socket) {element.write(`i send you back your message in upper case :P ${data.toString().toUpperCase()}`)}
                                            else{
                                                element.write('message send')
                                            }})
    })
    socket.on('error', console.log)
})

server.listen(8080)

