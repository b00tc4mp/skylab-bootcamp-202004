
require("misc-commons/polyfills/string")

const {models: {User}} = require('misc-data')
const{errors:{CredentialsError,UnexistenceError},utils:{Email}}= require("misc-commons")

const bcrypt = require('bcryptjs')

module.exports = (userId,email,password) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    return (async ()=>{
        const user = await User.findOne({email})

        if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)

        if(user._id.toString() !== userId) throw new CredentialsError("trying to unregister other user")

        const match = await bcrypt.compare(password,user.password)

        if(!match) throw new CredentialsError('wrong password')

        await User.deleteOne(user)
    })() 
}