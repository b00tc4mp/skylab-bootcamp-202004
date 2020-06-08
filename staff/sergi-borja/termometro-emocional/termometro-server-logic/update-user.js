require('termometro-commons/polyfills/string')
require('termometro-commons/polyfills/json')
const { utils: {Email}} = require('termometro-commons')
const { mongoose: { ObjectId }, models: { User } } = require('termometro-data')
// const bcrypt = require('bcryptjs')

module.exports = (userId, name, surname, age, sexo, email, password, members) => {
    if(name) String.validate.notVoid(name)
    if(surname) String.validate.notVoid(surname)
    if(email) String.validate.notVoid(email)
    if(email) Email.validate(email)
    if(password) String.validate.notVoid(password)

    String.validate.notVoid(userId)

    return (async() => {
        const user = await User.findOne({ _id: ObjectId(userId) }).lean()
        if(name) user.name = name
        if(surname) user.surname = surname
        if(age) user.age = age
        if(sexo) user.sexo = sexo
        if(email) user.email = email
        if(password) user.password = password //TODO: AÑADIR HASH
        if(members) user.members = members

        // delete user._id

        return await user.save();
        
        })()
    

    
}