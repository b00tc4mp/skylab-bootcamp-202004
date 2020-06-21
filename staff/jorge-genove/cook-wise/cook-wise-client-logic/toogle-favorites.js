require('cook-wise-commons/polyfills/string')
const { utils: {  call } } = require('cook-wise-commons')

module.exports = function(token,recipeId) {debugger
    
String.validate.notVoid(token)
String.validate.notVoid(recipeId)


    return call('PATCH', `http://192.168.0.17:8080/api/toogle/${recipeId}`,
    undefined,{ 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }
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