require('../utils/polyfills/string')
const {users: {find}} = require('../data')


module.exports = (userId, query) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(query)

    query = query.toLowerCase()
    
    return new Promise((resolve, reject)=>{
        find({name: query, surname: query, email: query}, (error, users)=>{
            if (error) return reject(error)
            resolve(users)            
        })
    })
    
}