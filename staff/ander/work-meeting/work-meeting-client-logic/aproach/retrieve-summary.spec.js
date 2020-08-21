require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, JWT_SECRET } } = process
const { utils: { jwtPromised }} = require('../work-meeting-commons')
const retrieveSummary = require('./retrieve-summary')
const {expect} = require('chai')
require('work-meeting-commons/polyfills/string')
const {mongoose, models:{User, WorkGroup, Summary, Meeting}} = require('work-meeting-data')
const {random} = Math
const bcrypt = require('bcryptjs')

const context = require('./context')
context.API_URL = API_URL



describe('retrieve summary', () => {
    let name, surname, email, password, encryptedPassword, userId, token

    //meeting-oriented variables
    let title, content, meetingId

    //summaries-oriented variables
    let summaryId

    //workgroup-oriented variables
    let workGroupName, workGroupId

    before(async()=>{
        await mongoose.connect(MONGODB_URL)
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany(), Summary.deleteMany(), Meeting.deleteMany()])
    })

    beforeEach(async()=>{
          //users-oriented
          name = `name-${random()}`
          surname = `surname-${random()}`
          email = `e-${random()}@gmail.com`
          password = `pass-${random()}`
          encryptedPassword = await bcrypt.hash(password, 10)
  
          const user = await User.create({ name, surname, email, password: encryptedPassword })
          userId = user.id.toString()
          token = await jwtPromised.sign({sub:userId}, JWT_SECRET, {expiresIn:'1d'})
          context.storage = {token}  
  
          //workGroup-oriented variables
          workGroupName = `name-${random()}`
          const workGroup = await WorkGroup.create({ name: workGroupName, creator: userId })
          workGroupId = workGroup.id.toString()
  
          //summary/meeting-oriented
          title = `title-${random()}`
          content = `content-${random()}`
          const meeting = await Meeting.create({ title, content, host: userId, workGroup: workGroupId })
          meetingId = meeting.id.toString()
  
          const summary = await Summary.create({ title, content, meeting: meetingId, workGroup: workGroupId })
          summaryId = summary.id.toString()
  
  
          await User.findByIdAndUpdate(userId, { summaries: [summaryId] })
    })

 describe('asynchronous', () => {
        it('should succes to retrieve meetings with valid data', async () => {
            debugger
            const result = await retrieveSummary(workGroupId, summaryId)
            debugger
            expect(result).to.be.not.undefined
            /* expect(result.constructor.name).to.equal('Object') */
            expect(result).to.be.instanceOf(Object)
            expect(result.content).to.equal(content)
            expect(result.title).to.equal(title)
            expect(result._id.toString()).to.equal(summaryId)
            expect(result.meeting.toString()).to.equal(meetingId)
            expect(result.workGroup.toString()).to.equal(workGroupId)
        });

        it('should fail to retrieve meeting when user does not exist', async () => {
            await User.deleteMany()

            try {
                await retrieveSummary(workGroupId, summaryId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)

            }


        });
        it('should fail to retrieve meeting when workgroup does not exist', async () => {
            await WorkGroup.deleteMany()

            try {
                await retrieveSummary(workGroupId, summaryId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`workGroup with id ${workGroupId} does not exist`)

            }
        });
        it('should fail to retrieve meeting when summary does not exist', async () => {
            await Summary.deleteMany()

            try {
                await retrieveSummary(workGroupId, summaryId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`summary with id ${summaryId} does not exist`)

            }
        });
        
        it('should fail to retrieve meeting when summary does not exist', async () => {
            await Summary.findByIdAndUpdate(summaryId, {workGroup:userId})
            try {
                await retrieveSummary(workGroupId, summaryId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`summary with id ${summaryId} is not from this workGroup`)

            }
        });
    });
    describe('synchronous paths', () => {
        it('should fail on a non-string userId', () => {

            token = random()
            context.storage={token}
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${token} is not a string`)

            token = false
            context.storage={token}
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${token} is not a string`)

            token = []
            context.storage={token}
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${token} is not a string`)

            token = {}
            context.storage={token}
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${token} is not a string`)

            token = undefined
            context.storage={token}
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${token} is not a string`)

            token = null
            context.storage={token}
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${token} is not a string`)

            token = ''
            context.storage={token}
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(Error, 'string is empty or blank')

            token = '    '
            context.storage={token}
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(Error, 'string is empty or blank')
        });
        it('should fail on a non-string workGroupId', () => {

            workGroupId = random()
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = false
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = []
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = {}
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = undefined
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = null
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${workGroupId} is not a string`)

            workGroupId = ''
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(Error, 'string is empty or blank')

            workGroupId = '    '
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(Error, 'string is empty or blank')
        });
        it('should fail on a non-string workGroupId', () => {

            summaryId = random()
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`)

            summaryId = false
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`)

            summaryId = []
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`)

            summaryId = {}
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`)

            summaryId = undefined
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`)

            summaryId = null
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(TypeError, `${summaryId} is not a string`)

            summaryId = ''
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(Error, 'string is empty or blank')

            summaryId = '    '
            expect(() => retrieveSummary(workGroupId, summaryId)).to.throw(Error, 'string is empty or blank')
        });
    });
    afterEach(async () => {
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany(), Summary.deleteMany(), Meeting.deleteMany()])
    })
    after(async () => {
        await Promise.all([User.deleteMany(), WorkGroup.deleteMany(), Summary.deleteMany(), Meeting.deleteMany()])
        await mongoose.disconnect()
    })
});