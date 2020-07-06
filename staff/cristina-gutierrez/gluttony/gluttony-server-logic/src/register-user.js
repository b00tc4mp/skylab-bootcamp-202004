require("gluttony-commons/polyfills/string")
require("gluttony-commons/polyfills/json")
const { utils: { Email }, errors: { DuplicityError } } = require("gluttony-commons")
const { models: { Users } } = require("gluttony-data")
const bcrypt = require("bcryptjs")
const { v4: uuidv4 } = require("uuid")

/**
 * @param  {string} id
 * @param  {string} name
 * @param  {string} surname
 * @param  {string} email
 * @param  {string} password
 * @returns void
 * @throws DuplicityError
 */
module.exports = (id, name, surname, email, password) => {
    id = id || uuidv4()
    String.validate.notVoid(id)
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async () => {
        const user = await Users.findOne({ email })

        if (user) throw new DuplicityError(`User with e-mail ${email} already exists`)

        const hash = await bcrypt.hash(password, 10)

        await Users.create({ id, name, surname, email, password: hash })
    })()
}