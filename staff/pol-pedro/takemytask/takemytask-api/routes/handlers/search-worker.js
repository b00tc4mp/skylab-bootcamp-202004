const { handleError } = require('../../helpers')
const { searchWorker } = require('takemytask-server-logic')

module.exports = (req, res) => {

    const { body: { userName, jobCategory, words } } = req
    
    try {
        searchWorker(userName, jobCategory, words)
            .then((founds) => res.send(founds))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
} 