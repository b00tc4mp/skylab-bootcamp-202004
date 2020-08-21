require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, JWT_SECRET } } = process
const { utils: { jwtPromised }} = require('../work-meeting-commons')

const createWorkGroup = require('./create-work-group')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, WorkGroup } } = require('work-meeting-data')
const bcrypt = require('bcryptjs')
const context = require('./context')
context.API_URL = API_URL



describe('createWorkGroup', () => {
    //User-oriented variables
    let name, surname, email, password, encryptedPassword, userId, token

    //Workgroup-oriented variables
    let _name, workGroupId

    before(async () => {
        await mongoose.connect(MONGODB_URL)
        await Promise.all([
            User.deleteMany(),
            WorkGroup.deleteMany()
        ])
    })

    beforeEach(async () => {
        //User-oriented
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@gmail.com`
        password = `password-${random()}`
        encryptedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, surname, email, password: encryptedPassword })
        userId = user.id.toString()
        token = await jwtPromised.sign({sub:userId}, JWT_SECRET, {expiresIn: '1d'})
        context.storage= {token}
        //workgroup-oriented
        _name = `name-${random()}`
       
    })

    describe('asynchronous paths', () => {
        it('should succeed to create a new work group on valid data', async () => {
            const result = await createWorkGroup(_name)
            expect(result).to.be.undefined

            const [user, workGroup] = await Promise.all([
                User.findById(userId).lean(),
                WorkGroup.findOne({name: _name, creator:userId }).lean()
            ])

            expect(user).to.exist
            expect(user.constructor.name).to.equal('Object')
            expect(user.workGroups).to.be.instanceof(Array)
            expect(user.workGroups.length).to.equal(1)
            debugger
            expect(user.workGroups[0].toString()).to.equal(workGroup._id.toString())

            expect(workGroup).to.exist
            expect(workGroup.constructor.name).to.equal('Object')
            expect(workGroup.name).to.equal(_name)
            expect(workGroup.creator.toString()).to.equal(userId)
            
        })

        it('should fail to create a workgroup if the user already created that same workgroup', async () => {
            const newWorkGroup = await WorkGroup.create({ name:_name, creator: userId})
            workGroupId= newWorkGroup.id.toString()

            await User.findByIdAndUpdate(userId, {
                $addToSet: {
                    workGroups: workGroupId
                }
            })

            try {
                await createWorkGroup(_name)
            } catch(error) {
                expect(error).to.exist
                expect(error).to.be.instanceof(Error)
                expect(error.message).to.equal(`workgroup with name ${_name} already exist`)
            }
        })

        it('should fail to create a meeting if the user does not exist', async() => {
            await User.deleteMany()

            try {
                await createWorkGroup(_name)
            } catch(error) {
                expect(error).to.exist
                expect(error).to.be.instanceof(Error)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            }
        })
        
    })

    describe('synchronous paths', () => {
        it('should fail on a non-string userId', () => {
            token = random()
            context.storage = {token}
            expect(() => createWorkGroup(_name)).to.throw(TypeError, `${token} is not a string`)
            
            token = undefined
            context.storage = {token}
            expect(() => createWorkGroup(_name)).to.throw(TypeError, `${token} is not a string`)
            
            token = []
            context.storage = {token}
            expect(() => createWorkGroup(_name)).to.throw(TypeError, `${token} is not a string`)
            
            token = false
            context.storage = {token}
            expect(() => createWorkGroup(_name)).to.throw(TypeError, `${token} is not a string`)
            
            token = null
            context.storage = {token}
            expect(() => createWorkGroup(_name)).to.throw(TypeError, `${token} is not a string`)
            
            token = {}
            context.storage = {token}
            expect(() => createWorkGroup(_name)).to.throw(TypeError, `${token} is not a string`)
        })
        
        it('should fail on a non-string name', () => {
            userId = 'some userId'

            _name = random()
            expect(() => createWorkGroup(_name)).to.throw(TypeError, `${_name} is not a string`)
            
            _name = undefined
            expect(() => createWorkGroup(_name)).to.throw(TypeError, `${_name} is not a string`)
            
            _name = []
            expect(() => createWorkGroup(_name)).to.throw(TypeError, `${_name} is not a string`)
            
            _name = false
            expect(() => createWorkGroup(_name)).to.throw(TypeError, `${_name} is not a string`)
            
            _name = null
            expect(() => createWorkGroup(_name)).to.throw(TypeError, `${_name} is not a string`)
            
            _name = {}
            expect(() => createWorkGroup(_name)).to.throw(TypeError, `${_name} is not a string`)
        })

       

    })

    afterEach(async () => {
        await Promise.all([
            User.deleteMany(),
            WorkGroup.deleteMany()
        ])
    })

    after(async () => {
        await Promise.all([
            User.deleteMany(),
            WorkGroup.deleteMany()
        ])
        await mongoose.disconnect()
    })
})