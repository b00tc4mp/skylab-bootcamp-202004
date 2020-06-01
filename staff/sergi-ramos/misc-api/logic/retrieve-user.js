require('../utils/polyfills/string')
const { UnexistenceError } = require('../errors')
const { mongo } = require('../data')
const { ObjectId } = mongo

module.exports = userId => {
    String.validate.notVoid(userId)


    return mongo.connect()
        .then(connection => {

            const users = connection.db().collection('users')

            return users.findOne({ _id: ObjectId(userId) })
        })
        .then(user => {
            if(!user) throw new UnexistenceError('user does not exists')
            delete user._id
            delete user.password

            return user
        })



}