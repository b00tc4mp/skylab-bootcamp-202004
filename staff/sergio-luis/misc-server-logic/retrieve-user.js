require('misc-commons/polyfills/string')


const{errors:{UnexistenceError}}= require("misc-commons")

const { mongo } = require('misc-data')

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.findOne({_id: mongo.ObjectId(userId) })
        })

        .then(user => {
            if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

            delete user.id
            delete user.password

            return user
        })
  
}