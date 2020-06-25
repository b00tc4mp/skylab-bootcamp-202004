/**
 * Uses the associated mailing tool to send an email to the introduced address, which will include the html or the text content.
 * 
 * @param {string} email the address to which the email will be sent
 * @param {string} html the content of the email by default
 * @param {string} text the content of the email if there is no html support
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {VoidError} If any of the parameters expected to be a string is an empty string.
 * @throws {Error} If the e-mail does not fit the format..
 */

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