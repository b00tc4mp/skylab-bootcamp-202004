
require('../utils/polyfills/string')
require('../utils/polyfills/function')
const {users,stickies}= require("../data")
const {UnexistenceError} = require('../errors');

module.exports = (userId,stickyId) => {
    String.validate.notVoid(userId)
    if(stickyId)
    String.validate.notVoid(stickyId)
 
    return new Promise((resolve,reject)=>{
        users.find({id:userId},(error,[user])=>{
            if(error) return reject(error)
            if(!user) return reject(new UnexistenceError("no user found"))
            
            stickies.find({user:userId},(error,results)=>{
                if(error) return reject(error)
                if(results.length===0) return reject(new UnexistenceError("no contact found"))
                
                if(stickyId){
                    let result = false;
                    results.forEach(sticky =>{
                        const {id}= sticky
                        if(id === stickyId) {
                            result=sticky
                        }; 
                    });
                    results=result
                    if(!result) return reject(new UnexistenceError("no contact found"))
                }
                resolve(results)   
            })  
        })
    })
}  