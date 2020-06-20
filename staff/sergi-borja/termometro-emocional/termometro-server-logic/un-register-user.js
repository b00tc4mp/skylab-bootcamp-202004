require('termometro-commons/polyfills/string')
require('termometro-commons/polyfills/json')
const { mongoose: { ObjectId }, models: { User } } = require('termometro-data')
const bcrypt = require('bcryptjs')

module.exports = (userId) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async () => {
        await User.remove({ _id: ObjectId(userId) })
    })()
}