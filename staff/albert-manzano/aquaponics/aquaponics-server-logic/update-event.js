/**
 * should update users event's using by eventId and his own userId
 * 
 * @param {string} description user's input of his event, should be string.
 * @param {string} userId user's id, should be string.
 * @param {string} eventId evnets id, should be string.
 * @param {date} date user's date for the event, should be a date.
 * @throws {TypeError} if users input are/is not matching the type needed.
 * @throws {VoidError} if users inputs doesnt exist.
 */

require('aquaponics-commons/polyfills/date')
require('aquaponics-commons/polyfills/string')
require('aquaponics-commons/polyfills/json')

const { errors: { UnexistenceError } } = require('aquaponics-commons')
const { models: { User,Event } } = require('aquaponics-data')

module.exports = (newDate, newDescription, userId, eventId) => {
    if(!newDate) throw new Error (`date is empty or blank`)
    String.validate.notVoid(newDescription)
    String.validate.notVoid(userId)
    String.validate.notVoid(eventId)
    Date.validate(newDate)
    String.validate(newDescription)
    String.validate(userId)
    String.validate(eventId)

    return User.findById( userId )
        .then(user => {
            if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
            return Event.findById(eventId)
        })
        .then(event=>{ 
            if(!event)throw new UnexistenceError(`event with id ${eventId} does not exist`)
            return Event.findByIdAndUpdate(eventId,{$set:{date:newDate,description:newDescription}})
        })
        .then(() => { })
}

/**
 * @promise returns :
 * @return {UnexistenceError} if userid passed does not match one in data base.
 * @return {Error} It may receive an error in case remote logic fails or there is a network problem.
 * @return empty if every succeded.
 *
 */