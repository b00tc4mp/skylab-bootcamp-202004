
require('../utils/polyfills/string')
require('../utils/polyfills/function')
const {users,stickies}= require("../data")

module.exports = (userId, callback) => {
    String.validate.notVoid(userId)
    Function.validate(callback)
    
    users.find({id:userId},(error,[user])=>{
        if(error) return callback(error)
        if(!user) return callback(new Error("no user found"))
        
        
        stickies.find({user:userId},(error,results)=>{
            if(error) return callback(error)
            if(results.length===0) return callback(new Error("no contact found"))
    
            callback(null,results)   
        })  
    })
}  