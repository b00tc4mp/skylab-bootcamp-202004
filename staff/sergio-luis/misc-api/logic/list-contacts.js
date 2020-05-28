const {contacts,users}= require("../data")
const {CredentialsError,UnexistenceError} = require('../errors');
require('../utils/polyfills/string')

module.exports = (userId,contactId) => {
    if(contactId)
        String.validate.notVoid(contactId)
    String.validate.notVoid(userId)
    return new Promise((resolve,reject)=>{
        users.find({id:userId},(error,[user])=>{
            if(error) return reject(error)
    
            contacts.find({user:userId},(error,results)=>{
                if(error) return reject(error)
                if(results.length===0) return reject(new UnexistenceError("no contact found"))
                //let _results = results
                if(contactId){
                    let result = false;
                    results.forEach(contact =>{
                        const {id}= contact
                        if(id === contactId) {
                            result=contact
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