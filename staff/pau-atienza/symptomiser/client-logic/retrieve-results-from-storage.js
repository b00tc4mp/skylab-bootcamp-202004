const context = require('./context')
require('commons/polyfills/string')
require('commons/polyfills/json')

module.exports = function(){
    const { navigation } = this.storage

    if(navigation) {
        String.validate.notVoid(navigation)
        const { predictorOutput } = JSON.parse(navigation)
        
        if (predictorOutput){
            JSON.validateNotArray(predictorOutput)
            return predictorOutput
        }
        
    }

    return null
    
}.bind(context)