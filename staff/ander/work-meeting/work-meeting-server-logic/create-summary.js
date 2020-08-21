require('work-meeting-commons/polyfills/string')

const { errors: { UnexistenceError, DuplicityError } } = require('work-meeting-commons')
const { models: { User, Summary, WorkGroup ,Meeting } } = require('work-meeting-data')

/**
 * create a new meeting with title, content and user Id
 * @param {string} title title of the meeting
 * @param {string} content meeting content
 * @param {string} userId Id of the user
 * @param {string} meetingId Id of meeting
 * @returns {Promise<void>} returns an empty promise on a successful creation
 * @throws {TypeError} Throws an error if user not exist
 * @throws {TypeError} Throws an error if meeting not exist
 * @throws {TypeError} Throws an error if user is not a host
 * @throws {TypeError} Throws an error if title already exist
 * @throws {UnexistenceError} Throws an error if user or meeting does not exist in database
 * @throws {DuplicityError} Throws an error if summary title already exist on meeting
 * 
 */

module.exports = (userId, workGroupId,meetingId, title, content) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(workGroupId)
    String.validate.notVoid(meetingId)
    String.validate.notVoid(title)
    String.validate.notVoid(content)

    return (async () => {

        const [user, workGroup, summary, meeting] = await Promise.all([
            User.findById(userId),WorkGroup.findById(workGroupId), Summary.findOne({ title, meeting: meetingId, workGroup:workGroupId }), Meeting.findById(meetingId)])

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
        if (summary) throw new DuplicityError(`summary with title ${title} already exist`)
        if (!meeting) throw new UnexistenceError(`meeting with id ${meetingId} does not exist`)
        if (!workGroup) throw new UnexistenceError(`workGroup with id ${workGroupId} does not exist`)

        const newSummary = await Summary.create({ title, content, meeting: meetingId, workGroup:workGroupId })

        await Meeting.findByIdAndUpdate(meetingId, { $addToSet: { summaries: newSummary.id } })
        /* await User.findByIdAndUpdate(userId, { $addToSet: { summaries: newSummary.id } }) */
        return newSummary





    })()
}
