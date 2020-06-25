require('dotenv').config()
require('commons/polyfills/string')
const {utils: {Email}} = require('commons')
const context = require('./context')

module.exports = function (email, text, html) {
    Email.validate(email)
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