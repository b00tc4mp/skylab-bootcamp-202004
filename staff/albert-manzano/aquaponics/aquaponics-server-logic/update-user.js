require('aquaponics-commons/polyfills/string')
const { utils: { Email } } = require('aquaponics-commons')
const { mongo } = require('aquaponics-data')
const { ObjectId } = mongo
const { errors: { UnexistenceError } } = require('aquaponics-commons')

module.exports = (userId, data) => {
    if (typeof data !== 'object') throw new TypeError(`${data} is not an object`)

    const { name, surname, email, password } = data

    if (name) String.validate.notVoid(name)
    if (surname) String.validate.notVoid(surname)

    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.findOne({ _id: ObjectId(userId) })
                .then(user => {
                    if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)

                    const newUser = { name, surname, email, password }

                    return users.updateOne({ _id: ObjectId(userId) }, { $set: newUser })
                })
        })
}