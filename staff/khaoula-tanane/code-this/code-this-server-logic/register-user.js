require('code-this-commons/polyfills/string')
// require('code-this-commons/polyfills/json')
const { utils: { Email }, errors: { DuplicityError } } = require('code-this-commons')
const { models: { User } } = require('code-this-data')
const bcrypt = require('bcryptjs')

module.exports = (name, email, password) => {
    String.validate.notVoid(name)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async () => {

            const user = await User.findOne({ email })
    
            if (user) throw new DuplicityError(`user with e-mail ${email} already exists`)
    
            const hash = await bcrypt.hash(password, 10)
    
            await User.create({ name, email, password: hash })
            
    })()
}