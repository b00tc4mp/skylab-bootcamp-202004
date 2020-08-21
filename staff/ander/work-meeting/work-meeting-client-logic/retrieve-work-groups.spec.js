require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, JWT_SECRET } } = process
const { utils: { jwtPromised }} = require('../work-meeting-commons')
const retrieveWorkGroups= require('./retrieve-work-groups')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, WorkGroup } } = require('work-meeting-data')
const context = require('./context')
context.API_URL = API_URL
debugger

describe('logic - retrieve work groups', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, workGroupName, workGroupId, token

    beforeEach(() =>
        User.deleteMany()
        .then(()=>WorkGroup.deleteMany())
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                workGroupName = "dreamTeam"  
            })
    )
   
    describe('when user already exists', async() => {
        beforeEach(async() =>{
            const workGroup = await WorkGroup.create({name:workGroupName, creator:'5ed1204ee99ccf6fae798abf'})
            workGroupId= workGroup._id
            const user= await User.create({name, surname, email, password, workGroups: workGroupId})
            userId = user._id.toString()
            token = await jwtPromised.sign({sub:userId}, JWT_SECRET, {expiresIn:'1d'})
            context.storage = {token}
            })

        it('should succeed on correct data', async () =>{
            debugger
            const result = await retrieveWorkGroups()

            expect(result.length).to.equal(1)
            expect(result[0]._id.toString()).to.equal(workGroupId.toString())
            expect(result[0].name).to.equal(workGroupName)


                
        })
        it('should fail when user does not exist', () => {
            
            
             return User.deleteMany() 
                .then(()=>retrieveWorkGroups())
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
    
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user with id ${userId } does not exist`)
                })
        })
        describe('synchronous paths', () => {
            it('should fail with a non-string user', () => {

                token= random()
                context.storage = {token}
                expect(()=>retrieveWorkGroups()).throw(TypeError, `${token} is not a string`)

                token= undefined
                context.storage = {token}
                expect(()=>retrieveWorkGroups()).throw(TypeError, `${token} is not a string`)

                token= null
                context.storage = {token}
                expect(()=>retrieveWorkGroups()).throw(TypeError, `${token} is not a string`)

                token= []
                context.storage = {token}
                expect(()=>retrieveWorkGroups()).throw(TypeError, `${token} is not a string`)

                token= {}
                context.storage = {token}
                expect(()=>retrieveWorkGroups()).throw(TypeError, `${token} is not a string`)

                token= false
                context.storage = {token}
                expect(()=>retrieveWorkGroups()).throw(TypeError, `${token} is not a string`)

                token= '    '
                context.storage = {token}
                expect(()=>retrieveWorkGroups()).throw(Error, `string is empty or blank`)

                token= ''
                context.storage = {token}
                expect(()=>retrieveWorkGroups()).throw(Error, `string is empty or blank`)
                
            });
            
        });


    })

 
    afterEach(() => {
        User.deleteMany()
        WorkGroup.deleteMany()
    
    })

    after(mongoose.disconnect)
})