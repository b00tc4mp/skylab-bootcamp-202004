require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, JWT_SECRET } } = process
require('work-meeting-commons/polyfills/string')
const searchUsers = require('./search-users')
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const { random } = Math
const { mongoose, models: { User, WorkGroup } } = require('work-meeting-data')
const context = require('./context')
context.API_URL = API_URL

describe('search users', () => {
    //users-oriented-variables
    let name, surname, email, password, encryptedPassword, userId

    let _name, _surname, _email, _userId

    //workGroup-oriented variables
    let workGroupName, workGroupId

    //query search
    let query
    before(async () => {
        await mongoose.connect(MONGODB_URL)
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany()])
    })
    beforeEach(async () => {
        //users-oriented
        name = `pepito-${random()}`
        surname = `grillo-${random()}`
        email = `e-${random()}@gmail.com`
        password = `pass-${random()}`
        encryptedPassword = await bcrypt.hash(password, 10)

        //second-user
        _name = `name-${random()}`
        _surname = `grillao-${random()}`
        _email = `e-${random()}@mail.com`

        const user = await User.create({ name, surname, email, password: encryptedPassword })
        userId = user.id.toString()

        const _user = await User.create({ name: _name, surname: _surname, email: _email, password: encryptedPassword })
        _userId = _user.id.toString()

        //workgroup-oriented

        workGroupName = `name-${random}`

        const workGroup = await WorkGroup.create({ name: workGroupName, creator: userId, members: [userId, _userId] })
        workGroupId = workGroup.id.toString()

    })

    describe('asynchronous paths', () => {
        it('should succes to search user with a valid query', async () => {
            query = 'gri'
            debugger
            const result = await searchUsers(workGroupId, query)
            expect(result).to.exist
            expect(result.constructor.name).to.equal('Array')
            expect(result).to.be.instanceOf(Array)
            expect(result.length).to.equal(2)
            expect(result[0].name).to.equal(name)
            expect(result[0].surname).to.equal(surname)
            expect(result[0].email).to.equal(email)
            expect(result[0].id).to.equal(userId)

            expect(result[1].name).to.equal(_name)
            expect(result[1].surname).to.equal(_surname)
            expect(result[1].email).to.equal(_email)
            expect(result[1].id).to.equal(_userId)

        });

        it('should fail when search dont return nothing', async () => {
            query = 'aaaaaaaaaa'
            try {
                await searchUsers(workGroupId, query)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`search with query ${query} has not result`)
            }
        });
        it('should fail when search dont return nothing', async () => {
            query = `query-${random()}`
            try {
                await searchUsers(workGroupId, query)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`search with query ${query} has not result`)
            }
        });
        it('should fail to search when workgroup does no exist', async () => {
            await WorkGroup.deleteMany()
            try {
                await searchUsers(workGroupId, query)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`workgroup with id ${workGroupId} does not exist`)
            }
        });
    });

    describe('synchronous paths', () => {
        it('should fail to search when query non-string', () => {

            query = random()
            expect(() => searchUsers(workGroupId, query)).throw(TypeError, `${query} is not a string`)

            query = undefined
            expect(() => searchUsers(workGroupId, query)).throw(TypeError, `${query} is not a string`)

            query = null
            expect(() => searchUsers(workGroupId, query)).throw(TypeError, `${query} is not a string`)

            query = false
            expect(() => searchUsers(workGroupId, query)).throw(TypeError, `${query} is not a string`)

            query = {}
            expect(() => searchUsers(workGroupId, query)).throw(TypeError, `${query} is not a string`)

            query = []
            expect(() => searchUsers(workGroupId, query)).throw(TypeError, `${query} is not a string`)

            query = ''
            expect(() => searchUsers(workGroupId, query)).throw(Error, `string is empty or blank`)

            query = '   '
            expect(() => searchUsers(workGroupId, query)).throw(Error, `string is empty or blank`)

        });
        it('should fail to search when query non-string', () => {
            query = "random query"
            workGroupId = random()
            expect(() => searchUsers(workGroupId, query)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = undefined
            expect(() => searchUsers(workGroupId, query)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = null
            expect(() => searchUsers(workGroupId, query)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = false
            expect(() => searchUsers(workGroupId, query)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = {}
            expect(() => searchUsers(workGroupId, query)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = []
            expect(() => searchUsers(workGroupId, query)).throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = ''
            expect(() => searchUsers(workGroupId, query)).throw(Error, `string is empty or blank`)

            workGroupId = '   '
            expect(() => searchUsers(workGroupId, query)).throw(Error, `string is empty or blank`)

        });
    });

    afterEach(async () => {
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany()])

    })
    after(async () => {
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany()])
        await mongoose.disconnect()
    })

});
