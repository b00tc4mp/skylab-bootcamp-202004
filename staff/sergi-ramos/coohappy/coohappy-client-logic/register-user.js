require('coohappy-commons/polyfills/string')
const { utils: { Email, call } } = require('coohappy-commons')
const { API_URL } = require('./context')

module.exports = (name, surname, email, password, confirmPassword) => {

    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)


    return (async () => {

       const res = await call('POST',`${API_URL}users`, JSON.stringify({ name, surname, email, password }), { 'Content-Type': 'application/json' })
         
                if (res.status === 201) return

                const { error } = JSON.parse(res.body)

                throw new Error(error)
            })()
}