/**
 * returns pending petitions in work group
 * @param {string} userId The creator of work group
 * @param {string} workGroupId Id of work group
 * @throws {TypeError} Throws an error if workgroup not exist
 * @throws {TypeError} Throws an error if user not create the work group (host)
 */
require('work-meeting-commons/polyfills/string')
const { models: { WorkGroup} } = require('work-meeting-data')
const {errors:{UnexistenceError}} = require('work-meeting-commons')
module.exports = (workGroupId ,userId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(workGroupId)

    return WorkGroup.findById(workGroupId).lean().populate('petitions.user', 'name surname _id')
        .then(workGroup => {
            if (!workGroup) throw new Error(`workgroup with id ${workGroupId} does not exist`)

            const {petitions, creator} = workGroup

            if(creator.toString() !== userId) throw new UnexistenceError(`user with id ${userId} not creator`)
            
            const returnedArray = petitions.filter(petition => petition.status === 'pending');
            return returnedArray;
        })
}