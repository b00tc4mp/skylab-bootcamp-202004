/**
 * create a new meeting with title, content and user Id
 * @param {string} title title of the meeting
 * @param {string} content meeting content
 * @param {string} userId Id of the user
 * @param {string} meetingId Id of meeting
 * @throws {TypeError} Throws an error if user not exist
 * @throws {TypeError} Throws an error if meeting not exist
 * @throws {TypeError} Throws an error if user is not a host
 * @throws {TypeError} Throws an error if title already exist
 * 
 */
require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const {errors: { DuplicityError, UnexistenceError } } = require('work-meeting-commons')
const { mongoose: { ObjectId },models: { User, Meeting, Summary } } = require('work-meeting-data')

module.exports = (userId, meetingId, title, content) => {
    String.validate.notVoid(title)
    String.validate.notVoid(content)
    String.validate.notVoid(userId)
    String.validate.notVoid(meetingId)
    

    return (async () => {
        const user = await User.findOne({_id: ObjectId(userId)})
        if(!user) throw new UnexistenceError(`user ${userId} not exist`)
        debugger
        const meeting = await Meeting.findById(meetingId)
        if(!meeting) throw new UnexistenceError(`meeting ${meetingId} is not exist`)

        if(meeting.host.toString() !== userId) throw new UnexistenceError(`user with id ${userId} is not host`)
        const _summary = await Summary.findOne({title})
        if(_summary) throw new DuplicityError(`title ${title} already exist`)
        const newSummary = new Summary({title, content})
        await Summary.create(newSummary)
        const summary = await Summary.findOne({title})
        if(!summary)
            throw new UnexistenceError(`summary ${title} is not create`)
        
        meeting.summaries.push(ObjectId(summary._id))
       
        await meeting.save() 
        return
        
       
    })()
} 
