/** 
 * @param {string} password user's input of his personal password, should be string.
 * @param {email} email user's input of his personal username, should be perform Regex provided. 
 * @throws {TypeError} if users password it is not string .
 * @throws {Error} if users email does not attend the regex provided.
 */
require('aquaponics-commons/polyfills/string')
const { models: { User } } = require('aquaponics-data')
const { utils: { Email }, errors: { UnexistenceError, CredentialsError } } = require('aquaponics-commons')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)
    return User.findOne({ email })
        .then(user => {
            if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)

            return bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) throw new CredentialsError('wrong password')

                    return user.id
                })
        })
} 

/**
 * @promise returns
 * @return {UnexistenceError} if users email is not found on data base.
 * @return {CredentialsError} if users password doesnt match the email provided.
 * @return {Error} It may receive an error in case remote logic fails or there is a network problem.
 * @return {user.id} returns the Id if succeded. 
 */