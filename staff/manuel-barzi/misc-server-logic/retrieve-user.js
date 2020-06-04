require('misc-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { User } } = require('misc-data')

module.exports = userId => {
    String.validate.notVoid(userId)

    return User.findOne({ _id: ObjectId(userId) }).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} does not exist`)

            user.id = user._id.toString()

            delete user._id
            delete user.password

            return user
        })
}