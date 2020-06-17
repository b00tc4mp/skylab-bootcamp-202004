require('work-meeting-commons/polyfills/string')
const {mongoose:{ObjectId}, models: {WorkGroup}}= require('work-meeting-data')
module.exports= query =>{
    String.validate.notVoid(query)
    return (async()=>{
        const workGroup = WorkGroup.find()
        const _workgroup = workGroup.filter(element=>{
            return element.name.includes(query)
        })
        return _workgroup
    })
}