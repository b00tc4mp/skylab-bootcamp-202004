require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const { errors: { UnexistenceError }}= require('work-meeting-commons')
const { models: { WorkGroup} } = require('work-meeting-data')

module.exports = (workGroupId, departmentId) =>{
    String.validate.notVoid(department)
    return (async()=>{
        
        const workGroup = await WorkGroup.findOne({ _id: ObjectId(departmentId)})
            if(!workGroup)
                throw new UnexistenceError(`workgroup ${workGroupId} dont exist`)
            const departments= workGroup.departments
            departments = departments.filter(department=> department._id.toString()!==departmentId)
            await workGroup.save()

            
    })


}