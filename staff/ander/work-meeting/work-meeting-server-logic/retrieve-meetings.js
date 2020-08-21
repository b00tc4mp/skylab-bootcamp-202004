require('work-meeting-commons/polyfills/string')
const {models:{User, WorkGroup}} = require('work-meeting-data')
const {errors:{UnexistenceError}, utils:{sanitize}} = require('work-meeting-commons')


module.exports = (userId, workGroupId) => {

    String.validate.notVoid(userId)
    String.validate.notVoid(workGroupId)

    return(async()=>{
            const user= await User.findById(userId).lean().populate('host').populate('summaries')
            if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`) 
            const workGroup = await WorkGroup.findById(workGroupId)
            if(!workGroup) throw new UnexistenceError(`workGroup with id ${workGroupId} does not exist`)
            
            const {host}= user
            const _host = host.filter(element => element.workGroup.toString()==workGroupId)
            sanitize(_host)
            debugger
            return _host;            

    })()
}