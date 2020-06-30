require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const { errors: { UnexistenceError} } = require('work-meeting-commons')
const { models: { User, Meeting } } = require('work-meeting-data')


module.exports = (title, userId, content) => {
    String.validate.notVoid(title)
    String.validate.notVoid(userId)
    String.validate.notVoid(content)

    return (async () => {
        const meeting = new Meeting({title, host: userId, content})
        const user = await User.findOne({_id: Object(userId)})
        if(!user)
            throw new UnexistenceError(`user ${userId} not exist`)
        Meeting.create(meeting)
    })()
}