require('cook-wise-commons/polyfills/string')
const {getDate} = require('./helpers')
const { utils: {  call } } = require('cook-wise-commons')

module.exports = function(token) {debugger
    
String.validate.notVoid(token)

const day = getDate()

    return call('GET', `http://192.168.0.19:8080/api/day/${day}`,
       undefined,{ 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }
        )
        .then(({ status, body }) => {
            if (status === 200) {
                console.log(JSON.parse(body))
                const  result  = JSON.parse(body)

                return {result, day}
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}

   