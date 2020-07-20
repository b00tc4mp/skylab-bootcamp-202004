/**
 * create a new meeting with title, content and user Id
 * @param {string} name name of a new work group
 * @param {string} userId the user who is going to create it
 * @throws {TypeError} Throws an error if user not exist
 * @throws {TypeError} Throws an error if workgroup is already exist
 * 
 */
require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const {errors: { DuplicityError, UnexistenceError } } = require('work-meeting-commons')
const { mongoose: { ObjectId },models: { User, WorkGroup } } = require('work-meeting-data')

module.exports = (name, userId) => {
    String.validate.notVoid(name)
    String.validate.notVoid(userId)
    

    return (async () => {
        debugger
        const workGroup = await WorkGroup.findOne({name})
        if(workGroup)
            throw new DuplicityError(`workgroup ${name} is already exist`)

        const newWorkGroup = new WorkGroup({name, creator: userId})
        await WorkGroup.create(newWorkGroup)

        const user = await User.findOne({_id: ObjectId(userId)})
        if(!user)
        throw new UnexistenceError(`user ${userId} not exist`)

        const _workGroup = await WorkGroup.findOne({name})
        if(!_workGroup)
        throw new UnexistenceError(`workgroup ${name} not exist`)
        const {_id} =_workGroup
        user.workGroups.push(ObjectId(_id))
        user.workGroupPref=ObjectId(_id)
        const result = await user.save() 
        console.log(result)
        
       
    })()
}