require('dotenv').config()
require('commons/polyfills/string')
const context = require('./context')

module.exports = function (email, text, html) {
    String.validate.notVoid(email)
    String.validate.notVoid(text)
    String.validate.notVoid(html)

    return this.mailer.send({
        from: `Symptomiser App`,
        to: email,
        subject: "Your Symptom List",
        text: text,
        html: html,
    })
}.bind(context)