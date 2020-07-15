require('moove-it-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { User } } = require('moove-it-data')
const { errors: { UnexistenceError, CredentialsError, ForbiddenError } } = require('moove-it-commons')

module.exports = (userId, data) => {
    
    String.validate.notVoid(userId)
    if (typeof data !== 'object') throw new TypeError(`${data} is not an object`)
    if (data.password && !data.oldPassword) throw new CredentialsError("Old password is required")
    if (data.email) throw new ForbiddenError("Email cannot be updated")

    return (async() => {
        const user = await User.findById(userId)

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        if (data.password && data.oldPassword) {
            
            if (data.oldPassword !== user.password) throw new CredentialsError('Wrong old password')

            delete data.oldPassword

            await User.findByIdAndUpdate(userId, data)

        } else await User.findByIdAndUpdate(userId, data)

    })()
}