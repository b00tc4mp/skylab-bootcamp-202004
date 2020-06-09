require('coohappy-commons/polyfills/string')
require('coohappy-commons/polyfills/json')
require('coohappy-commons/polyfills/number')
const { utils: { Email } } = require('coohappy-commons')
const { errors: { CredentialsError, UnexistenceError } } = require('coohappy-commons')
const { models: { User } } = require('coohappy-data')
const bcrypt = require('bcryptjs')

module.exports = (userId, dataToUpdate) => {

    if(typeof dataToUpdate !== 'object') throw new TypeError(`${dataToUpdate} is not an object`)
    String.validate.notVoid(userId)
    for (const key in dataToUpdate) {
        key === 'email' && Email.isEmail(dataToUpdate[key])

        String.validate.notVoid(dataToUpdate[key])
    }

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new UnexistenceError(`User with id ${userId} does not exist`)

        const { oldPassword, newPassword } = dataToUpdate

        if (typeof oldPassword !== 'undefined') {
            const match = await bcrypt.compare(oldPassword, user.password)
            if (!match) throw new CredentialsError(`Wrong password`)
        } else throw new CredentialsError(`missing password`)

        if (typeof newPassword !== 'undefined') {
            const hash = await bcrypt.hash(newPassword, 10)
            dataToUpdate.password = hash
            delete dataToUpdate.oldPassword, delete dataToUpdate.newPassword
        }

        await User.findByIdAndUpdate(userId, dataToUpdate)
        return
    })()




}