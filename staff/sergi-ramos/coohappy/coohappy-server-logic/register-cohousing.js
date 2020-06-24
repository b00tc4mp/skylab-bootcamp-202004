require('coohappy-commons/polyfills/string')
require('coohappy-commons/polyfills/json')
const { errors: { UnexistenceError, DuplicityError } } = require('coohappy-commons')
const { models: { Cohousing, User } } = require('coohappy-data')
const { utils: { randomAccessCode } } = require('coohappy-commons')

/**
 * Register new  cohousing.
 * 
 * @param {string} name Cohousing name. 
 * @param {Object} address - cohousing address
 * @param {string} address.street - cohousing street
 * @param {string} address.number - cohousing address
 * @param {string} address.city - cohousing city
 * @param {string} address.country - cohousing country
 * @param {number} laundryNem - num of laundries
 * @param {string} userId - id of the current
 * 
 * @throws {Error} When api return some error 
 *
 */


module.exports = (name, address, laundryNum, userId) => {
    String.validate.notVoid(name)
    if (typeof address !== 'object') throw new TypeError(`${address} is not an object`)
    String.validate.notVoid(userId)
    const members = []

    return (async () => {
        const [user, cohousing] = await Promise.all([
            User.findById(userId),
            Cohousing.findOne({ author: userId })
        ])

        if (cohousing) throw new DuplicityError(`user: ${user.name} ${user.surname} already belongs to a cohousing`)
        if (!user) throw new UnexistenceError(`user does not exists`)

        const accessCode = randomAccessCode(name)

        members.push(user)

        const newCohousing = await Cohousing.create({ author: userId, name, address,laundryNum, members, accessCode})

        await User.findByIdAndUpdate(userId, { $set: { cohousing: newCohousing._id, role :'admin' } })

        return
    })()
}