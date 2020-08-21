require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const retrieveWorkGroups = require('./retrieve-work-groups')
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

    //random
    let _email, _userId


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

        //secondUser-oriented
        _email= `email-${random()}@gmail.com`


        const _user = await User.create({ name, surname, email:_email, password: encryptedPassword, workGroups:workGroupId })
        _userId = _user.id.toString()



    })
    describe('asynchronous paths', () => {
        it('should success to retrieve workGroup pref with a valid data', async () => {
            debugger
            const result = await retrieveWorkGroups(_userId)
            expect(result).to.be.not.undefined
            expect(result.constructor.name).to.be.equal('Array')
            expect(result).to.be.instanceOf(Array)
            expect(result[0].name).to.equal(workGroupName)
            expect(result[0]._id.toString()).to.equal(workGroupId)
            expect(result[0].creator.toString()).to.equal(userId)

        });
        it('should fail to retrieve workGroup Pref when user not exist ', async() => {
            await User.deleteMany()
            try {
                await retrieveWorkGroups(_userId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with id ${_userId} does not exist`)
            }
        });
        describe('synchronous paths', () => {
            it('should fail with a non-string user', () => {

                _userId= random()
                expect(()=>retrieveWorkGroups(_userId)).throw(TypeError, `${_userId} is not a string`)

                _userId= undefined
                expect(()=>retrieveWorkGroups(_userId)).throw(TypeError, `${_userId} is not a string`)

                _userId= null
                expect(()=>retrieveWorkGroups(_userId)).throw(TypeError, `${_userId} is not a string`)

                _userId= []
                expect(()=>retrieveWorkGroups(_userId)).throw(TypeError, `${_userId} is not a string`)

                _userId= {}
                expect(()=>retrieveWorkGroups(_userId)).throw(TypeError, `${_userId} is not a string`)

                _userId= false
                expect(()=>retrieveWorkGroups(_userId)).throw(TypeError, `${_userId} is not a string`)

                _userId= '    '
                expect(()=>retrieveWorkGroups(_userId)).throw(Error, `string is empty or blank`)

                _userId= ''
                expect(()=>retrieveWorkGroups(_userId)).throw(Error, `string is empty or blank`)
                
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