require('work-meeting-commons/polyfills/string')
const { errors: { DuplicityError, UnexistenceError } } = require('work-meeting-commons')
const { models: { User, Department, WorkGroup } } = require('work-meeting-data')

/**
 * create a new meeting with title, content and user Id
 * @param {string} userId user's unique ID
 * @param {string} workgroupId meeting content
 * @param {string} name department name
 * 
 * @returns {Promise<void>} returns an empty promise on a successful creation
 * @throws {TypeError} Throws an error if user not string
 * @throws {TypeError} Throws an error if workgroup not a string
 * @throws {TypeError} Throws an error if name not a string
 * @throws {UnexistenceError} throws an error if the user does not exist on the database
 * @throws {UnexistenceError} throws an error if the workgroup does not exist on the database
 * @throws {DuplicityError} throws an error if department name already exist
 * 
 */
module.exports = (userId, workGroupId, name) => {
  String.validate.notVoid(userId)
  String.validate.notVoid(workGroupId)
  String.validate.notVoid(name)

  return (async () => {
    const [user, workGroup] = await Promise.all([User.findById(userId), WorkGroup.findById(workGroupId)])
    debugger
    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
    if (!workGroup) throw new UnexistenceError(`workgroup with id ${workGroupId} does not exist`)
    if(workGroup.creator.toString() !== userId) throw new Error(`user with id ${userId} is not workgroup creator`)
    
    const exist = await Department.findOne({name, workGroup:workGroupId})
    if (exist) throw new DuplicityError(`department name ${name} already exist`)
    
    const department = await Department.create({ name: name , workGroup: workGroupId})
    await WorkGroup.findByIdAndUpdate(workGroupId, { $addToSet: { departments: department.id }})
    return;
  })()

}