require('coohappy-commons/polyfills/string')
const { utils: { Email, call } } = require('coohappy-commons')
const { API_URL } = require('./context')

module.exports = (token, dataToUpdate) => {
console.log(dataToUpdate)
    String.validate.notVoid(token)
    
    return (async () => {
      
       const res = await call('PATCH',`${API_URL}users`, JSON.stringify(dataToUpdate), { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` })
         
                if (res.status === 204) return 

                const { error } = JSON.parse(res.body)

                throw new Error(error)
            })()
}