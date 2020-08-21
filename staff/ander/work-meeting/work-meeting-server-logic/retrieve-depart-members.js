require('work-meeting-commons/polyfills/string')
const {models: {WorkGroup,Department}} = require('work-meeting-data')
const { errors:{UnexistenceError} ,utils: {sanitize} } = require('work-meeting-commons')

module.exports = (workGroupId, departmentId)=>{
    String.validate.notVoid(workGroupId)
    String.validate.notVoid(departmentId)

    return (async()=>{
        const [workGroup, department] = await Promise.all([WorkGroup.findById(workGroupId), Department.findById(departmentId).lean().populate('members')])
        if(!workGroup) throw new UnexistenceError(`workgroup with id ${workGroupId} does not exist`)
        if(!department) throw new UnexistenceError(`department with id ${departmentId} does not exist`)

        const {departments} = workGroup
        const exist = departments.some(department => department.toString()== departmentId)
        if(!exist) throw new UnexistenceError(`department with id ${departmentId} is not part of the workgroup`)
        if(department.workGroup.toString()!==workGroupId) (`department with id ${departmentId} is not part of the workgroup`)
        const {members} = department
        sanitize(members)
        return members
    })()

}