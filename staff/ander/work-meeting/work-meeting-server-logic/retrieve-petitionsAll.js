require('work-meeting-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { WorkGroup} } = require('work-meeting-data')

module.exports = (workgroupId ,userId)=> {
    String.validate.notVoid(userId)

    return WorkGroup.findOne({ _id: ObjectId(workgroupId)})
        .then(workGroup => {
            if (!workGroup) throw new Error(`workgroup with id ${workGroupId} does not exist`)
            const {petitions, creator} = workGroup
            if(creator.toString()===userId)
            return petitions
        })
        .then(_petitions=>{
            const petitionArray=[]
            for(petition in _petitions){
                if(petition.status==='pending')
                    petitionArray.push(petition)
            }
            return petitionArray
        })
}