require('work-meeting-commons/polyfills/string')
const { UnexistenceError, DuplicityError } = require('work-meeting-commons/errors')
const { models: { User, WorkGroup, Petition } } = require('work-meeting-data')
/**
 * Add petition in selected work group.
 * @param {string} workGroupId Id of the work group to which we are going to make the petition
 * @param {string} userId Id of the user
 * @returns {Promise<void>} return empty promise of succesfull creation
 * @throws {TypeError} Throws an error if user not a string
 * @throws {TypeError} Throws an error if workgroup not a string
 * @throws {UnexistenceError} Throws an error if user not exist
 * @throws {UnexistenceError} Throws an error if workgroup not exist
 * @throws {DuplicityError} Throws an error if user already send petition
 * @throws {DuplicityError} Throws an error if user is already member in workgroup
 * 
 */



module.exports = (userId, workGroupId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(workGroupId)

    return (async () => {

        const [user, workGroup] = await Promise.all([User.findById(userId),
        WorkGroup.findById(workGroupId)])

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
        if (!workGroup) throw new UnexistenceError(`workgroup with id ${workGroupId} does not exist`)
        
        const {members} = workGroup
        const alreadyMember=members.some(member => member.toString() === userId )
        if(alreadyMember) throw new DuplicityError(`user with id ${userId} is already a member`)

        const { petitions } = workGroup
        const alreadyExist=petitions.some(petition => (petition.user.toString() === userId && petition.status == 'pending') )
        if(alreadyExist) throw new DuplicityError(`user with id ${userId} already send petition`)
        
        const newPetition = new Petition({ user: userId })

        await WorkGroup.findByIdAndUpdate(workGroupId, { $addToSet: { petitions: newPetition } })

        return;
    })()
}