
const {contacts,users}= require("../data");
require("../utils/polyfills/string")
const {CredentialsError,UnexistenceError} = require('../errors');
module.exports = (userId, query) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(query)

    return new Promise((resolve,reject)=>{

        users.find({id:userId},(error,[user])=>{
            if(error) return reject(error)
            if(!user) return reject(new UnexistenceError("no user found"))
            
            const _contacts = []
            let count = 0
            contacts.find({user:userId},(error,results)=>{
                if(error) return reject(error)
                if(results.length===0) return reject(new UnexistenceError("no contact found"))
        
                results.forEach(contact =>{
                    const values = Object.values(contact)
                    const matches = values.some(value=> value.toLowerCase().includes(query.toLowerCase()))
    
                    if (matches) {
                        _contacts.push(contact)
                    }
                    count ++
                    if (count === results.length) {
                       if(_contacts.length === 0) reject(new UnexistenceError("no contact match the query"))
                       else resolve(_contacts)
                        
                    }
                })
            })  
        })
    })
}