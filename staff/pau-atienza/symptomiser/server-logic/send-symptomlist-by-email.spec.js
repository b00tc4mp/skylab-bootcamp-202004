require('dotenv').config()
const { env: { MONGODB_URL, TEST_MAIL_SERVICE: MAIL_SERVICE, TEST_MAIL_USER: MAIL_USER, TEST_MAIL_PASS: MAIL_PASS } } = process
const { expect } = require('chai')
const { mongoose, models: { Term } } = require('data')
const { errors: { VoidError } } = require('commons')
const { random } = Math
const { utils: { mailer } } = require('node-commons')

const context = require('./context')

context.mailer = mailer(MAIL_SERVICE, MAIL_USER, MAIL_PASS)

const sendSymptomlistByEmail = require('./send-symptomlist-by-email')

describe.only('server logic - retrieve-terms-by-query', () => {
    let email, text, html

    beforeEach(() => {
        email = `pauatro@gmail.com`
        text = `text-${random()}`
        html = `<p>html-${random()}<p>`

    })

    it('should succeed on correct inputs', () =>
        sendSymptomlistByEmail(email, text, html)
    )


    it('should fail when input does not fit the format', () => {
        email = ""

        sendSymptomlistByEmail(email, text, html)
            .catch(error => {
                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            })

        email = []

        sendSymptomlistByEmail(email, text, html)
            .catch(error => {
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            })

        text = ""

        sendSymptomlistByEmail(email, text, html)
            .catch(error => {
                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            })

        text = []

        sendSymptomlistByEmail(email, text, html)
            .catch(error => {
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            })

        html = ""

        sendSymptomlistByEmail(email, text, html)
            .catch(error => {
                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal(`string is empty or blank`)
            })

        html = []

        sendSymptomlistByEmail(email, text, html)
            .catch(error => {
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(` is not a string`)
            })

    })
})