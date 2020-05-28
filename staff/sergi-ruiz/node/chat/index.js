const net = require('net')
const {colors}= require("./client.style")
const sockets=[]
const server = net.createServer(socket=>{
    sockets.push(socket)
    const color=colors[Math.floor(Math.random()*colors.length)]
    socket.on("data",data=>{
        sockets.forEach(currentSocket=>{
            if(socket!==currentSocket){
                currentSocket.write(`${color}-${data.toString()}`)
            }else{
                currentSocket.write(`${color}- `);
            }
        })
        console.log(color,data.toString())
    })
    socket.on("error",(error)=>{
        console.error(error.message)
    })
    socket.on("end",()=>{
        sockets.splice(sockets.indexOf(socket),1)
    })
})
server.listen(8080)