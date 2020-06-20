require('coohappy-commons/polyfills/string')
const { utils: { Email, call } } = require('coohappy-commons')
const { API_URL } = require('./context')

module.exports = (foodItem, token) => {
   
    String.validate.notVoid(token)
    String.validate.notVoid(foodItem)    

    return (async () => {

        const response = await call(
            'PATCH',
            `${API_URL}users/food/substract`,
            JSON.stringify({foodItem}),
            { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` })

        const { status } = response;
        if (status === 204) return
        
        const { error } = JSON.parse(response.body)

        throw new Error(error)
    })()
}