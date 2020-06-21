require('commons/polyfills/string')
require('commons/polyfills/json')
const context = require('./context')


module.exports = function(results){
    JSON.validate(results)

    const { prediction } = results

    JSON.validate(prediction)

    prediction.forEach(({predictionCode, predictionName}) =>{
        String.validate.notVoid(predictionCode)
        String.validate.notVoid(predictionName)
    })

    if(!this.storage.navigation) throw new Error("Oops! Some important information was lost - please restart the search")

    String.validate.notVoid(this.storage.navigation)

    const navigation = JSON.parse(this.storage.navigation)

    if(!navigation.predictorInput) throw new Error("Oops! Some important information was lost - please restart the search")

    JSON.validate(navigation.predictorInput)

    const {content, limit, date} = navigation.predictorInput

    String.validate.notVoid(content)
    String.validate.notVoid(limit)
    String.validate.isISODate(date)

    const predictorOutput = {prediction, date: new Date().toISOString()}

    navigation.predictorOutput = predictorOutput

    this.storage.navigation = JSON.stringify(navigation)

    return predictorOutput

}.bind(context)