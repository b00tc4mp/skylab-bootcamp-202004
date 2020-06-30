require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const { utils: { Email }, errors: { DuplicityError, ValueError }}= require('work-meeting-commons')
const { models: { User } } = require('work-meeting-data')
const bcrypt = require('bcryptjs')

module.exports = (userId, name, surname, email, password, oldPassword) =>{
    String.validate.notVoid(oldPassword)
    let updateUser={}
    if(name!==undefined){
        String.validate.notVoid(name)
        updateUser.name= name
    }
    if(surname!==undefined){ //""
        String.validate.notVoid(surname)
        updateUser.surname= surname
    }
    if(email!==undefined){
        Email.validate(email)
        updateUser.email= email
    }
    if(password!==undefined){
        String.validate.notVoid(password)
        updateUser.password= password
    }

    return (async()=>{
        if(updateUser.email){
            const _email = await User.findOne({email})
            if (_email) throw new DuplicityError(`user with e-mail ${email} already exists`)
        }
       
        const user = await User.findOne({ _id: ObjectId(userId) }).lean()
        if (!bcrypt.compare(password, user.password))
            throw new ValueError('password not correct')

        await User.findByIdAndUpdate(userId,updateUser)
        
    })


}