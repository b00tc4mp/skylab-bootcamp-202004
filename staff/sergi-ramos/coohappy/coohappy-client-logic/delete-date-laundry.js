require('coohappy-commons/polyfills/string')
const { utils: { call } } = require('coohappy-commons')
const context = require('./context')

/**
 * Delete reservation date laundry.
 * 
 * @throws {Error} When api return some error 
 *
 */


module.exports = function() {
    
    return (async () => {

        const token = await this.storage.getItem('TOKEN')

        const res = await call('PATCH', `${this.API_URL}/cohousings/laundry`, undefined, { 'Authorization': `Bearer ${token}` })

        if (res.status === 204) return

        const { error } = JSON.parse(res.body)

        throw new Error(error)
    })()
}.bind(context)