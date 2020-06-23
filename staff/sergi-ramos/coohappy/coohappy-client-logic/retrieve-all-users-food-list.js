require('coohappy-commons/polyfills/string')
const { utils: { call } } = require('coohappy-commons')
const context = require('./context')

module.exports = function() {


    
    return (async () => {

        const token = await this.storage.getItem('TOKEN')        

       const res = await call('GET',`${this.API_URL}/cohousings/food`, undefined, { 'Authorization': `Bearer ${token}` })
    
                if (res.status === 200) return JSON.parse(res.body)

                const { error } = JSON.parse(res.body)

                throw new Error(error)
            })()
}.bind(context)