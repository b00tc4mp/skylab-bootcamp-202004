require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, JWT_SECRET } } = process
const { utils: { jwtPromised }} = require('../work-meeting-commons')
const retrieveAllPetitions = require('./retrieve-all-petitions')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, WorkGroup } } = require('work-meeting-data')
const context = require('./context')
context.API_URL = API_URL
const bcrypt = require('bcryptjs')

describe('retrieve-all-petitions', () => {
    //user-oriented variable
    let name, surname, email, password, encryptedPassword, userId, token

    //secondUser-oriented variable
    let _email, _userId

    //workGroup-oriented variable
    let _name, workGroupId

    before(async () => {
        await mongoose.connect(MONGODB_URL)
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany()])
        debugger

    })
    beforeEach(async () => {
        name = `name-${random()}`
        _name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        _email = `email-${random()}@mail.com`
        password = `pass-${random()}`
        encryptedPassword = await bcrypt.hash(password, 10)
        debugger
        //user-oriented
        const user = await User.create({ name, surname, email, password: encryptedPassword })
        userId = user.id.toString()
        token = await jwtPromised.sign({sub:userId}, JWT_SECRET, {expiresIn: '1d'})
        context.storage= {token}

        //secondUser-oriented
        const _user = await User.create({ name, surname, email: _email, password: encryptedPassword })
        _userId = _user.id.toString()

        //workgroup-oriented
        const workGroup = await WorkGroup.create({ name: _name, creator: userId, petitions: { user: _user.id } })
        workGroupId = workGroup.id.toString()

    })

    describe('asynchronous paths', () => {
        it('should succes to retrieve petitions when data is valid', async () => {
            debugger
            const result = await retrieveAllPetitions(workGroupId)
            debugger
            expect(result).to.be.not.undefined
            expect(result).to.be.instanceOf(Array)
            expect(result.length).to.equal(1)
            expect(result[0].user.name).to.equal(name)
            expect(result[0].user.surname).to.equal(surname)
            expect(result[0].user.id).to.equal(_userId)

        });
        it('should fail to retrieve petitions when user does not exist', async() => {
            await User.deleteMany()
            try {
                await retrieveAllPetitions(workGroupId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            }
        });
        it('should fail to retrieve petitions when workgroup does not exist', async() => {
            await WorkGroup.deleteMany()
            try {
                await retrieveAllPetitions(workGroupId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`workgroup with id ${workGroupId} does not exist`)
            }
        });
        it('should fail to retrieve petitions when userId is not a creator', async() => {
            await WorkGroup.findByIdAndUpdate(workGroupId, {creator:workGroupId})
            try {
                await retrieveAllPetitions(workGroupId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${userId} not creator`)
            }
        });
    });
    describe('synchronous paths', () => {
        it('should fail when user non-string', () => {
            
            token = random()
            context.storage = {token}
            expect(()=>retrieveAllPetitions(workGroupId)).throw(TypeError, `${token} is not a string`)

            token = null
            context.storage = {token}
            expect(()=>retrieveAllPetitions(workGroupId)).throw(TypeError, `${token} is not a string`)

            token = undefined
            context.storage = {token}
            expect(()=>retrieveAllPetitions(workGroupId)).throw(TypeError, `${token} is not a string`)

            token = false
            context.storage = {token}
            expect(()=>retrieveAllPetitions(workGroupId)).throw(TypeError, `${token} is not a string`)

            token = []
            context.storage = {token}
            expect(()=>retrieveAllPetitions(workGroupId)).throw(TypeError, `${token} is not a string`)

            token = {}
            context.storage = {token}
            expect(()=>retrieveAllPetitions(workGroupId)).throw(TypeError, `${token} is not a string`)

            token = ''
            context.storage = {token}
            expect(()=>retrieveAllPetitions(workGroupId)).throw(Error, `string is empty or blank`)

            token = '    '
            context.storage = {token}
            expect(()=>retrieveAllPetitions(workGroupId)).throw(Error, `string is empty or blank`)
        });

        it('should fail when workGroup non-string', () => {
            
            workGroupId = random()
            expect(()=>retrieveAllPetitions(workGroupId)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = null
            expect(()=>retrieveAllPetitions(workGroupId)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = undefined
            expect(()=>retrieveAllPetitions(workGroupId)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = false
            expect(()=>retrieveAllPetitions(workGroupId)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = []
            expect(()=>retrieveAllPetitions(workGroupId)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = {}
            expect(()=>retrieveAllPetitions(workGroupId)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = ''
            expect(()=>retrieveAllPetitions(workGroupId)).throw(Error, `string is empty or blank`)

            workGroupId = '    '
            expect(()=>retrieveAllPetitions(workGroupId)).throw(Error, `string is empty or blank`)
        });

        

        
    });
    afterEach(async()=>{
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany()])
    })
    after(()=>{
        mongoose.disconnect()
    })
});
