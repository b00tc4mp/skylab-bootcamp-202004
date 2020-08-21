require('work-meeting-commons/polyfills/string')
const { errors: { DuplicityError, UnexistenceError } } = require('work-meeting-commons')
const { models: { WorkGroup, User, Department } } = require('work-meeting-data')
/**
 * Add member in a department
 * @param {string} workGroupId Id of the work group to which we are going to make the petition
 * @param {string} userId Id of the user
 * @param {string} departmentId Id of department wich we will add members
 * @returns {Promise<void>} return empty promise of succesfull creation
 * @throws {TypeError} Throws an error if user not a string
 * @throws {TypeError} Throws an error if workgroup not a string
 * @throws {TypeError} Throws an error if user not a string
 * @throws {UnexistenceError} Throws an error if user not exist
 * @throws {UnexistenceError} Throws an error if workgroup not exist
 * @throws {UnexistenceError} Throws an error if department not exist
 * @throws {DuplicityError} Throws an error if user already added in departments
 * 
 */

module.exports = (userId, workGroupId, departmentId) => {

    String.validate.notVoid(userId)
    String.validate.notVoid(workGroupId)
    String.validate.notVoid(departmentId)

    return (async () => {
        const [user, workGroup, department] = await Promise.all([
            User.findById(userId), 
            WorkGroup.findById(workGroupId),
            Department.findById(departmentId)
        ])
        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
        if (!workGroup) throw new UnexistenceError(`workgroup with id ${workGroupId} does not exist`)
        if(!department) throw new UnexistenceError(`department wirh id ${departmentId} does not exist`)
        const alreadyExist = department.members.some(member=> member.toString()===userId)
        if (alreadyExist) throw new DuplicityError(`user with id ${userId} already added in departments`)

        await Department.findByIdAndUpdate(departmentId,{$addToSet:{members: userId}})

        return;
    })()


}