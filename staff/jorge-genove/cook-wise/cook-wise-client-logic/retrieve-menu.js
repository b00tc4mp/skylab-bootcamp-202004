require('cook-wise-commons/polyfills/string')
const { utils: {  call } } = require('cook-wise-commons')

module.exports = function(token) {debugger
    
String.validate.notVoid(token)


    return call('GET', `http://192.168.0.17:8080/api/retrieve/menu`,
       undefined,{ 'Authorization': `Bearer ${token}` }
        )
        .then(({ status, body }) => {
            if (status === 200) {
                if (!body) return [];
                const  schedule  = JSON.parse(body)

                return schedule
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}
