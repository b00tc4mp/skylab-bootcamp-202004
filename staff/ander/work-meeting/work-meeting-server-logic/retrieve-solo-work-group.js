/**
 * returns work group preference obj
 * @param {string} userId id of user
 * @throws {TypeError} Throws an error if user not exist
 */
require('work-meeting-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { User } } = require('work-meeting-data')

module.exports = userId=> {
    String.validate.notVoid(userId)

    return User.findOne({ _id: ObjectId( userId)}).populate('workGroupPref')
        .then(workGroup => {
            if (!workGroup) throw new Error(`user with id ${userId } does not exist`)
            
            const {workGroupPref} = workGroup 
            
            return workGroupPref
        })
}