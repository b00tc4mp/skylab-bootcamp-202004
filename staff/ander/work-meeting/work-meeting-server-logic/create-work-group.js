require('work-meeting-commons/polyfills/string')
const {errors: { DuplicityError, UnexistenceError } } = require('work-meeting-commons')
const {models: { User, WorkGroup } } = require('work-meeting-data')
/**
 * create a new meeting with title, content and user Id
 * @param {string} name name of a new work group
 * @param {string} userId the user who is going to create it
 * @throws {TypeError} Throws an error if user not exist
 * @throws {TypeError} Throws an error if workgroup is already exist
 * 
 */

module.exports = (userId,name) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(name)
    

    return (async () => {
        debugger

        const [user, workGroup] = await Promise.all([User.findById(userId), WorkGroup.findOne({name})])
        if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
        if(workGroup) throw new DuplicityError(`workgroup with name ${name} already exist`)

        const _workGroup = await WorkGroup.create({name, creator: userId})
        const workGroupId = _workGroup.id.toString()

        await User.findByIdAndUpdate(userId,{$addToSet:{workGroups: workGroupId}})
        await User.findByIdAndUpdate(userId,{workGroupPref: workGroupId})
        return;
        
       
    })()

    
}