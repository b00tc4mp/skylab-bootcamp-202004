require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const searchWorkGroup= require('./search-work-group')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, WorkGroup } } = require('work-meeting-data')

describe('logic - search work groups', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, workGroupName, workGroupId, query

    beforeEach(() =>
        User.deleteMany()
        .then(()=>WorkGroup.deleteMany())
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                workGroupName = "dreamTeam"
                query= "dre"
            })
    )
   
    describe('when user already exists', () => {
        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(user => userId = user.id) 
                .then(() => WorkGroup.create({name:workGroupName, creator: userId, petitions:[] })) 
                .then(workGroup => workGroupId = workGroup.id) 
        )

        it('should succeed on correct data', async () =>{
            const result = await searchWorkGroup(query)

            expect(result).to.not.be.undefined
            expect(result.length).to.equal(1)
            expect(result[0].name).to.equal(workGroupName)

                
        })
        it('should succeed on upper case querys', async () =>{
            const query = "amte"
            const result = await searchWorkGroup(query)

            expect(result).to.not.be.undefined
            expect(result.length).to.equal(1)
            expect(result[0].name).to.equal(workGroupName)

                
        })

        it('should fail when user does not exist', () => {
            
            const query = 'aaaaaaa'
            
             return searchWorkGroup(query)
                .then(() => {throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
    
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(("there is no answer for your search"))
                })
        })

    })

 
    afterEach(() => {
        User.deleteMany()
        WorkGroup.deleteMany()
    
    })

    after(mongoose.disconnect)
})