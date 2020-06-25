require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('takemytask-commons')
const { models: { User, Worker }, mongoose: {ObjectId} } = require('takemytask-data')

/**
 * Updates the user or worker params sended
 *
 * @param {string} userId worker name
 * @param {object} body worker surname 
 * 
 * @returns {undefined}
 *
 * @throws {UnexistenceError} if user or worker dont existsd
 */


module.exports = (userId, body) => {

    String.validate.notVoid(userId)

    let valParam = false

    return (async () => {
        let user
        
        user = await User.findOne({ _id: ObjectId(userId) }, {password: 0 })

        if (!user) user = await Worker.findOne({ _id: ObjectId(userId) }, {password: 0 })

        if (!user) throw new UnexistenceError(`user or worker with id ${userId} dont exists`)

        // await User.deleteOne({_id: ObjectId(userId)})

        for(var i in body){

            for (var g in user){
                if(i === g){
                    valParam = true
                    break 
                }
            }
            if (valParam === false) throw new UnexistenceError(`${i} is not a prameter of user`)

            user[i] = body[i]
        }

        await user.save()

    })()
}