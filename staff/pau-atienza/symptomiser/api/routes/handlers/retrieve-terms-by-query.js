const { retrieveTermsByQuery } = require('../../../server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    debugger
    try {
        const { params: { query } } = req
        
        retrieveTermsByQuery( query )
            .then(result => res.send(result))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
