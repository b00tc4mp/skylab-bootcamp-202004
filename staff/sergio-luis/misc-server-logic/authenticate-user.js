const{errors:{CredentialsError,UnexistenceError},utils:{Email}}= require("misc-commons")
const { models : {User}} = require('misc-data')

require("misc-commons/polyfills/string")
const {models :{User}} = require('misc-data')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async () =>{
        const user = await User.findOne({email})

        if(!user) throw new UnexistenceError (`user with e-mail ${email} does not exist`)

        const match = await bcrypt.compare(password,user.password);

        if(!match) throw new CredentialsError('wrong password')

        return await user._id.toString()
    })()         
} 