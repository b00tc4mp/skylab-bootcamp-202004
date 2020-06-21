require('commons/polyfills/string')
require('commons/polyfills/json')
const context = require('./context')


module.exports = function(HPO_id){
    String.validate.notVoid(HPO_id)

    if(!this.storage.navigation) throw new Error("Oops! Some important information was lost - please restart the search")

    String.validate.notVoid(this.storage.navigation)

    const navigation = JSON.parse(this.storage.navigation)

    const {predictorInput, predictorOutput, clicks = []} = navigation

    if(!predictorInput || !predictorOutput) throw new Error("Oops! Some important information was lost - please restart the search")

    JSON.validate(predictorInput)

    const {content, limit, date} = predictorInput

    String.validate.notVoid(content)
    String.validate.notVoid(limit)
    String.validate.isISODate(date)

    JSON.validate(predictorOutput)

    const {prediction, date: _date} = predictorOutput

    String.validate.isISODate(_date)

    JSON.validate(prediction)

    prediction.forEach(({predictionCode, predictionName}) =>{
        String.validate.notVoid(predictionCode)
        String.validate.notVoid(predictionName)
    })

    JSON.validate(clicks)

    if (clicks.length){
        clicks.forEach(({HPO_id, date})=>{
            String.validate.notVoid(HPO_id)

            String.validate.isISODate(date)
        })
    }

    clicks.push({HPO_id, date: new Date().toISOString()})

    navigation.clicks = clicks

    this.storage.navigation = JSON.stringify(navigation)

}.bind(context)