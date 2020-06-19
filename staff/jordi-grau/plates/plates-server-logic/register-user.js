require ('plates-commons/polyfills/string')
require('plates-commons/polyfills/json')
const { utils: { Email }, errors:{ DuplicityError } } = require('plates-commons')
const { models: { User } } = require('plates-data')
const bcrypt = require('bcryptjs')
/**
 * register user sends data do api, to register a user
 * @param {string} name -data info to register a user, not required
 * @param {string} surname -data info to register a user, not required
 * @param {string} email -data required to register a user
 * @param {string} password -data required to register a user
 * 
 * @throws DuplicityError if user's already resgistered
 * 
 */

module.exports = (name, surname, email, password) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return ( async() =>{
        const user = await User.findOne({ email })

        if(user) throw new DuplicityError(`User with e-mail: ${email}, already exists`)

        const hash = await bcrypt.hash(password, 10)

        await User.create({ name, surname, email, password: hash})

        return;
    } )()
}