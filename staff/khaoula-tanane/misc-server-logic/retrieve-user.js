require('misc-commons/polyfills/string')
const{models: {User}, mongoose: {ObjectId}} = require('misc-data')
const { errors: { UnexistenceError} } = require('misc-commons')

module.exports = userId => {
    String.validate.notVoid(userId)

        return User.findOne({ _id: ObjectId(userId) }).lean()

        .then(user => {
            if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

            delete user._id
            delete user.password

            return user
        })
}