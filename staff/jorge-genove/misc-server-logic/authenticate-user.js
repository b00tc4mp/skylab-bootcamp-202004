require('misc-commons/polyfills/string')
require('misc-commons/polyfills/function')
const { errors: {UnexistenceError, CredentialsError}, utils: {Email} } = require('misc-commons')
const { model: {User} } = require('misc-data')
const bcrypt = require("bcryptjs")

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)


    return (async() => { 
        const user = await User.findOne({ email })   

        if (!user) throw new UnexistenceError('user does not exist')

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw new CredentialsError('wrong password')

        return user._id
    })()
}  