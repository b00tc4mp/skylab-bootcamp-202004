require('../utils/polyfills/string')
const { Email } = require('../utils')
require('../utils/polyfills/json')
const { mongo } = require('../data')
const { ObjectId } = mongo

module.exports = (userId, userUpdate) => {
    String.validate.notVoid(userId)
    if (typeof userUpdate !== 'object') throw new TypeError(`${userUpdate} is not an object`) 

    String.validate.notVoid(userId)

    debugger
    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.update({ _id: ObjectId(userId) }, { $set: userUpdate })

        })
        .then(({ result: { nModified } }) => {
            if(nModified > 0) return "User modified correctly"
        })
       
        
}