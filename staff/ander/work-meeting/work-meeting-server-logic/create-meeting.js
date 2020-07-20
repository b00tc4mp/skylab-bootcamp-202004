
/**
 * create a new meeting with title, content and user Id
 * @param {string} title title of the meeting
 * @param {string} content meeting content
 * @param {string} userId Id of the user
 * @throws {TypeError} Throws an error if user not exist
 * @throws {TypeError} Throws an error if meeting already exist
 * @throws {TypeError} Throws an error if meeting not create
 * 
 */
require('work-meeting-commons/polyfills/string')
require('work-meeting-commons/polyfills/json')
const {errors: { DuplicityError, UnexistenceError } } = require('work-meeting-commons')
const { mongoose: { ObjectId },models: { User, Meeting } } = require('work-meeting-data')

module.exports = (title, content, userId) => {
    String.validate.notVoid(title)
    String.validate.notVoid(content)
    String.validate.notVoid(userId)
    

    return (async () => {
        const user = await User.findOne({_id: ObjectId(userId)}) //findById
        if(!user) throw new UnexistenceError(`user ${userId} not exist`)
        const meeting = await Meeting.findOne({title})
        if(meeting) throw new DuplicityError(`meeting ${title} is already exist`)

        const newMeeting = new Meeting({title, host: userId, content})
        await Meeting.create(newMeeting)
        const _meeting = await Meeting.findOne({title})
        if(!_meeting)
            throw new DuplicityError(`meeting ${title} is not create`)
        
        

        user.host.push(ObjectId(_meeting._id))
       
        await user.save() 
        
       
    })()
}