/**
 * Return all info related to the user previously registered to all users.
 * id and password not returned for safety
 * 
 */

require('aquaponics-commons/polyfills/string')
const { utils: { call } } = require('aquaponics-commons')
const context = require('./context')

module.exports = async function () {
    const token = await this.storage.getItem("token")
   
    const { status, body } = await call('GET', `${this.API_URL}/usersall`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        
    if (status === 200) {
        return JSON.parse(body)
    } else {
        const { error } = JSON.parse(body)

        throw new Error(error)
    }

}.bind(context)

/**
 * @promise returns:
 * @return {UnexistenceError} if user can not be found with Id provided.
 * @return {object} user's info is returned.
 * @returns {error} if there is a error conection.
 *
 */