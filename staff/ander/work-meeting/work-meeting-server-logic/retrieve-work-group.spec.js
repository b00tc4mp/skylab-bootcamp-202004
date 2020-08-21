require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const retrieveWorkGroup = require('./retrieve-work-group')
const { random } = Math
const { expect } = require('chai')
const  bcrypt  = require('bcryptjs')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, WorkGroup } } = require('work-meeting-data')
const { UnexistenceError } = require('work-meeting-commons/errors')

describe('logic - retrieve solo work Group', () => {
    //user-oriented variables
    let name, surname, email, password, encryptedPassword, userId

    //workGroup-oriented variables
    let workGroupName, workGroupId



    before(async () => {
        await mongoose.connect(MONGODB_URL)
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany()])
    })

    beforeEach(async () => {

        //user-oriented
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        encryptedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, surname, email, password: encryptedPassword, workGroups:workGroupId })
        userId = user.id.toString()

        //workgroup-oriented
        workGroupName = `name-${random()}`
        const workGroup = await WorkGroup.create({ name: workGroupName, creator: userId })
        workGroupId = workGroup.id.toString()




    })
    describe('asynchronous paths', () => {
        it('should success to retrieve workGroup pref with a valid data', async () => {
            debugger
            const result = await retrieveWorkGroup(workGroupId)
            expect(result).to.be.not.undefined
            expect(result).to.be.instanceOf(Object)
            expect(result.name).to.equal(workGroupName)
            expect(result._id.toString()).to.equal(workGroupId)
            expect(result.creator.toString()).to.equal(userId)

        });
        it('should fail to retrieve workGroup Pref when user not exist ', async() => {
            await User.deleteMany()
            try {
                await retrieveWorkGroup(workGroupId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`workGroup with id ${workGroupId} does not exist`)
            }
        });
        describe('synchronous paths', () => {
            it('should fail with a non-string user', () => {

                workGroupId= random()
                expect(()=>retrieveWorkGroup(workGroupId)).throw(TypeError, `${workGroupId} is not a string`)

                workGroupId= undefined
                expect(()=>retrieveWorkGroup(workGroupId)).throw(TypeError, `${workGroupId} is not a string`)

                workGroupId= null
                expect(()=>retrieveWorkGroup(workGroupId)).throw(TypeError, `${workGroupId} is not a string`)

                workGroupId= []
                expect(()=>retrieveWorkGroup(workGroupId)).throw(TypeError, `${workGroupId} is not a string`)

                workGroupId= {}
                expect(()=>retrieveWorkGroup(workGroupId)).throw(TypeError, `${workGroupId} is not a string`)

                workGroupId= false
                expect(()=>retrieveWorkGroup(workGroupId)).throw(TypeError, `${workGroupId} is not a string`)

                workGroupId= '    '
                expect(()=>retrieveWorkGroup(workGroupId)).throw(Error, `string is empty or blank`)

                workGroupId= ''
                expect(()=>retrieveWorkGroup(workGroupId)).throw(Error, `string is empty or blank`)
                
            });
            
        });

    });
    afterEach(async()=>{
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany()])
    })
    after(async()=>{
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany()])
        await mongoose.disconnect()
    })

})