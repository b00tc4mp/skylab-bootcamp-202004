require('cook-wise-commons/polyfills/string')
const {getDate} = require('./helpers')
const { utils: {  call } } = require('cook-wise-commons')

module.exports = function(token,recipeId) {debugger
    
String.validate.notVoid(token)
String.validate.notVoid(recipeId)

const day = getDate()

    return call('DELETE', `http://192.168.0.19:8080/api/deleterecipe`,
    `{ "recipeId": "${recipeId}"}`,{ 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }
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

   