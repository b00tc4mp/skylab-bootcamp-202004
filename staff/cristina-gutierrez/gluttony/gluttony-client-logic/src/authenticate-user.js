require("gluttony-commons/polyfills/string")
const { utils: { Email, call } } = require("gluttony-commons")

module.exports = function (email, password) {
    Email.validate(email)

    String.validate.notVoid(password)

    return call('POST', `${process.env.API_URL}/users/auth`,
        `{ "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' })
        .then(({ status, body }) => {
            if (status === 200) {
                const { token } = JSON.parse(body)

                return token
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}