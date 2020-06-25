require('dotenv').config()
const { env: { MONGODB_URL, TEST_MAIL_SERVICE: MAIL_SERVICE, TEST_MAIL_USER: MAIL_USER, TEST_MAIL_PASS: MAIL_PASS } } = process
const { expect } = require('chai')
const { mongoose, models: { Term } } = require('data')
const { errors: { VoidError } } = require('commons')
const { random } = Math
const { utils: { mailer } } = require('node-commons')

const context = require('./context')

context.mailer = mailer(MAIL_SERVICE, MAIL_USER, MAIL_PASS)

const sendSymptomListByEmail = require('./send-symptomlist-by-email')

describe('server logic - send-symptomlist-by-email', () => {
    let email, text, html

    beforeEach(() => {
        email = `pauatro@gmail.com`
        text = `text-${random()}`
        html = `<p>html-${random()}<p>`

    })

    it('should succeed on correct inputs', () =>
        sendSymptomListByEmail(email, text, html)
    )


    it('should fail when input does not fit the format', () => {
        let email2 = ""

        try{
            sendSymptomListByEmail(email2, text, html)

        }catch(error){
            expect(error).to.be.an.instanceof(Error)

            expect(error.message).to.equal(` is not an e-mail`)
        }

        let text2 = ""

        try{
            sendSymptomListByEmail(email, text2, html)

        }catch(error){
            expect(error).to.be.an.instanceof(VoidError)

        }

        text2 = []

        try{
            sendSymptomListByEmail(email, text2, html)

        }catch(error){
            expect(error).to.be.an.instanceof(TypeError)

            expect(error.message).to.equal(' is not a string')
        }


        let html2 = ""

        try{
            sendSymptomListByEmail(email, text, html2)

        }catch(error){
            expect(error).to.be.an.instanceof(VoidError)

        }

        html2 = []

        try{
            sendSymptomListByEmail(email, text, html2)

        }catch(error){
            expect(error).to.be.an.instanceof(TypeError)

            expect(error.message).to.equal(' is not a string')
        }
    })
})