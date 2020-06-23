require('cook-wise-commons/polyfills/string')
const { utils: {  call } } = require('cook-wise-commons')
const context = require('./context')

module.exports = function(something) {
    
return (async() => {

    const token = await this.storage.getItem('TOKEN')

    const res = await call('GET',`${this.API_URL}/ideas?ingredients=${something.join(',')}`,
    undefined
    ,{ 'Authorization': `Bearer ${token}` }
        )
    if (res.status === 200) {
        if (!res.body) return [];
            const ideas  = JSON.parse(res.body)

            return ideas
    } else {
        const { error } = JSON.parse(res.body)

        throw new Error(error)
        }
    })()
}.bind(context)
