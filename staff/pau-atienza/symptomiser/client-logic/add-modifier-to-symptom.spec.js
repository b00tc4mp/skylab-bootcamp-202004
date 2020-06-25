require('commons/polyfills/string')
const context = require('./context')
const { env: { LIMIT } } = process
addModifierToSymptom = require('./add-modifier-to-symptom')
const { random } = Math
const { expect } = require('chai')

describe('client logic - add modifier to symptom', ()=>{

    let confidenceLevel, HPO_id, name, date, HPO_id2, name2, confidenceLevel2, modifier

    beforeEach(()=>{
        context.storage = {}

        confidenceLevel = `confidenceLevel-${random()}`
        name = `name-${random()}`
        HPO_id = `HPO_id-${random()}`
        confidenceLevel2 = `confidenceLevel2-${random()}`
        name2 = `name2-${random()}`
        HPO_id2 = `HPO_id2-${random()}`

        date = new Date().toISOString()
        context.storage.symptomToModify = JSON.stringify({modifiers: [{HPO_id, name, confidenceLevel: confidenceLevel2, date}]})
        modifier = {term: {HPO_id: HPO_id2, name: name2}}
    })

    it('should succeed to push a new modifier to the context storage if it\'s not already present, without modifying the other modifiers i nthe list', ()=>{

        addModifierToSymptom(confidenceLevel, modifier)

        const { modifiers } = JSON.parse(context.storage.symptomToModify)

        expect(modifiers).to.be.an.instanceof(Array)

        const {HPO_id: _HPO_id, name: _name, confidenceLevel: _confidenceLevel2, date: _date } = modifiers[0]
        const {HPO_id: _HPO_id2, name: _name2, confidenceLevel: _confidenceLevel, date: _date2 } = modifiers[1]

        expect(_HPO_id).to.equal(HPO_id)
        expect(_HPO_id2).to.equal(HPO_id2)
        expect(_name).to.equal(name)
        expect(_name2).to.equal(name2)
        expect(_confidenceLevel).to.equal(confidenceLevel)
        expect(_confidenceLevel2).to.equal(confidenceLevel2)
        expect(_date).to.exist
        expect(typeof _date2).to.equal("string")
    })

    it('should fail to push a new modifier to the context storage if it\'s already present, without modifying the other modifiers i nthe list', ()=>{
        modifier = {term: {HPO_id, name}}
        
        addModifierToSymptom(confidenceLevel2, modifier)

        const { modifiers } = JSON.parse(context.storage.symptomToModify)

        expect(modifiers).to.be.an.instanceof(Array)

        expect(modifiers.length).to.equal(1)

        const {HPO_id: _HPO_id, name: _name, confidenceLevel: _confidenceLevel2, date: _date } = modifiers[0]

        expect(_HPO_id).to.equal(HPO_id)
        expect(_name).to.equal(name)
        expect(_confidenceLevel2).to.equal(confidenceLevel2)
        expect(_date).to.exist
    })

    it('should be able to push a new modifier to the context storage when the modifiers list does not exist', ()=>{
        context.storage.symptomToModify = JSON.stringify({modifiers: undefined})
        modifier = {term: {HPO_id, name}}
        
        addModifierToSymptom(confidenceLevel2, modifier)

        const { modifiers } = JSON.parse(context.storage.symptomToModify)

        expect(modifiers).to.be.an.instanceof(Array)

        expect(modifiers.length).to.equal(1)

        const {HPO_id: _HPO_id, name: _name, confidenceLevel: _confidenceLevel2, date: _date } = modifiers[0]

        expect(_HPO_id).to.equal(HPO_id)
        expect(_name).to.equal(name)
        expect(_confidenceLevel2).to.equal(confidenceLevel2)
        expect(_date).to.exist
    })
    afterEach(()=>{context.storage = {}})
})



console.log(context.storage)