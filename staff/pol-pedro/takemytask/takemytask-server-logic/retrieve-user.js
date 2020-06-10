require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('takemytask-commons')
const { models: { User }, mongoose: {ObjectId} } = require('takemytask-data')


module.exports = (userId) => {

    String.validate.notVoid(userId)

    return (async () => {
        const user = await User.findOne({ _id: ObjectId(userId) }, {password: 0 }).lean()

        if (!user) throw new UnexistenceError(`user with e-mail ${email} dont exists`)

        return user
    })()
}