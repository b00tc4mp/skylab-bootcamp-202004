require('misc-commons/polyfills/string')
const { utils: { Email, call } } = require('misc-commons')

module.exports = (token) => {
    String.validate(token)

    return call(
        'GET',
        'http://localhost:8080/users',
        null,
        { 'Content-type': 'application/json', 'Authorization': 'Bearer' `${token}` }
    )
        .then(({ status, body }) => {
            if (status === 200) {

                const { user } = JSON.parse(body)
                return user
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}
