/**
 * @param {string} userId user's id
 * @throws {TypeError} if user's id is not a string 
 */


require('aquaponics-commons/polyfills/string')
const { models: { User } } = require('aquaponics-data')

const { errors: { UnexistenceError } } = require('aquaponics-commons')

module.exports = (userId) => {
    String.validate.notVoid(userId)


    //delete events

    return User.findById(userId)
        .then(user => {
            if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

            return User.deleteOne(user)
        })
}

/**
 * @promise returns:
 * @return {UnexistenceError} if users with usersId provided can not be found
 * @return {Error} It may receive an error in case remote logic fails or there is a network problem.
 */