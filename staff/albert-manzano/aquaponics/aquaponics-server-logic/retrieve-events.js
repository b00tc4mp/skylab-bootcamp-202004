/**
 * should retrieve user's events by his own userId.
 * 
 * @param {string} description user's input of his event, should be string.
 * @param {string} userId user's id, should be string.
 * @param {date} date user's date for the event, should be a date.
 * @throws {TypeError} if users input are/is not matching the type needed.
 * @throws {VoidError} if users inputs doesnt exist.
 */

require('aquaponics-commons/polyfills/date')
require('aquaponics-commons/polyfills/string')
require('aquaponics-commons/polyfills/json')

const { errors: { UnexistenceError } } = require('aquaponics-commons')
const { models: { User} } = require('aquaponics-data')

module.exports = (date, description, userId) => {
    if (!date) throw new Error(`date is empty or blank`)
    String.validate.notVoid(description)
    String.validate.notVoid(userId)
    Date.validate(date)
    String.validate(description)
    String.validate(userId)

    return User.findById(userId).populate('events').lean()
        .then(allEvents => {
            if (!allEvents) throw new UnexistenceError(`event with id ${eventId} does not exist`)
            return allEvents = allEvents.map(event => {
                event.id = event_.id
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