/**
 * if the user is undefined returns an array with the users, if not add the user as read
 * @param {string} summaryId Id of summary
 * @param {string} userId the user who has read it
 * @throws {TypeError} Throws an error if user not exist
 * @throws {TypeError} Throws an error if user already exist
 * @throws {TypeError} Throws an error if summary not exist
 */
require('work-meeting-commons/polyfills/string')
const { models: { Summary } } = require('work-meeting-data')
const { UnexistenceError} = require('work-meeting-commons/errors')


module.exports = (summaryId) => {

    String.validate.notVoid(summaryId)

    return ( async()=>{
        const summary = await Summary.findById(summaryId)
    if (!summary) throw new UnexistenceError(`summary with Id ${summaryId} not exist`)
    const {readBy} = summary
    return readBy
    })()
    

}