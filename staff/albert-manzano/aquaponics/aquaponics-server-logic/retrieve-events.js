/**
 * should retrieve user's events by his own userId.
 * .
 * @param {string} userId user's id, should be string.
 * @throws {TypeError} if users input are/is not matching the type needed.
 * @throws {VoidError} if users inputs doesnt exist.
 */
require('aquaponics-commons/polyfills/string')
require('aquaponics-commons/polyfills/json')

const { errors: { UnexistenceError } } = require('aquaponics-commons')
const { models: { User} } = require('aquaponics-data')

module.exports = (userId) => {
   
    String.validate.notVoid(userId)
    String.validate(userId)

    return User.findById(userId).populate('events').lean()
        .then(user => {
            if (!user) throw new UnexistenceError(`event with id ${eventId} does not exist`)
            return user.events.map(event => {
                event.id = event._id
                delete event._id
                return event
            })
        })
}

/**
 * @promise returns :
 * @return {UnexistenceError} if userid/eventid passed does not match one in data base.
 * @return {Error} It may receive an error in case remote logic fails or there is a network problem.
 * @return {Array} of events if succeded.
 *
 */