require('work-meeting-commons/polyfills/string')
const { models: { User, WorkGroup} } = require('work-meeting-data')
const {errors:{UnexistenceError}, utils: {sanitize}} = require('work-meeting-commons')

/**
 * returns pending petitions in work group
 * @param {string} userId The creator of work group
 * @param {string} workGroupId Id of work group
 * @throws {TypeError} Throws an error if workgroup not exist
 * @throws {TypeError} Throws an error if user not create the work group (host)
 */
module.exports = (userId, workGroupId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(workGroupId)

    return (async()=>{
        const workGroup = await WorkGroup.findById(workGroupId).lean().populate('petitions.user', 'name surname')
        if (!workGroup) throw new UnexistenceError(`workgroup with id ${workGroupId} does not exist`)

        const {petitions, creator} = workGroup
        const user = await User.findById(userId).lean()
        if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
        if(creator.toString() !== userId) throw new UnexistenceError(`user with id ${userId} not creator`)
        
        const returnedArray = petitions.filter(petition => petition.status === 'pending');

        sanitize(returnedArray);
        returnedArray.forEach(element => {
                            sanitize(element.user)
            })
            
            return returnedArray;
        })()
    
}

