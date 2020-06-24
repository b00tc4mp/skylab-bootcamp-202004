require('plates-commons/polyfills/string')
const {models: { User }} = require('plates-data')
const {utils: {Email}, errors: { UnexistenceError, CredentialsError}} = require('plates-commons')
const bcrypt = require('bcryptjs')


module.exports = (email, password)=>{
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
    
    return User.findOne({ email })

    /**
     * Promise funcition, sends info needed to api for authentication. A promise is passed
     * @param {string} email required data for authentication.
     * @param {string} password required data for authentication, encrypted with bcrypt.
     * 
     * @throws UnexistenceError when user is not registered.
     * @throws CredentialsError when a wrong password is passed.
     * 
     */
    .then(user => {
        if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)
 
        return bcrypt.compare(password, user.password)
            .then(match => {
                if (!match) throw new CredentialsError('wrong password')

                return user.id
            })
    })

}
