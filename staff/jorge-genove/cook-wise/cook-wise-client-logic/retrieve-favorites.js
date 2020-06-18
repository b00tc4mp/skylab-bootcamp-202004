require('cook-wise-commons/polyfills/string')
const { utils: {  call } } = require('cook-wise-commons')

module.exports = function(token) {debugger
    
String.validate.notVoid(token)


    return call('GET', `http://192.168.0.19:8080/api/retrievefavorites`,
       undefined,{ 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }
        )
        .then(({ status, body }) => {
            if (status === 200) {
                console.log(JSON.parse(body))
                const  favorites  = JSON.parse(body)

                return favorites
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}

   