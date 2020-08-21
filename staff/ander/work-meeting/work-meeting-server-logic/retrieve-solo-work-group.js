/**
 * returns work group preference obj
 * @param {string} userId id of user
 * @throws {TypeError} Throws an error if user not exist
 */
require('work-meeting-commons/polyfills/string')
const { models: { User } } = require('work-meeting-data')
const { errors:{UnexistenceError },utils:{sanitize}} = require('work-meeting-commons')

module.exports = userId=> {
    String.validate.notVoid(userId)

        return(async()=>{
                const user= await User.findById(userId).populate('workGroupPref').lean()
                if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

                const {workGroupPref} = user
                sanitize(workGroupPref)
                debugger
                return workGroupPref

        })()
}