const { env: { MAIL_SERVICE, MAIL_USER, MAIL_PASS } } = process
const { context, sendSymptomlistByEmail } = require('server-logic')
const { handleError } = require('../../helpers')
const { utils: { mailer } } = require('node-commons')

context.mailer = mailer(MAIL_SERVICE, MAIL_USER, MAIL_PASS)

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
