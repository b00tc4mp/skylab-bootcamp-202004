/**
 * returns work groups array
 * @param {string} userId Id of user
 * @throws {TypeError} Throws an error if user not exist
 */
require('work-meeting-commons/polyfills/string')
const {models: { User} } = require('work-meeting-data')
const { UnexistenceError } = require('work-meeting-commons/errors')

module.exports = userId => {
    String.validate.notVoid(userId)

    return User.findById(userId).populate('workGroups').lean()
        .then(user => {
            if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
            const {workGroups} = user
            debugger
            return workGroups

        })
}