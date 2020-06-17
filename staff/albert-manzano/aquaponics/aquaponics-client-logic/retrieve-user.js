require('aquaponics-commons/polyfills/string')
const { utils: { call } } = require('aquaponics-commons')
const context = require('./context')

module.exports = async function () {
    const token = await this.storage.getItem("token")
   
    const { status, body } = await call('GET', `${this.API_URL}/users`,
        undefined,
        { 'Authorization': `Bearer ${token}` })

    if (status === 200) {
        return JSON.parse(body)
    } else {
        const { error } = JSON.parse(body)

        throw new Error(error)
    }

}.bind(context)