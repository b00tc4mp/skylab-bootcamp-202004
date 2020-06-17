require('work-meeting-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { WorkGroup} } = require('work-meeting-data')

module.exports = workgroupId => {
    String.validate.notVoid(userId)

    return WorkGroup.findOne({ _id: ObjectId(workgroupId)})
        .then(workGroup => {
            if (!workGroup) throw new Error(`workgroup with id ${workGroupId} does not exist`)

            return workGroup.departments
        })
}