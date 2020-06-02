//db.users.deleteOne({"_id" : objectId("id")})
require('../utils/polyfills/string')
const { mongo } = require('../data')

module.exports = (userId) => {
    String.validate.notVoid(userId)
    
    return mongo.connect()
        .then(connection => {
        
            const users = connection.db().collection('users')
      
            return users.deleteOne( { _id : ObjectId ( userId ) } )    
        })
}