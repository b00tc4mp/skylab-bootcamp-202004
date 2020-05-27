const {users,stickies}= require("../data");
require("../utils/polyfills/function")
require("../utils/polyfills/string")

module.exports = (userId, query, callback) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(query)
    Function.validate(callback)
    
    users.find({id:userId},(error,[user])=>{
        if(error) return callback(error)
        if(!user) return callback(new Error("no user found"))
        
        const _stickies = []
        let count = 0
        stickies.find({user:userId},(error,results)=>{
            if(error) return callback(error)
            if(results.length===0) return callback(new Error("no contact found"))
    
            results.forEach(sticky=>{
                //const contact = JSON.parse(json)

                const values = Object.values(sticky)

                const matches = values.some(value=> value.toLowerCase().includes(query.toLowerCase()))

                if (matches) {
                    _stickies.push(sticky)
                }
                count ++
                if (count === results.length) {
                   if(_stickies.length === 0) callback(new Error("no contact match the query"))
                   else callback(null, _stickies)
                    
                }
            })
        })  
    })

}