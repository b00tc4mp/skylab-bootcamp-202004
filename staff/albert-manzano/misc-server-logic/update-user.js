require('misc-commons/polyfills/string')
// const { utils: {Email} } = require('misc-commons')
require('misc-commons/polyfills/json')
const { mongo } = require('misc-data')
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