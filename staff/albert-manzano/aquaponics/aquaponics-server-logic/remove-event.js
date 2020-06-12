/**
 * should remove users event's using by eventId and his own userId
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
const { models: { User, Event } } = require('aquaponics-data')

module.exports = (userId, eventId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(eventId)
   
    String.validate(userId)
    String.validate(eventId)

    return Event.findById(eventId )
        .then(event => {
            if (!event) throw new UnexistenceError(`event with id ${eventId} does not exist`)
            return User.findById(userId)
        })
        .then(user => {
            if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
            
            const {events} = user

            user.events = events.filter(event=> event.toString() !== eventId)
          
            return user.save()
        })
        .then(()=>{Event.findByIdAndDelete({eventId})})
        .then(() => { })
}

/**
 * @promise returns :
 * @return {UnexistenceError} if userid/eventid passed does not match one in data base.
 * @return {Error} It may receive an error in case remote logic fails or there is a network problem.
 * @return empty if every succeded.
 *
 */