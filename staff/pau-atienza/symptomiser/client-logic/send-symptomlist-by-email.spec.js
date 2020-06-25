require('dotenv').config()
let { env: { TEST_API_URL: API_URL } } = process
const { expect } = require('chai')
const { random } = Math

const context = require('./context')
context.API_URL = API_URL
context.storage = {}

const sendSymptomlistByEmail = require('./send-symptomlist-by-email')
const { errors: { VoidError } } = require('commons')


describe('server logic - send-symptomlist-by-email', () => {
    let email, text, html

    beforeEach(() => {
        email = `pauatro@gmail.com`
        HPO_id = `HPO_id-${random()}`
        name = `name-${random()}`
        confidenceLevel = `conf-${random()}`
        symptomId = `symptomId-${random()}`
        HPO_id2 = `HPO_id2-${random()}`
        name2 = `name2-${random()}`
        confidenceLevel2 = `conf2-${random()}`
        symptomId2 = `symptomId2-${random()}`
        
        context.storage.submittedSymptoms = JSON.stringify([{term: {HPO_id, name, confidenceLevel}, modifiers: [{HPO_id: HPO_id2, name: name2, confidenceLevel: confidenceLevel2}], comments: "hello"}])
        let { env: { TEST_API_URL: API_URL } } = process
        context.API_URL = API_URL
    })

    it('should succeed on correct inputs', async() =>{
        await sendSymptomlistByEmail(email)

    })

    it('should succeed without modifiers or comments', async () =>{
        context.storage.submittedSymptoms = JSON.stringify([{term: {HPO_id, name, confidenceLevel}, modifiers: undefined, comments: undefined}])

        await sendSymptomlistByEmail(email)
    })

    it('should fail when input does not fit the format', async () => {
        email = ""

        try{
            await sendSymptomlistByEmail(email, text, html)

        }catch(error){
            expect(error).to.be.an.instanceof(Error)

            expect(error.message).to.equal(` is not an e-mail`)
        }

        email = []

        try{
            await sendSymptomlistByEmail(email, text, html)

        }catch(error){
            expect(error).to.be.an.instanceof(Error)

            expect(error.message).to.equal(` is not an e-mail`)
        }
    })

    it('should fail when an incorrect url is introduced', async () => {
        context.API_URL = "http://localhost:8080/api/random"
        try{
            await sendSymptomlistByEmail(email)
        }catch(error){
            expect(error).to.exist
        }
    })

    afterEach(()=>{
        let { env: { TEST_API_URL: API_URL } } = process
        context.API_URL = API_URL
    })
})