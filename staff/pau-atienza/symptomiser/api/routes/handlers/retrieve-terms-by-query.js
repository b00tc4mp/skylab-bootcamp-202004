require('dotenv').config()
const { env: { PREDICTOR_URL, LIMIT } } = process
const { retrieveTermsByQuery, context } = require('server-logic')
const { handleError } = require('../../helpers')

context.PREDICTOR_URL = PREDICTOR_URL
context.LIMIT = LIMIT

module.exports = (req, res) => {
    try {
        const { params: { query } } = req
        
        retrieveTermsByQuery( query )
            .then(result => res.status(200).send(result))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
