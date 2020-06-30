require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const { errors: { DuplicityError, UnexistenceError }}= require('work-meeting-commons')
const {mongoose: { ObjectId }, models: {WorkGroup } } = require('work-meeting-data')

module.exports = (workGroupId,departmentId, userId ) =>{
    String.validate.notVoid(name)
    String.validate.notVoid(userId)
    String.validate.notVoid(workGroupId)
    return (async()=>{
        
            const workGroup = await WorkGroup.findOne({ _id: ObjectId(workGroupId)})
            if(!workGroup)throw new UnexistenceError(`Work-group with id: ${departmentId} not exist`)

            const departments = workGroup.departments
            const department = departments.find(department=> department._id.toString()===departmentId)
            if(!department)throw new UnexistenceError('department not exist')
            const members = department.members
            for(let member in members){
                if(member.toString() === userId)
                    throw new DuplicityError(`user ${userId}is already exist`)
            }
                members.push(ObjectId(userId))    

        await workGroup.save()
        
    })


}