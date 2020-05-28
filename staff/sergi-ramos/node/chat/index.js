const net = require('net')
let checkNickname = false
let guestId = 0
const server = net.createServer(socket => {

    guestId++
    socket.nickname = "Guest" + guestId
    var clientName = socket.nickname

    socket.on('data', data => {

  
        if (checkNickname) {
            socket.write(`${clientName} > ${data.toString().toUpperCase()}`)
        }


        if (!checkNickname) {
            socket.write(`${clientName} joined the chat`)
            checkNickname = true
        }
        debugger
        
         
            
      
       

    })

    socket.on('error', console.log)

})

server.listen(8081, () => {
    console.log('server listening and running on port 8081')
})