require('misc-commons/polyfills/string')
const { utils: { Email, call } } = require('misc-commons') 

module.exports = (token) => {
    String.validate.notVoid(token)

    return call('GET', 'http://localhost:8080/users/retrieve',undefined,
        { Authorization: `Bearer ${token}`})
     
            .then(({status, body}) => {
                if (status === 200) {
                    const { name, surname, email } = JSON.parse(body)                
                    
                    return { name, surname, email }
                }
                else throw new Error('something has happeneed')
            })   
}