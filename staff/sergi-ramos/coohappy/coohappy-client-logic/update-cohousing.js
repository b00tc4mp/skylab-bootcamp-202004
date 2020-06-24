require('coohappy-commons/polyfills/string')
const { utils: { call } } = require('coohappy-commons')
const context = require('./context')

/**
 * Update cohousing.
 * 
 * @param {object} dataToUpdate all data user want to change of cohousing. 
 * 
 * @throws {Error} When api return some error 
 *
 */

module.exports = function(dataToUpdate) {

    return (async () => {

        const token = await this.storage.getItem('TOKEN')
      
       const res = await call('PATCH',`${this.API_URL}/cohousings`, JSON.stringify(dataToUpdate), { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` })
         
                if (res.status === 204) return 

                const { error } = JSON.parse(res.body)

                throw new Error(error)
            })()
}.bind(context)