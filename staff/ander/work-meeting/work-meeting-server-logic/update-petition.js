require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const { models: { User, WorkGroup } } = require('work-meeting-data')
const { errors: { DuplicityError, UnexistenceError } } = require('work-meeting-commons')
/**
 * how many work group match the query
 * @param {string} userId Id of user made de petition
 * @param {string} workGroupId Id of workgroup 
 * @param {string} petitionId Id of petition
 * @param {string} status accepted or dennied
 * @throws {TypeError} Throws an error if user dont exists
 * @throws {TypeError} Throws an error if work group not exists
 * @throws {TypeError} Throws an error if petition not exists
 */

module.exports = (userId, workGroupId, petitionId, status) => { //status value is (accepted/dennied)
    String.validate.notVoid(userId)
    String.validate.notVoid(petitionId)
    String.validate.notVoid(workGroupId)
    String.validate.notVoid(status)

    return (async () => {
        
        const user = await User.findById(userId)
        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        const workGroup = await WorkGroup.findById(workGroupId)
        if (!workGroup) throw new UnexistenceError(`workGroup with id ${workGroupId} does not exist`)
        let { members, petitions } = workGroup

        const petition = petitions.some(petition => petition._id == petitionId)
        if (!petition) throw new UnexistenceError(`petition with id ${petitionId} does not exist`)

        const alreadyExist = members.some(member => member.toString()===userId)
        if(alreadyExist) throw new DuplicityError(`user with id ${userId} already exist`)

        if (status === 'accepted'){
            
            await User.findByIdAndUpdate(userId,{$addToSet:{workGroups: workGroupId}})
            await WorkGroup.findByIdAndUpdate(workGroupId,{$addToSet:{members: userId}})
            
        } 
        
        await WorkGroup.findByIdAndUpdate(workGroupId, {$pull: {petitions:{user:userId}}})
       




    })()
}