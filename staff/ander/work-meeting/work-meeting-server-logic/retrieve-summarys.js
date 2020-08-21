require('work-meeting-commons/polyfills/string')
const { models: { User, Meeting } } = require('work-meeting-data')
const { errors: { UnexistenceError }, utils: { sanitize } } = require('work-meeting-commons')

module.exports = (userId, meetingId) => {

    String.validate.notVoid(userId)
    String.validate.notVoid(meetingId)


    return (async () => {
        const [user, meeting] = await Promise.all([User.findById(userId), (Meeting.findById(meetingId)).lean().populate('summaries')])

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
        if (!meeting) throw new UnexistenceError(`meeting with id ${meetingId} does not exist`)
        const {host} = meeting
        if(host.toString()!== userId) throw new UnexistenceError(`user with id ${userId} not creator`)
       
        const {summaries} = meeting
        
        sanitize(summaries)
        return summaries;
    })()
}
