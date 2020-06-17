require('work-meeting-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { User} } = require('work-meeting-data')

module.exports = userId => {
    String.validate.notVoid(userId)

    return User.findOne({ _id: ObjectId(userId)})
        .then(user => {
            if (!user) throw new Error(`user with id ${UserId} does not exist`)
            const {workGroups} = user
            const workGroup = workGroups.map(workGroup => {return workGroup.toString()})
            return workGroup

        })
}