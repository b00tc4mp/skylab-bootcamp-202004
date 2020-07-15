//db.users.deleteOne({"_id" : objectId("id")})
require('misc-commons/polyfills/string')
const { mongo } = require('misc-data')

module.exports = (userId) => {
    String.validate.notVoid(userId)
    
    return mongo.connect()
        .then(connection => {
        
            const users = connection.db().collection('users')
      
            return users.deleteOne( { _id : ObjectId ( userId ) } )    
        })
}