require('misc-commons/polyfills/string')
const {utils: {Email}, errors: {DuplicityError}} = require('misc-commons')
const { models: { User } } = require('misc-data')
const bcrypt = require('bcryptjs')


module.exports = (name, surname, email, password) => {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async () => {
        const user = await User.findOne({ email })

        if(user) throw new DuplicityError (`${email} already exist`)
    
        const hash = await bcrypt.hash(password, 10)
    
        await User.create({ name, surname, email, password: hash})
    }) 
      
}   