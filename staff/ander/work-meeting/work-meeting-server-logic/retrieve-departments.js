require('work-meeting-commons/polyfills/string')
const { models: { User,WorkGroup,Department} } = require('work-meeting-data')
const { errors: {UnexistenceError} } = require('work-meeting-commons')
const {utils:{ sanitize }} = require('work-meeting-commons')



module.exports = (userId, workGroupId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(workGroupId)

            return(async()=>{

                const [user,workGroup]= await Promise.all([User.findById(userId).lean(), WorkGroup.findById(workGroupId).lean()])
                if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
                if (!workGroup) throw new UnexistenceError(`workgroup with id ${workGroupId} does not exist`)
                if(workGroup.creator.toString()!==userId) throw new UnexistenceError(`user with id ${userId} is not creator`)

                const departments = Department.find({workGroup:workGroupId}).lean()
                sanitize(departments)
                debugger

                return departments
        



            })()
    
}