require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const { errors: { DuplicityError, UnexistenceError} } = require('work-meeting-commons')
const { mongoose:{ObjectId}, models: { Meeting, Summary } } = require('work-meeting-data')


module.exports = (title, meetingId, userId, content) => {
    String.validate.notVoid(title)
    String.validate.notVoid(userId)
    String.validate.notVoid(content)

    return (async () => {
        const meeting = await Meeting.findOne({host: ObjectId(userId), _id: ObjectId(meetingId)})
        if(!meeting) throw new UnexistenceError(`meeting ${meetingId} not exist`)
        const summary=new Summary(title, content)
        const alreadyExist = meeting.summaries.some(element => element.title === title)
        if(alreadyExist) throw DuplicityError(`title ${title} already exist`)
        meeting.summaries.push(summary)
        Meeting.save()
    })()
}