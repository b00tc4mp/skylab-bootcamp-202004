require('cook-wise-commons/polyfills/string')
const { utils: {  call } } = require('cook-wise-commons')
const context = require('./context')

module.exports = function(weekday) {
    

String.validate.notVoid(weekday)
console.log(weekday)

return (async() => {

 const token =  await this.storage.getItem('TOKEN')

  const res = await call('DELETE',`${this.API_URL}/deletedaymenu`,
    `{ "weekday": "${weekday}"}`,{ 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }
        )
        
            if (res.status === 202) {
                console.log(res.status)
               return
            } else {
                const { error } = JSON.parse(res.body)

                throw new Error(error)
            }
        })() 
}.bind(context)

   