require("gluttony-commons/polyfills/string")
require("gluttony-commons/polyfills/function")
const { utils: { call } } = require("gluttony-commons")

module.exports = function (token) {
    String.validate.notVoid(token)

    return call('GET', `${process.env.API_URL}/users`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status }) => {
            return status === 200
        })
}