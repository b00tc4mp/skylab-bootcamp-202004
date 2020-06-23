/**
 * Retrieve user portfolio
 * 
 * @returns {Promise<Array>} The users trades with products details if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If parameter does not match the format.
 * @throws {Error} If the token is empty.
 * 
 */

require('gym-commons/polyfills/string')
const {utils: {call}} = require('gym-commons')
const context = require('./context')
const moment = require('moment')

module.exports = function(){
    const { token } = context.storage

    return call('GET', `${this.API_URL}/users/trades`,
    undefined,
    {'Authorization': `Bearer ${token}`})
    .then(({status, body}) => {
        if(status === 200){
            let results =  JSON.parse(body)

            return results.map(item => {
                item.product.settlementDate = moment(item.product.settlementDate).format('DD MMMM YY')
                
                for(let i in item.trades){
                    item.trades[i].price.date = moment(item.trades[i].price.date).format('DD MMMM YY')
                }

                return item
            })
        }else {
            const { error } = JSON.parse(body)

            throw new Error(error)
        }
    })
}.bind(context)

