require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('takemytask-commons')
const { models: { User, Worker, Chat }, mongoose: {ObjectId} } = require('takemytask-data')

/**
 * retrive users chats 
 * 
 *@param {string} userId worker name
*
* @returns {object}
*
* @throws {Error} if server throws errror
*/

module.exports = (userId) => {

    String.validate.notVoid(userId)

    return (async () => {
        
        let user 

        
        user = await User.findOne({ _id: ObjectId(userId) }, {password: 0 }).lean()

        if (!user){

            user = await Worker.findOne({ _id: ObjectId(userId) }, {password: 0 }).lean()

        } 

        if(!user) throw new UnexistenceError(`user with id: ${userId} dont exists`)
        if(user.role === 'user'){
            const chats= await Chat.find({user: ObjectId(userId)}).populate('worker')
            return chats
        }else{
            const chats= await Chat.find({worker: ObjectId(userId)}).populate('user')
            return chats
        }

        

        

    })()
}