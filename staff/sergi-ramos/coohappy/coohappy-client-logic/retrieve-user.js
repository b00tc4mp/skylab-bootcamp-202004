require('coohappy-commons/polyfills/string')
const { utils: { Email, call } } = require('coohappy-commons')
const { API_URL } = require('./context')

module.exports = (token) => {

    String.validate.notVoid(token)
    
    return (async () => {
      
       const res = await call('GET',`${API_URL}users`, undefined, { 'Authorization': `Bearer ${token}` })
         
                if (res.status === 200) return JSON.parse(res.body)

                const { error } = JSON.parse(res.body)

                throw new Error(error)
            })()
}