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
const { models: { User } } = require('aquaponics-data')

module.exports = (date, description, userId, eventId) => {
    Date.validate.notVoid(date)
    String.validate.notVoid(description)
    String.validate.notVoid(userId)
    String.validate.notVoid(eventId)
    Date.validate(date)
    String.validate(description)
    String.validate(userId)
    String.validate(eventId)

    return User.findById({ userId })
        .then(user => {
            if (user) throw new UnexistenceError(`user with id ${userId} does not exist`)
            const { events } = user

            const index =events.findIndex(eventId)
            if(index<0) throw UnexistenceError (`event with id ${eventId} does not exist`)
            
            events[index].description=description
            events[index].date=date

            User.save()
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