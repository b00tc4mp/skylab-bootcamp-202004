require("gluttony-commons/polyfills/string")
require("gluttony-commons/polyfills/json")
const { utils: { Email }, errors: { DuplicityError } } = require("gluttony-commons")
const { models: { Users } } = require("gluttony-data")
const bcrypt = require("bcryptjs")

module.exports = (id, name, surname, email, password) => {
    String.validate.notVoid(id)
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async () => {
        const user = await Users.findOne({ email })

        if (user) throw new DuplicityError(`user with e-mail ${email} already exists`)

        const hash = await bcrypt.hash(password, 10)

        await Users.create({ id, name, surname, email, password: hash })
    })()
}