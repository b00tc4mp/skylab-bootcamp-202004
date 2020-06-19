require('coohappy-commons/polyfills/string')
const { utils: { Email, call } } = require('coohappy-commons')
const { API_URL } = require('./context')

module.exports = (token, message, date) => {

    String.validate.notVoid(token)
    String.validate.notVoid(message)
    if(typeof date !== 'object') throw TypeError(`${date} is not an object`)
debugger
    return (async () => {

       const res = await call('POST',
       `${API_URL}cohousings/message`, 
       JSON.stringify({ message, date }), 
       { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
         
                if (res.status === 201) return

                const { error } = JSON.parse(res.body)

                throw new Error(error)
            })()
}