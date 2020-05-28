const {users,stickies}= require("../data");
require("../utils/polyfills/function")
require("../utils/polyfills/string")
const {UnexistenceError} = require('../errors');

module.exports = (userId, query) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(query)
    
    return new Promise((resolve,reject)=>{
        users.find({id:userId},(error,[user])=>{
            if(error) return reject(error)
            if(!user) return reject(new UnexistenceError("no user found"))
            
            const _stickies = []
            let count = 0
            stickies.find({user:userId},(error,results)=>{
                if(error) return reject(error)
                if(results.length===0) return reject(new UnexistenceError("no contact found"))
        
                results.forEach(sticky=>{
    
                    const values = Object.values(sticky)
    
                    const matches = values.some(value=> value.toLowerCase().includes(query.toLowerCase()))
    
                    if (matches) {
                        _stickies.push(sticky)
                    }
                    count ++
                    if (count === results.length) {
                       if(_stickies.length === 0) reject(new UnexistenceError("no contact match the query"))
                       else resolve( _stickies)
                        
                    }
                })
            })  
        })
    })
    

}