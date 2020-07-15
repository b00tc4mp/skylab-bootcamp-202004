require('misc-commons/polyfills/string')
const { utils: { call } } = require('misc-commons')

module.exports = (token) => {
    String.validate(token)

    return call('GET', 'http://localhost:8080/users/',
    undefined,
    { 'Authorization': `Bearer ${token}` })
        .then(({ status, response }) => {
            if (status !== 200) throw new Error({ error: { response } })

            return JSON.parse(response)
        })
}