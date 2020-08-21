/**
 * if the user is undefined returns an array with the users, if not add the user as read
 * @param {string} summaryId Id of summary
 * @param {string} userId the user who has read it
 * @throws {TypeError} Throws an error if user not exist
 * @throws {TypeError} Throws an error if user already exist
 * @throws {TypeError} Throws an error if summary not exist
 */
require('work-meeting-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { Summary, User } } = require('work-meeting-data')
const { UnexistenceError, DuplicityError } = require('work-meeting-commons/errors')


module.exports = (userId, summaryId) => {

    String.validate.notVoid(userId)
    String.validate.notVoid(summaryId)


    return (async()=>{
        
        const [user,summary] = await Promise.all([User.findById(userId), Summary.findById(summaryId)])
        if(!user) throw new UnexistenceError(`user ${userId} not exist`)
        if(!summary) throw new UnexistenceError(`summary ${summaryId} not exist`)

        await Summary.findByIdAndUpdate(summaryId, { $addToSet: { readBy: userId}})

    })()


}