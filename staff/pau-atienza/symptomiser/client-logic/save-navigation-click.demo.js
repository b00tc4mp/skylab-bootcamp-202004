require('commons/polyfills/string')
const context = require('./context')

saveClick = require('./save-navigation-click')

context.storage = {navigation: JSON.stringify({predictorInput: {content: "hello", limit: "5", date: new Date().toISOString()}, predictorOutput:  {prediction: [{predictionName: "hello", predictionCode: "world"}], date: new Date().toISOString()}})}

const HPO_id =  "HP:0000010"

saveClick(HPO_id)

console.log(context.storage)