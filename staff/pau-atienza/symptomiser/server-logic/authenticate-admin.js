require('commons/polyfills/string')
const { models: { Admin } } = require('data')
const { utils: { Email }, errors: { UnexistenceError, CredentialsError } } = require('commons')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async () => {
        const admin = await Admin.findOne({ email })

        if (!admin) throw new UnexistenceError(`Admin with e-mail ${email} does not exist`)

        const match = await bcrypt.compare(password, admin.password)

        if (!match) throw new CredentialsError('wrong password')

        return admin.id
    })()
} 