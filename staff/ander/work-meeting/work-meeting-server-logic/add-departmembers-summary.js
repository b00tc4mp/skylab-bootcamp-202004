require('work-meeting-commons/polyfills/string')
const { UnexistenceError, DuplicityError } = require('work-meeting-commons/errors')
const { models: { User, Department, Summary } } = require('work-meeting-data')
const department = require('work-meeting-data/models/schemas/department')
/**
 * Add petition in selected work group.
 * @param {string} summaryId Id of the summary where add the user
 * @param {string} departmentId Id of the user
 * @returns {Promise<void>} return empty promise of succesfull creation
 * @throws {TypeError} Throws an error if user not a string
 * @throws {TypeError} Throws an error if summaryId not a string
 * @throws {UnexistenceError} Throws an error if user not exist
 * @throws {UnexistenceError} Throws an error if summary not exist
 * @throws {DuplicityError} Throws an error if user already added
 */



module.exports = (departmentId, summaryId) => {

    String.validate.notVoid(departmentId)
    String.validate.notVoid(summaryId)

    return (async () => {

        const [department, summary] = await Promise.all([Department.findById(departmentId),
        Summary.findById(summaryId)])

        if (!department) throw new UnexistenceError(`department with id ${departmentId} does not exist`)
        if (!summary) throw new UnexistenceError(`summary with id ${summaryId} does not exist`)

        const { members } = department
        members.forEach((member) => {
            return (async () => {
                let _member = member.toString()
                await Summary.findByIdAndUpdate(summaryId, { $addToSet: { members: _member } })
            })()
        });
        members.forEach((member) => {
            return (async () => {
                let _member = member.toString()
                await User.findByIdAndUpdate(_member, { $addToSet: { summaries: summaryId } })
            })()
        });

    })()
}