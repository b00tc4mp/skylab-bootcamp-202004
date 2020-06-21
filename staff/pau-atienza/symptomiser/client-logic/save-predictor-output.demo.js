require('commons/polyfills/string')
const context = require('./context')

savePredictorOutput = require('./save-predictor-output')

context.storage = {navigation: JSON.stringify({predictorInput: {content: "hello", limit: "5", date: new Date().toISOString()}})}

const results = {prediction: [{predictionName: "cough", predictionCode: "HP:0000010"}]}

savePredictorOutput(results)

console.log(context.storage)