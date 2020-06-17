const { utils: { call } } = require('books-commons')
const context = require('./context')

module.exports = function () {
    return (async()=>{
        const token = await this.storage.getItem('token')
        const resp = await call('GET',`${this.API_URL}/users/`,undefined,{ 'Authorization': `Bearer ${token}` });
        const {status} = resp
        return status === 201
    })()
}.bind(context)