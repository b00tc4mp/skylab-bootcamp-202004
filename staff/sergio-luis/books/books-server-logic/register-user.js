/**
 * Register User.
 * 
 * @param {string} name The user name. 
 * @param {string} surname The user surname. 
 * @param {string} email The user email. 
 * @param {string} password The user password min length 8.

 * @throws {DuplicityError} if don`t find a user with a same email.
 * @throws {VoidError} if don`t introduce name or surname or email or password.
 * @throws {TypeError} if name or surname or email or password are not a string.
 * @throws {Error} if you introduce a email with less than 8 caracteres.
 * 
 * @return If register is correcto don`t return nothing.
 *
 */


require('books-commons/polyfills/string')
require('books-commons/polyfills/json')
const { utils: { Email }, errors: { DuplicityError } } = require('books-commons')
const { models: { User } } = require('books-data')
const bcrypt = require('bcryptjs')

module.exports = (name, surname, email, password) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    String.validate.notVoid(password)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password,8);

    return (async () => {
        const user = await User.findOne({ email })

        if (user) throw new DuplicityError(`user with e-mail ${email} already exists`)

        const hash = await bcrypt.hash(password, 10)

        await User.create({ name, surname, email, password: hash })
    })()
}