const listContacts =require("./list-contacts")
module.exports=()=>{
    socket:undefined,
    function setSocket(newSocket){
        socket=newSocket;
    },
    function list(){
        listContacts((error, 
            contacts) => {
            if (error) throw error
    
            socket.write(`HTTP/1.1 200
    content-type: text/html
    
    
    <h2>Contacts list</h2>
    <ul>
    ${contacts.map(({ name }) => `<li>${name}</li>`).join('')}
    </ul>
    `)
        socket.end()  
    })
    }
    
}
