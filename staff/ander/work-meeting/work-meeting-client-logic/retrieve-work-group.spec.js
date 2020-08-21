require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, JWT_SECRET } } = process
const { utils: { jwtPromised }} = require('../work-meeting-commons')
const bcrypt = require('bcryptjs')
const retrieveWorkGroup = require('./retrieve-work-group')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, WorkGroup } } = require('work-meeting-data')
const {errors:{UnexistenceError}} = require('work-meeting-commons') 


const context = require('./context')
context.API_URL = API_URL

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
      

        it('should succeed on correct workGroup id', async () => {
            debugger
            const result = await retrieveWorkGroup(workGroupId)
            expect(result).to.be.not.undefined
            expect(result).to.be.instanceOf(Object)
            expect(result.name).to.equal(workGroupName)
            expect(result._id.toString()).to.equal(workGroupId)
            expect(result.creator.toString()).to.equal(userId)

        })


        
        it('should fail when summary Id not exist', () => {

           
            return WorkGroup.deleteMany()
                .then(()=>retrieveWorkGroup(workGroupId))
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`workGroup with id ${workGroupId} does not exist`)
                })
        })
        it('should return an error when synchronous error exists', () => {
            
            workGroupId= random()
            expect(() => {
                retrieveWorkGroup(workGroupId)
            }).to.throw(TypeError, `${workGroupId} is not a string`)

            workGroupId= undefined
            expect(() => {
                retrieveWorkGroup(workGroupId)
            }).to.throw(TypeError, `${workGroupId} is not a string`)

            workGroupId= null
            expect(() => {
                retrieveWorkGroup(workGroupId)
            }).to.throw(TypeError, `${workGroupId} is not a string`)
            
            workGroupId = true
            expect(() => {
                retrieveWorkGroup(workGroupId)
            }).to.throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = {}
            expect(() => {
                retrieveWorkGroup(workGroupId)
            }).to.throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = []
            expect(() => {
                retrieveWorkGroup(workGroupId)
            }).to.throw(TypeError, `${workGroupId} is not a string`)
            
            workGroupId = ''
            expect(() => {
                retrieveWorkGroup(workGroupId)
            }).to.throw(Error, 'string is empty or blank')

            workGroupId= '    '
            expect(() => {
                retrieveWorkGroup(workGroupId)
            }).to.throw(Error, 'string is empty or blank')
            
        })

    })
    afterEach(async() => {
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany()])

    })

    after(async ()=> await mongoose.disconnect())
})