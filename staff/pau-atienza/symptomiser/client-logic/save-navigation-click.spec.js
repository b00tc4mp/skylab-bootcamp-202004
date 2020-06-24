require('commons/polyfills/string')
const context = require('./context')
const { env: { LIMIT } } = process
const saveClick = require('./save-navigation-click')
const { random } = Math

const { expect } = require('chai')

const { errors: { VoidError} } = require('commons')

describe('client logic - save click', ()=>{

    let query, predictionName, predictionCode, date, HPO_id

    beforeEach(()=>{
        context.storage = {}
        query = `query-${random()}`

        predictionName = `predictionName-${random()}`
        predictionCode = `predictionCode-${random()}`

        date = new Date().toISOString()
        date2 = new Date().toISOString()

        HPO_id = `clickedCode-${random()}`
    })

    it('should succeed to create the first click on valid inputs without modifying the prediction inputs', ()=>{

        context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}})}

        saveClick(HPO_id)

        expect(typeof context.storage.navigation).to.equal("string")

        const navigation = JSON.parse(context.storage.navigation)

        const {predictorInput, predictorOutput, clicks} = navigation

        expect(predictorInput).to.exist
        expect(predictorInput instanceof Object).to.be.true

        const {content, limit, date: _date} = predictorInput

        expect(content).to.equal(query)
        expect(limit).to.equal(LIMIT)
        expect(_date).to.equal(date)

        expect(predictorOutput).to.exist
        expect(predictorOutput instanceof Object).to.be.true

        const {prediction: [{predictionName: _predictionName, predictionCode: _predictionCode}], date: _date2} = predictorOutput

        expect(_predictionName).to.equal(predictionName)
        expect(_predictionCode).to.equal(predictionCode)
        expect(_date2).to.equal(date2)

        expect(clicks).to.exist
        expect(clicks instanceof Object).to.be.true
        expect(clicks[0] instanceof Object).to.be.true

        const[{HPO_id: _HPO_id, date: date3}] = clicks

        expect(_HPO_id).to.equal(HPO_id)
        
        String.validate.isISODate(date3)
    })

    it('should succeed to push a new click on valid inputs without modifying the prediction inputs', ()=>{

        let HPO_id2 = "hi there"
        let date3 =  new Date().toISOString()
        context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}, clicks: [{HPO_id: HPO_id2, date: date3}]})}
        
        saveClick(HPO_id)

        expect(typeof context.storage.navigation).to.equal("string")

        const navigation = JSON.parse(context.storage.navigation)

        const {predictorInput, predictorOutput, clicks} = navigation

        expect(predictorInput).to.exist
        expect(predictorInput instanceof Object).to.be.true

        const {content, limit, date: _date} = predictorInput

        expect(content).to.equal(query)
        expect(limit).to.equal(LIMIT)
        expect(_date).to.equal(date)

        expect(predictorOutput).to.exist
        expect(predictorOutput instanceof Object).to.be.true

        const {prediction: [{predictionName: _predictionName, predictionCode: _predictionCode}], date: _date2} = predictorOutput

        expect(_predictionName).to.equal(predictionName)
        expect(_predictionCode).to.equal(predictionCode)
        expect(_date2).to.equal(date2)

        expect(clicks).to.exist
        expect(clicks instanceof Object).to.be.true
        expect(clicks[0] instanceof Object).to.be.true

        const[{HPO_id: _HPO_id2, date: _date3}, {HPO_id: _HPO_id, date: date4}] = clicks

        
        expect(_HPO_id2).to.equal(HPO_id2)
        expect(_date3).to.equal(date3)
        
        expect(_HPO_id).to.equal(HPO_id)
        
        String.validate.isISODate(date4)
    })

    describe('when invalid inputs are introduced', ()=>{

        it('should fail when information in the session storage has been modified', ()=>{
            query = ""
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}})}    
                
                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal('string is empty or blank')
            }
    
            query = []
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}})}    
                
                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }

            let limit = ""
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}})}    
                
                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }
    
            limit = []
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}})}    
                
                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }

            date = ""
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}})}    
                
                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }
    
            date = []
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}})}    
                
                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }

            try{
                context.storage = {navigation: {predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}}}    
                
                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('[object Object] is not a string')
            }

            predictionName = ""
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}})}    
                
                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }
    
            predictionName = []
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}})}    
                
                 saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }

            predictionCode = ""
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}})}    
                
                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }
    
            predictionCode = []
    
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}})}    
                
                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }
        })

        it('should fail when information in the session storage is missing', ()=>{
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: null, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}})}    
                
                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal("Oops! Some important information was lost - please restart the search")
            }

            try{       
                context.storage = {navigation: null}

                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal("Oops! Some important information was lost - please restart the search")
            }

            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: null})}    

                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal("Oops! Some important information was lost - please restart the search")
            }
        })

        it('should fail on invalid inputs', ()=>{
            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}})}    
    
                HPO_id = []
    
                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }

            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}})}    
    
                HPO_id = ""
    
                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal('string is empty or blank')
            }
        })

        it('should fail when previous click information has been modified', ()=>{

            
            try{
                let HPO_id2 = []
                
                let date3 =  new Date().toISOString()
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}, clicks: [{HPO_id: HPO_id2, date: date3}]})}
                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }

            try{
                let HPO_id2 = ""
                
                let date3 =  new Date().toISOString()
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}, clicks: [{HPO_id: HPO_id2, date: date3}]})}
                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal('string is empty or blank')
            }

            try{
                let HPO_id2 = "hi there"
                
                let date3 =  ""
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}, clicks: [{HPO_id: HPO_id2, date: date3}]})}
                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(VoidError)
                expect(error.message).to.equal('string is empty or blank')
            }

            try{
                let HPO_id2 = "hi there"
                
                let date3 =  []
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}, clicks: [{HPO_id: HPO_id2, date: date3}]})}
                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a string')
            }

            try{
                context.storage = {navigation: JSON.stringify({predictorInput: {content: query, limit: LIMIT, date}, predictorOutput: {prediction: [{predictionName, predictionCode}], date: date2}, clicks: ""})}

                saveClick(HPO_id)
            }catch(error){
                expect(error).to.exist
    
                expect(error).to.be.an.instanceof(TypeError)
                expect(error.message).to.equal(' is not a valid JSON')
            }


        })
    })


    afterEach(()=>{context.storage = {}})
})



console.log(context.storage)