require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, JWT_SECRET } } = process
const { utils: { jwtPromised }} = require('../work-meeting-commons')
const retrieveDepartMembers = require('./retrieve-depart-members')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, WorkGroup, Department } } = require('work-meeting-data')
const { random } = Math
const { expect } = require('chai')
const { UnexistenceError } = require('work-meeting-commons/errors')
const bcrypt = require('bcryptjs')
const context = require('./context')
context.API_URL = API_URL


describe('retrieve depart-members', () => {
    //user-oriented variables
    let name, surname, email, password, encryptedPassword, userId

    //workGroup-oriented variables
    let _name, workGroupId
    //second-workgroup-oriented variables
    let workGroupName, _workGroupId

    //department-oriented-variables
    let departName, departmentId
    //departmentFake-oriented-variables
    let _departName, _departmentId

    before(async () => {
        await mongoose.connect(MONGODB_URL)
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany(), Department.deleteMany()])

    })
    beforeEach(async () => {
        
        //user-oriented
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `pass-${random()}`
        encryptedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, surname, email, password: encryptedPassword })
        userId = user.id.toString()
        
        //workgroup-oriented
        _name = `name-${random()}`
        workGroupName=`name-${random()}`
        
        const workGroup = await WorkGroup.create({ name: _name, creator: userId })
        workGroupId = workGroup.id.toString()
        const _workGroup = await WorkGroup.create({ name: workGroupName, creator: userId })
        _workGroupId = _workGroup.id.toString()

        //department-oriented
        departName= `name-${random()}`
        const department = await Department.create({name:departName, workGroup: workGroupId, members:[userId]})
        departmentId = department.id.toString()

        //departmentFake-oriented
        _departName= `name-${random()}`
        const _department= await Department.create({name: _departName, workGroup: workGroupId})
        _departmentId=_department.id.toString()
        await WorkGroup.findByIdAndUpdate(workGroupId, {departments:[departmentId]})
    })

    describe('asynchronous paths', () => {
        it('should succes to retrieve petitions when data is valid', async () => {
            debugger
            const result = await retrieveDepartMembers(workGroupId, departmentId)
            
            expect(result).to.be.not.undefined
            expect(result).to.be.instanceOf(Array)
            expect(result.length).to.equal(1)
            expect(result[0].name).to.equal(name)
            expect(result[0].surname).to.equal(surname)
            expect(result[0].id).to.equal(userId)
            expect(result[0].email).to.equal(email)

        });
        it('should fail to retrieve depart-members when workgroup does not exist', async() => {
            await WorkGroup.deleteMany()
            try {
                await retrieveDepartMembers(workGroupId, departmentId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`workgroup with id ${workGroupId} does not exist`)
            }
        });
        it('should fail to retrieve depart-members when department does not exist', async() => {
            await Department.deleteMany()
            try {
                await retrieveDepartMembers(workGroupId, departmentId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`department with id ${departmentId} does not exist`)
            }
        });
        it('should fail to retrieve depart-members when department is not part of the workgroup', async() => {
            try {
                await retrieveDepartMembers(workGroupId, _departmentId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`department with id ${_departmentId} is not part of the workgroup`)
            }
        });
        it('should fail to retrieve depart-members when department is not part of the workgroup', async() => {
            try {
                await retrieveDepartMembers(_workGroupId, departmentId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`department with id ${departmentId} is not part of the workgroup`)
            }
        });
    });
    describe('synchronous paths', () => {
        it('should fail when department non-string', () => {
            
            departmentId = random()
            expect(()=>retrieveDepartMembers(workGroupId, departmentId)).throw(TypeError, `${departmentId} is not a string`)

            departmentId = null
            expect(()=>retrieveDepartMembers(workGroupId, departmentId)).throw(TypeError, `${departmentId} is not a string`)

            departmentId = undefined
            expect(()=>retrieveDepartMembers(workGroupId, departmentId)).throw(TypeError, `${departmentId} is not a string`)

            departmentId = false
            expect(()=>retrieveDepartMembers(workGroupId, departmentId)).throw(TypeError, `${departmentId} is not a string`)

            departmentId = []
            expect(()=>retrieveDepartMembers(workGroupId, departmentId)).throw(TypeError, `${departmentId} is not a string`)

            departmentId = {}
            expect(()=>retrieveDepartMembers(workGroupId, departmentId)).throw(TypeError, `${departmentId} is not a string`)

            departmentId = ''
            expect(()=>retrieveDepartMembers(workGroupId, departmentId)).throw(Error, `string is empty or blank`)

            departmentId = '    '
            expect(()=>retrieveDepartMembers(workGroupId, departmentId)).throw(Error, `string is empty or blank`)
        });

        it('should fail when workGroup non-string', () => {
            
            workGroupId = random()
            expect(()=>retrieveDepartMembers(workGroupId, departmentId)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = null
            expect(()=>retrieveDepartMembers(workGroupId, departmentId)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = undefined
            expect(()=>retrieveDepartMembers(workGroupId, departmentId)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = false
            expect(()=>retrieveDepartMembers(workGroupId, departmentId)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = []
            expect(()=>retrieveDepartMembers(workGroupId, departmentId)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = {}
            expect(()=>retrieveDepartMembers(workGroupId, departmentId)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = ''
            expect(()=>retrieveDepartMembers(workGroupId, departmentId)).throw(Error, `string is empty or blank`)

            workGroupId = '    '
            expect(()=>retrieveDepartMembers(workGroupId, departmentId)).throw(Error, `string is empty or blank`)
        });
 
    });
    afterEach(async()=>{
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany(), Department.deleteMany()])
    })
    after(async()=>{
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany(), Department.deleteMany()])
        await mongoose.disconnect()
    })
});
