require('cook-wise-commons/polyfills/string')
const { utils: {  call } } = require('cook-wise-commons')

module.exports = function(token, recipeId) {debugger
    
String.validate.notVoid(token)
String.validate.notVoid(recipeId)


    return call('GET', `http://192.168.0.19:8080/api/${recipeId}`,
       undefined,{ 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }
        )
        .then(({ status, body }) => {
            if (status === 200) {
                console.log(JSON.parse(body))
                const  recipe  = JSON.parse(body)

                return recipe
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}