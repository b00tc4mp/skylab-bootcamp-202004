require('work-meeting-commons/polyfills/string')

const {  errors: { DuplicityError, UnexistenceError}}= require('work-meeting-commons')
const { models: { User, WorkGroup } } = require('work-meeting-data')
const workGroup = require('work-meeting-data/models/schemas/work-group')
/**
 * change the work group preference.
 * @param {string} workGroupId Id of the work group to which we are going to make the petition
 * @param {string} userId Id of the user
 * @returns {Promise<void>} return empty promise of succesfull creation
 * @throws {TypeError} Throws an error if user not a string
 * @throws {TypeError} Throws an error workgroup not a string
 * @throws {UnexistenceError} throws an error if user not exist
 * @throws {UnexistenceError}  throws an error if workgroup not exist
 */

module.exports = (userId, workGroupId) =>{
   
    String.validate.notVoid(userId)
    String.validate.notVoid(workGroupId)
    

    return (async()=>{

        const [user, workGroup] = await Promise.all([User.findById(userId), WorkGroup.findById(workGroupId)]) 

        if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
        if(!workGroup) throw new UnexistenceError(`workgroup with id ${workGroupId} does not exist`)
        
        await User.findByIdAndUpdate(userId,{workGroupPref: workGroupId})
        
        return;
        
    })()


}