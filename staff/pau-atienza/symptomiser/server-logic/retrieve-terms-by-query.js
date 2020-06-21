require('dotenv').config()
const { env: { PREDICTOR_URL, LIMIT } } = process

require('commons/polyfills/string')
const {  utils: { call }  } = require('commons')
global.fetch = require('node-fetch')

module.exports = query => {
    String.validate.notVoid(query)

    return (async ()=>{
        const { status, body } = await call('GET', `${PREDICTOR_URL}?content=${query}&limit=${LIMIT}`,null, null)
        if (status !== 200){
            const { error } = JSON.parse(body)

            throw new Error(error)
        }

        parsedPrediction = JSON.parse(body)

        parsedPrediction.prediction.forEach(({"prediction-code": predictionCode, "prediction-name": predictionName}, i, prediction) =>{
            prediction[i] = {predictionCode, predictionName}
        })

        return parsedPrediction
    })()
}