/**
 * retrieve the last ph in the collection of phs listed in the app,
 * @throws {TypeError} if user's id is not a string nor empty
 */

require('aquaponics-commons/polyfills/string')
const { utils: { call } } = require('aquaponics-commons')
const __context__ = require('./context')

module.exports = async function () {
    const token = await this.storage.getItem("token")
    const { status, body } = await call('GET', `${this.API_URL}/ph`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
    if (status === 200) {
    
        return JSON.parse(body)
    } else {
        const { error } = JSON.parse(body)

        throw new Error(error)
    }

}.bind(__context__)

/**
 * @async returns:
 * @return {UnexistenceError} if user can not be found with Id provided.
 * @return {CredentialsError} if user is not admin.
 * @return {object} with last ph and date.
 *
 */

