require("../utils/polyfills/string")
const Email = require("../utils/email")
const { UnexistenceError } = require('../errors')
const {mongo} =require('../data')
const {ObjectId} = mongo

module.exports = (id) => {

    

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.deleteOne({ _id: ObjectId(id) })
        })
        .then(user => {
            if(!user) throw new UnexistenceError('user dosent exist')
        })
    }
    



