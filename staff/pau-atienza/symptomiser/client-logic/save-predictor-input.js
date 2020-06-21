require('commons/polyfills/string')
const context = require('./context')


module.exports = function(query){
    String.validate.notVoid(query)
    
    predictorInput = {content: query, date: new Date().toISOString(), limit: "5"}

    this.storage.navigation = JSON.stringify({predictorInput})

}.bind(context)