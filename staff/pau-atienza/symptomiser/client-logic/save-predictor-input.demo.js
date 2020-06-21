require('commons/polyfills/string')
const context = require('./context')

savePredictorInput = require('./save-predictor-input')

context.storage = {}

const query = "sore throat"

savePredictorInput(query)

console.log(context.storage)