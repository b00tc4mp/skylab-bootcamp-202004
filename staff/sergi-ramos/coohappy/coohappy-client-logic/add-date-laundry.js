require('coohappy-commons/polyfills/string')
const { utils: { Email, call } } = require('coohappy-commons')
const context = require('./context')

module.exports = function (day, hour) {
    
    day = day.toString()
    String.validate.notVoid(day)
  
    String.validate.notVoid(hour)

    return (async () => {
        
        const token = await this.storage.getItem('TOKEN')
        
        const response = await call(
            'POST',
            `${this.API_URL}/cohousings/laundry`,
            JSON.stringify({ day, hour }),
            { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` })

        const { status } = response;
        
        if (status === 201) return

        const { error } = JSON.parse(response.body)

        throw new Error(error)
    })()
}.bind(context)