require('coohappy-commons/polyfills/string')
const { utils: { Email, call } } = require('coohappy-commons')
const { API_URL } = require('./context')

module.exports = (token) => {
    
    String.validate.notVoid(token)

    return (async () => {

        const res = await call('PATCH', `${API_URL}cohousings/laundry`, undefined, { 'Authorization': `Bearer ${token}` })

        if (res.status === 204) return

        const { error } = JSON.parse(res.body)

        throw new Error(error)
    })()
}