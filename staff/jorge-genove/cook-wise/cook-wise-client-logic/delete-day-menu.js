require('cook-wise-commons/polyfills/string')
const { utils: {  call } } = require('cook-wise-commons')

module.exports = function(weekday,token) {debugger
    
String.validate.notVoid(token)
String.validate.notVoid(weekday)
console.log(weekday,token)


    return call('DELETE', `http://192.168.0.17:8080/api/deletedaymenu`,
    `{ "weekday": "${weekday}"}`,{ 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }
        )
        .then(({ status, body }) => {
            if (status === 202) {
               return
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}

   