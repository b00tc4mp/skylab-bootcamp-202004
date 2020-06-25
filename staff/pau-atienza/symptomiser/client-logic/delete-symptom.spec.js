const context = require('./context')
deleteSymptom = require('./delete-symptom')
const { random } = Math

const { expect } = require('chai')

describe('client logic - delete  symptom', ()=>{

    let name

    beforeEach(()=>{
        context.storage = {}

        name = `name-${random()}`

        context.storage.submittedSymptoms = JSON.stringify([{term:{name}}])
    })

    it('should succeed to delete symptom form the list of submittedSymptoms in the contet storage and return updated symptom list', ()=>{

        const symptomList = deleteSymptom(name)

        expect(symptomList).to.deep.equal(JSON.parse(context.storage.submittedSymptoms))

        expect(symptomList.length).to.equal(0)

    })

    it('should throw an error if the symptom does not exist', ()=>{
        const name2 = "another symptom"

        context.storage.submittedSymptoms = JSON.stringify([{term:{name: name2}}])

        try{
            deleteSymptom(name)
        }catch(error){
            expect(error).to.exist
        }
    })

    afterEach(()=>{context.storage = {}})
})



console.log(context.storage)