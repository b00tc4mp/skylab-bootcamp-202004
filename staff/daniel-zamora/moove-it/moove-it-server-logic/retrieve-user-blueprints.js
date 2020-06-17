require('moove-it-commons/polyfills/string')
const { errors: { UnexistenceError } } = require('moove-it-commons')
const { models: { User } } = require('moove-it-data')

module.exports = (userId) => {
    debugger
    String.validate.notVoid(userId)

    return (async() => {

        const user = await User.findById(userId)
        if (!user) throw new UnexistenceError(`User with id ${userId} does not exist`)

        return user.blueprints

    })()
}