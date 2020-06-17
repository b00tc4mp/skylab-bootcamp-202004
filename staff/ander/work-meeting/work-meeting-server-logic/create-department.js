require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const { errors: { DuplicityError, UnexistenceError } } = require('work-meeting-commons')
const { models: { Department, WorkGroup } } = require('work-meeting-data')

module.exports = (workGroupId, userId, name) => {
    String.validate.notVoid(name)

    return (async () => {
      const workGroup = await WorkGroup.findOne(workGroupId) 
      
      if (!workGroup) throw new UnexistenceError(`workgroup with ${workGroupId} not exist`)
      if(workGroup.creator.toString()!== userId) 
        throw new UnexistenceError(`User not exist`)

      const alreadyExist = workGroup.departments.some(department=> department.name === name)

      if(alreadyExist) 
       throw new  DuplicityError(`the name ${name} is already exist`)

      const department = new Department({name})

      workGroup.departments.push(department)

      await workGroup.save()
    })()
}