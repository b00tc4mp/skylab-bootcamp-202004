require('commons/polyfills/string')
const context = require('./context')
const { env: { LIMIT } } = process
deleteCommentsFromSymptom = require('./delete-comments-from-symptom')
const { random } = Math

const { expect } = require('chai')

const { errors: { VoidError} } = require('commons')

describe('client logic - delete comments from symptom', ()=>{

    let comments

    beforeEach(()=>{
        context.storage = {}

        comments = "I am the best"
        context.storage.symptomToModify = JSON.stringify({comments})
    })

    it('should succeed to delete the comments from the symptomToModify in the contet storage and return the modifires symptom', ()=>{

        const symptom = deleteCommentsFromSymptom()

        expect(symptom).to.deep.equal(JSON.parse(context.storage.symptomToModify))

        expect(symptom.comments).to.not.exist

        
    })
    afterEach(()=>{context.storage = {}})
})



console.log(context.storage)