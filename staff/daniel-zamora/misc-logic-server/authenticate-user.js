require('misc-commons/polyfills/string')
const { errors: {UnexistenceError, CredentialsError}, utils: {Email}} = require('misc-commons')
const { models: {User} } = require('../misc-data')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => { debugger
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return User.findOne({email})
        .then(user => {
            if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)
            
            return bcrypt.compare(password, user.password)
            .then(match => { debugger
        
                if (!match) throw new CredentialsError('wrong password')
                return user.id
            })

        })
}
