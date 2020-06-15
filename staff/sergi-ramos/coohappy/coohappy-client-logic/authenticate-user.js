require('coohappy-commons/polyfills/string')
const { utils: { Email, call } } = require('coohappy-commons')
const { API_URL } = require('./context')

module.exports = (email, password) => {

   
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)


    return (async () => {

        const res = await call('POST', `${API_URL}users/auth`, JSON.stringify({ email, password }), { 'Content-Type': 'application/json' })

        if (res.status === 200) {
            const { token } = JSON.parse(res.body)

            return token
        } else {

            const { error } = JSON.parse(res.body)

            throw new Error(error)
        }

    })()
}