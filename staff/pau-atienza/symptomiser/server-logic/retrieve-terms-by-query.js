require('dotenv').config()
const { env: { PREDICTOR_URL } } = process
require('commons/polyfills/string')
const { models: {Term}, cleanTerm } = require('data')
const { errors: { UnexistenceError }, utils: { call }  } = require('commons')
global.fetch = require('node-fetch')

module.exports = query => {
    String.validate.notVoid(query)
    let result = {lower: [], higher: []}
    return (async ()=>{
        const { status, body } = await call('GET', `${PREDICTOR_URL}?content=${query}&limit=6`,null, null)
        if (status !== 200){
            const { error } = JSON.parse(body)

            throw new Error(error)
        }

        return JSON.parse(body)
    })()
}