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

module.exports = (summaryId, userId) => {

    
    String.validate.notVoid(summaryId)

if(userId!==undefined){
    String.validate.notVoid(userId)
    return (async()=>{
        
        const user = await User.findById(userId)
        if (!user) throw new UnexistenceError(`user with Id ${userId} not exist`)
        const summary = await Summary.findById(summaryId)
        if (!summary) throw new UnexistenceError(`summary with Id ${summaryId} not exist`)

        const {readBy} = summary
        const alreadyExist= readBy.includes(userId)
        if(alreadyExist) throw new DuplicityError(`user with Id ${userId} already exists`)
        readBy.push(ObjectId(userId))
        await summary.save()

    })()

}else {
    return ( async()=>{
        const summary = await Summary.findById(summaryId)
    if (!summary) throw new UnexistenceError(`summary with Id ${summaryId} not exist`)
    const {readBy} = summary
    return readBy
    })()
    
}
}