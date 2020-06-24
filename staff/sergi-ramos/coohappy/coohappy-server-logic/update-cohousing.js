require('coohappy-commons/polyfills/string')
require('coohappy-commons/polyfills/json')
require('coohappy-commons/polyfills/number')
const { errors: { UnexistenceError } } = require('coohappy-commons')
const { mongoose: { ObjectId }, models: { User, Cohousing } } = require('coohappy-data')

/**
 * Update cohousing.
 * 
 * @param {object} dataToUpdate all data user want to change of cohousing. 
 * @param {string} userId user id of current user. 
 * 
 * @throws {Error} When api return some error 
 *
 */

module.exports = (userId, dataToUpdate) => {

    if (typeof dataToUpdate !== 'object') throw new TypeError(`${dataToUpdate} is not an object`)
    String.validate.notVoid(userId)
    for (const key in dataToUpdate) {
        if (key === 'name') String.validate.notVoid(dataToUpdate[key])
        if (key === 'address') {
            if (typeof dataToUpdate.address !== 'object') throw new TypeError(`${dataToUpdate.address} is not an object`)
            const values = Object.values(dataToUpdate[key])
            values.forEach(value => String.validate.notVoid(value))
        }
    }

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new UnexistenceError(`User with id ${userId} does not exist`)

        const cohousing = await Cohousing.findOneAndUpdate({ members: ObjectId(userId) }, dataToUpdate)
        if(!cohousing) throw new UnexistenceError(`user with id ${userId} has not already cohousing`)
        return
    })()




}