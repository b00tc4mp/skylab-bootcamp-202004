require('misc-commons/polyfills/string')
const { utils: { Email, call } } = require('misc-commons')
global.XMLHttpRequest = require('xhr2')
require('misc-commons/polyfills/url')

module.exports = (email, password) => {
    Email.validate(email)

    // String.validate.lengthGreaterEqualThan(password, 8)

    return call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
        `{ "username": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' })
        .then(({ status, response }) => {debugger
            // let error
            if (status !== 200) throw console.error('wrong credentials' )
            const { token }= JSON.parse(response)
            debugger
            return token
        })
        // .catch(error => console.error('ko', error))

}
