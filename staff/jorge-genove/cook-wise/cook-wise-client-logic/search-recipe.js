require('cook-wise-commons/polyfills/string')
const { utils: {  call } } = require('cook-wise-commons')

module.exports = function(query,token) {debugger
    
String.validate.notVoid(token)
String.validate.notVoid(query)


    return call('GET', `http://192.168.0.17:8080/api/searchrecipes?name=${query}`,
       undefined,{ 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }
        )
        .then(({ status, body }) => {
            console.log(body,status)
            if (status === 200) {
                console.log(JSON.parse(body))
                const  recipes  = JSON.parse(body)

                return recipes
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}