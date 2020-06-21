require('cook-wise-commons/polyfills/string')
const { utils: {  call } } = require('cook-wise-commons')

module.exports = function(weekday,timeline,token) {debugger
    
String.validate.notVoid(token)
String.validate.notVoid(weekday)
String.validate.notVoid(timeline)
console.log(timeline,weekday,token)


    return call('DELETE', `http://192.168.0.17:8080/api/deletetimelinemenu`,
    `{ "weekday": "${weekday}", "timeline": "${timeline}"}`,{ 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }
        )
        .then(({ status, body }) => {
            console.log(status)
            if (status === 202) {
               return
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}

   