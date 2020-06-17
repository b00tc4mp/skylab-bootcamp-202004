require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const {errors: { DuplicityError, UnexistenceError } } = require('work-meeting-commons')
const { models: { User, WorkGroup } } = require('work-meeting-data')

module.exports = (name, userId) => {
    String.validate.notVoid(name)
    String.validate.notVoid(userId)
    

    return (async () => {

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
        
        user.workGroups.push(objectId(_workGroup._id))
        User.save()

    })()
}