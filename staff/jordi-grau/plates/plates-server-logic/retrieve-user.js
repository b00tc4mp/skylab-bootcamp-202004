require('plates-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { User } } = require('plates-data')
/**
 * function returns user data as an object, after a api call
 * @param {string} userId, required data 
 * 
 * @throws{Error} if user does not exist
 */
module.exports = userId => {
    String.validate.notVoid(userId)

    return User.findOne({ _id: ObjectId(userId) }, {  password: 0  }).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} does not exist`)

            user.id = user._id.toString()

            delete user._id
           
             
            return user
        })
}