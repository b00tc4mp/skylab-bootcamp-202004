require('coohappy-commons/polyfills/string')
const { utils: { Email, call } } = require('coohappy-commons')
const { API_URL } = require('./context')

module.exports = (day, hour, token) => {
    day = day.toString()
    String.validate.notVoid(token)
    String.validate.notVoid(day)    
    String.validate.notVoid(hour)

    return (async () => {

        const response = await call(
            'POST',
            `${API_URL}cohousings/laundry`,
            JSON.stringify({ day, hour }),
            { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` })

        const { status } = response;
        if (status === 201) return
        
        const { error } = JSON.parse(response.body)

        throw new Error(error)
    })()
}