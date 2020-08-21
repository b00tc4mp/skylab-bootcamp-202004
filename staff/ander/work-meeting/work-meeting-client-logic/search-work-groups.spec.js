require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, JWT_SECRET } } = process
const { utils: { jwtPromised }} = require('work-meeting-commons')
const searchWorkGroup= require('./search-work-groups')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, WorkGroup } } = require('work-meeting-data')
const context = require('./context')
context.API_URL = API_URL

describe('logic - search work groups', () => {
    before(() => mongoose.connect(MONGODB_URL))
    //user-oriented variables
    let name, surname, email, password,userId

    //second-user-oriented variables
    let _email, _userId

    //workGroup-oriented variables
    let workGroupName, workGroupId, query

    beforeEach(() =>
        User.deleteMany()
        .then(()=>WorkGroup.deleteMany())
            .then(() => {
                //user-oriented
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                _email = `e-${random()}@mail.com`
                password = `password-${random()}`
                //workgroup-oriented
                workGroupName = "dreamTeam"
                query= "dre"
            })
    )
   
    describe('when user already exists', () => {
        beforeEach(async() =>{
        
        const user = await User.create({name, surname, email, password })
        userId = user.id
        const _user = await User.create({name, surname, email:_email, password })
        _userId = _user.id
        token= await jwtPromised.sign({sub:userId}, JWT_SECRET,{ expiresIn:'1d' })
        context.storage = { token }
        const workGroup = WorkGroup.create({name:workGroupName, creator: _userId, petitions:[] })
        workGroupId = workGroup.id

         } )

        it('should succeed on correct data', async () =>{
            debugger
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
        it('should fails when user not exist', async () =>{
            await User.deleteMany()
            try {
                await searchWorkGroup(query)
                throw new Error('should not reach this point')
            } catch (error) {
                    expect(error).to.exist
    
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal((`user with Id ${userId} not exist`))
            }
   
        })

    })

 
    afterEach(() => {
        User.deleteMany()
        WorkGroup.deleteMany()
    
    })

    after(mongoose.disconnect)
})