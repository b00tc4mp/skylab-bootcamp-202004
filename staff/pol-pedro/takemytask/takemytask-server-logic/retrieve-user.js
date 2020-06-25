require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('takemytask-commons')
const { models: { User, Worker }, mongoose: {ObjectId} } = require('takemytask-data')

/**
 * Adds a coment to worker
* @param {string} userId user or worker unique id
* @param {string} id search user or worker id
* 
* @returns {object}
*
* @throws {UnexistenceError} if user or worker dont exists
*/



module.exports = (userId, id) => {

    String.validate.notVoid(userId)

    return (async () => {
        
        let user 

        if(!id) {
            user = await User.findOne({ _id: ObjectId(userId) }, {password: 0 }).lean()

            if (!user){

                user = await Worker.findOne({ _id: ObjectId(userId) }, {password: 0 }).lean()

            } 
            if(!user) throw new UnexistenceError(`user with id: ${userId} dont exists`)

            return user

        }else{

            user = await User.findOne({ _id: ObjectId(id) }, {password: 0 } ).lean()

            if (!user){

                user = await Worker.findOne({ _id: ObjectId(id) }, {password: 0 }, {bankAcount: 0}).lean()

            } 
            if(!user) throw new UnexistenceError(`user with id: ${id} dont exists`)

            return user

        }   

    })()
}