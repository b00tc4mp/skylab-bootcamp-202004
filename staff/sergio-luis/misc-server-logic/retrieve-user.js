require('misc-commons/polyfills/string')


const{errors:{UnexistenceError}}= require("misc-commons")

const {models:{User}, mongoose:{ObjectId}} = require('misc-data')

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return (async () =>{
       const user =  await User.findOne({_id: ObjectId(userId) })

       if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        delete user.id
        delete user.password

        return  await user
    })()
       
  
}