/**
 * returns work groups array
 * @param {string}  Id of user
 * @throws {TypeError} Throws an error if user not exist
 */
require('work-meeting-commons/polyfills/string')
const {models: { WorkGroup} } = require('work-meeting-data')
const { UnexistenceError } = require('work-meeting-commons/errors')

module.exports = workGroupId => {
    String.validate.notVoid(workGroupId)

    return WorkGroup.findById(workGroupId)
        .then(workGroup => {
            if (!workGroup) throw new UnexistenceError(`workGroup with id ${workGroupId} does not exist`)
            return workGroup

        })
}