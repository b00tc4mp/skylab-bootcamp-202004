const {contacts,users}= require("../data")

module.exports = (userId, callback) => {
    // TODO validate input fields
    // TODO check user exists, otherwise error
    users.find({id:userId},(error,[user])=>{
        if(error) return callback(error)
        if(!user) return callback(new Error("no user found"))
        
        
        contacts.find({user:userId},(error,results)=>{
            if(error) return callback(error)
            if(results.length===0) return callback(new Error("no contact found"))
    
            callback(null,results)   
        })  
    })
    




    
    

}