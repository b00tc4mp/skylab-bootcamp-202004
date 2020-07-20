/**
 * change the work group preference.
 * @param {string} workGroupId Id of the work group to which we are going to make the petition
 * @param {string} userId Id of the user
 * @throws {TypeError} Throws an error if user not exist
 * @throws {TypeError} Throws an error workgroup not exist
 * 
 */
require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const {  errors: { DuplicityError, UnexistenceError}}= require('work-meeting-commons')
const { mongoose:{ObjectId}, models: { User, WorkGroup } } = require('work-meeting-data')
const workGroup = require('work-meeting-data/models/schemas/work-group')

module.exports = (userId, workGroupId) =>{
   
    String.validate.notVoid(userId)
    String.validate.notVoid(workGroupId)
    let updateUser={}
    updateUser.workGroupPref=workGroupId

    return (async()=>{
        const user = await User.findOne({ _id: ObjectId(userId) }).lean()
            if(!user) throw new UnexistenceError(`user with Id ${userId} not exist`)
       const workGroup = await WorkGroup.findById(workGroupId)
       if(!workGroup) throw new UnexistenceError(`workGroup with Id ${workGroupId} not exist`)
        
        await User.findByIdAndUpdate(userId,updateUser)
        
        
    })()


}