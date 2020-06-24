require('coohappy-commons/polyfills/string')
require('coohappy-commons/polyfills/json')
const { errors: { UnexistenceError, DuplicityError } } = require('coohappy-commons')
const { models: { Cohousing } } = require('coohappy-data')
const { mongoose: { ObjectId } } = require('coohappy-data')

/**
 * Add reservation date laundry.
 * 
 * @param {string} day Reservation day. 
 * @param {string} hour Reservation hour.
 * @param {string} userId id of the current user.
 * 
 * @throws {Error} When api return some error 
 *
 */

module.exports = (day, hour, userId) => {

    String.validate.notVoid(userId)
    String.validate.notVoid(day)
    String.validate.notVoid(hour)

    return (async () => {

        const cohousing = await Cohousing.findOne({ 'members': ObjectId(userId) }).lean()
        if (!cohousing) throw new UnexistenceError(`There is no cohousing with a user with an id ${userId}`)
        const { laundry } = cohousing
        const amountOfLaundries = laundry.filter(laundry => {
            
            return laundry.day === day && laundry.hour === hour
        })

        if (amountOfLaundries.length === 0 || amountOfLaundries.length < cohousing.laundryNum) {

            if (!cohousing.laundry.some(({ user: _user }) => _user.toString() === userId)) {
                await Cohousing.findOneAndUpdate({ 'members': userId }, { $addToSet: { laundry: { day, hour, user: userId } } })

            } else {
                throw new DuplicityError(`You already have a reservation, can only do one`)
            }
        } else {
            throw new DuplicityError('sorry all the washing machines are full ')
        }

    })()
}