require('work-meeting-commons/polyfills/string')
const { UnexistenceError, DuplicityError } = require('work-meeting-commons/errors')
const { models: { User, Summary } } = require('work-meeting-data')
/**
 * Add petition in selected work group.
 * @param {string} summaryId Id of the summary where add the user
 * @param {string} userId Id of the user
 * @returns {Promise<void>} return empty promise of succesfull creation
 * @throws {TypeError} Throws an error if user not a string
 * @throws {TypeError} Throws an error if summaryId not a string
 * @throws {UnexistenceError} Throws an error if user not exist
 * @throws {UnexistenceError} Throws an error if summary not exist
 * @throws {DuplicityError} Throws an error if user already added
 */



module.exports = (userId, summaryId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(summaryId)

    return (async () => {

        const [user, summary] = await Promise.all([User.findById(userId),
        Summary.findById(summaryId)])

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
        if (!summary) throw new UnexistenceError(`summary with id ${summaryId} does not exist`)

        const {members} = summary
        const alreadyAdded= members.some(member=> member.toString()== userId)
        if(alreadyAdded) throw new DuplicityError(`user with id ${userId} already added`)
        await Summary.findByIdAndUpdate(summaryId, { $addToSet: { members: userId } })

        await User.findByIdAndUpdate(userId, { $addToSet: { summaries: summaryId } })

        return;
    })()
}