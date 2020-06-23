require('commons/polyfills/string')
require('commons/polyfills/json')
const { utils: { call } } = require('commons')
const context = require('./context')
global.fetch = require('node-fetch')


module.exports = function(){
    const symptomList = JSON.parse(this.storage.submittedSymptoms).map(({term:{symptomId}})=>{
        String.validate.notVoid(symptomId)
        
        return symptomId
    })

    JSON.validate(symptomList)

    const date = new Date().toISOString()

    return (async ()=>{
        const {status, body} = await call('POST', `${this.API_URL}/symptomlists`, JSON.stringify({symptomList, date}), {"Content-type": "application/json"})
        if (status !== 200) {
            const {error} = JSON.parse(body)

            throw new Error(error)
        }
        return JSON.parse(body)
    })()

}.bind(context)