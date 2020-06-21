require('cook-wise-commons/polyfills/string')
const { utils: {  call } } = require('cook-wise-commons')

module.exports = function(token, something) {debugger
    console.log('client',something)
String.validate.notVoid(token)


    return call('GET', `http://192.168.0.17:8080/api/ideas?ingredients=${something.join(',')}`,
    undefined
    ,{ 'Authorization': `Bearer ${token}` }
        )
        .then(({ status, body }) => {
            console.log(status)
            if (status === 200) {
                if (!body) return [];
                const ideas  = JSON.parse(body)

                return ideas
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}
