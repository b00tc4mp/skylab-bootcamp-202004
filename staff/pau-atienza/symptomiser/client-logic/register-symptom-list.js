require('commons/polyfills/string')
require('commons/polyfills/json')
const { utils: { call } } = require('commons')
const context = require('./context')
global.fetch = require('node-fetch')


module.exports = function(symptomList){
    JSON.validateNotArray(symptomList)
    
    let {symptomList: symptoms} = symptomList

    symptoms.forEach(symptom=>String.validate.notVoid(symptom))

    symptomList.date = new Date().toISOString()

    return (async ()=>{
        const {status, body} = await call('POST', `${this.API_URL}/symptomlists`, JSON.stringify(symptomList), {"Content-type": "application/json"})
        if (status !== 200) {
            const {error} = JSON.parse(body)

            throw new Error(error)
        }
        return JSON.parse(body)
    })()

}.bind(context)
