require('coohappy-commons/polyfills/string')
const { utils: { Email, call } } = require('coohappy-commons')
const { API_URL } = require('./context')

module.exports = (token, singleMessage, date) => {

    String.validate.notVoid(token)
    String.validate.notVoid(singleMessage)
    if(typeof date !== 'object') throw TypeError(`${date} is not an object`)


    return (async () => {

       const res = await call('POST',
       `${API_URL}cohousings/message`, 
       JSON.stringify({ singleMessage, date }), 
       { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
         
                if (res.status === 201) return

                const { error } = JSON.parse(res.body)

                throw new Error(error)
            })()
}