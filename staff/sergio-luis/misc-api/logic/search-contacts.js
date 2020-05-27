
const {contacts,users}= require("../data");
require("../utils/polyfills/function")
require("../utils/polyfills/string")

module.exports = (userId, query, callback) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(query)
    Function.validate(callback)
    
    users.find({id:userId},(error,[user])=>{
        if(error) return callback(error)
        if(!user) return callback(new Error("no user found"))
        
        const _contacts = []
        let count = 0
        contacts.find({user:userId},(error,results)=>{
            if(error) return callback(error)
            if(results.length===0) return callback(new Error("no contact found"))
    
            results.forEach(contact =>{
                //const contact = JSON.parse(json)

                const values = Object.values(contact)

                const matches = values.some(value=> value.toLowerCase().includes(query.toLowerCase()))

                if (matches) {
                    _contacts.push(contact)
                }
                count ++
                if (count === results.length) {
                   if(_contacts.length === 0) callback(new Error("no contact match the query"))
                   else callback(null, _contacts)
                    
                }
            })
        })  
    })

}