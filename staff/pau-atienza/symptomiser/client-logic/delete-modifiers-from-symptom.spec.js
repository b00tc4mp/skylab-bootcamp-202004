require('commons/polyfills/string')
const context = require('./context')
const { env: { LIMIT } } = process
deleteModifierFromSymptom = require('./delete-modifier-from-symptom')
const { random } = Math

const { expect } = require('chai')

const { errors: { VoidError} } = require('commons')

describe('client logic - delete modifiers from symptom', ()=>{

    let confidenceLevel, HPO_id, name, date, HPO_id2, name2, confidenceLevel2, modifier

    beforeEach(()=>{
        context.storage = {}

        confidenceLevel = `confidenceLevel-${random()}`
        name = `name-${random()}`
        HPO_id = `HPO_id-${random()}`

        date = new Date().toISOString()
        context.storage.symptomToModify = JSON.stringify({modifiers: [{HPO_id, name, confidenceLevel, date}], term: {HPO_id, name}})
    })

    it('should succeed to delete the a modifier from the symptomToModify in the contet storage and return the modifires symptom', ()=>{

        const symptom = deleteModifierFromSymptom(name)

        expect(symptom).to.deep.equal(JSON.parse(context.storage.symptomToModify))

        expect(symptom.modifiers).to.not.exist

    })

    it('should throw an error if the modifier does not exist', ()=>{
        const name2 = "another symptom"

        context.storage.symptomToModify = JSON.stringify({modifiers: [{HPO_id, name: name2, confidenceLevel, date}], term: {HPO_id, name}})

        try{
            deleteModifierFromSymptom(name)
        }catch(error){
            expect(error).to.exist
        }
    })

    it('should throw an error if there are no modifiers left in the symptom', ()=>{
        const name2 = "another symptom"

        context.storage.symptomToModify = JSON.stringify({modifiers: undefined, term: {HPO_id, name}})

        try{
            deleteModifierFromSymptom(name)
        }catch(error){
            expect(error).to.exist
        }
    })

    it('should not delete the modifiers array if there are still any modifiers left in it', ()=>{
        const name2 = "another symptom"

        context.storage.symptomToModify = JSON.stringify({modifiers: [{HPO_id, name, confidenceLevel, date}, {name: name2}], term: {HPO_id, name}})

        const symptom = deleteModifierFromSymptom(name)

        expect(symptom).to.deep.equal(JSON.parse(context.storage.symptomToModify))

        expect(symptom.modifiers.length).to.equal(1)
    })

    afterEach(()=>{context.storage = {}})
})



console.log(context.storage)