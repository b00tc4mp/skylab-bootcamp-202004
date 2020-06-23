const { sendSymptomlistByEmail } = require('server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { body: {email, text, html} } = req
    
        sendSymptomlistByEmail( email, text, html )
            .then(symptomList => res.status(200).send(symptomList))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
