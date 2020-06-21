require('cook-wise-commons/polyfills/string')
const { utils: {  call } } = require('cook-wise-commons')

module.exports = function(weekday,timeline,recipeId,token) {debugger
    
String.validate.notVoid(token)
String.validate.notVoid(recipeId)
String.validate.notVoid(timeline)
String.validate.notVoid(weekday)
    let schedule = {weekday,timeline, recipeId}
    console.log(recipeId,timeline,weekday)
    console.log(schedule)

    return call('PATCH', `http://192.168.0.17:8080/api/tooglemenu`,
    `{"schedule" : {"weekday": "${weekday}", "timeline": "${timeline}", "recipe":"${recipeId}"} }`,{ 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }
        )
        .then(({ status, body }) => {
            console.log(body,status)
            if (status === 204) {
                
            return
            
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}