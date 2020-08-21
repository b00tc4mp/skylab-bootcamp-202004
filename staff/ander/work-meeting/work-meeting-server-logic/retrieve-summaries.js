require('work-meeting-commons/polyfills/string')
const {models:{User,WorkGroup}} = require('work-meeting-data')
const {errors:{UnexistenceError}, utils:{sanitize}} = require('work-meeting-commons')

module.exports = (userId, workGroupId) => {

    String.validate.notVoid(userId)
    String.validate.notVoid(workGroupId)


    return(async()=>{
            const user= await User.findById(userId).lean().populate('summaries')
            if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`) 
            const workGroup= await WorkGroup.findById(workGroupId)
            if(!workGroup) throw new UnexistenceError(`workGroup with id ${workGroupId} does not exist`)
            const {summaries}= user
            debugger
            const _summaries = summaries.filter(element => element.workGroup.toString()==workGroupId)
            debugger
            sanitize(_summaries)
           
            return _summaries;            

    })() 
}