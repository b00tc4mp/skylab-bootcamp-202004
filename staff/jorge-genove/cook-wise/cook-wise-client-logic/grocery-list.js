require('cook-wise-commons/polyfills/string')
const { utils: {  call } } = require('cook-wise-commons')

module.exports = function(token) {debugger
    
String.validate.notVoid(token)


    return call('GET', `http://192.168.0.17:8080/api/grocerylist`,
       undefined,{ 'Authorization': `Bearer ${token}` }
        )
        .then(({ status, body }) => {
            if (status === 200) {
                if (!body) return [];
                const  groceryList  = JSON.parse(body)

                return groceryList
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}
