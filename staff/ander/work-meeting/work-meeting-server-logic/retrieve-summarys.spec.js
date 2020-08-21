require('dotenv').config()
const {env:{TEST_MONGODB_URL: MONGODB_URL}} = process
const retrieveSummarys = require('./retrieve-summarys')
const {expect} = require('chai')
require('work-meeting-commons/polyfills/string')
const { UnexistenceError } = require('work-meeting-commons/errors')
const {mongoose, models:{User, WorkGroup, Summary, Meeting}} = require('work-meeting-data')
const {random} = Math
const bcrypt = require('bcryptjs')



describe('retrieve summary', () => {
    let name, surname, email, password, encryptedPassword, userId

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

  
          await Meeting.findByIdAndUpdate(meetingId, { summaries: [summaryId] })
    })

 describe('asynchronous', () => {
        it('should succes to retrieve meetings with valid data', async () => {
            debugger
            const result = await retrieveSummarys(userId, meetingId)
            
            expect(result).to.be.not.undefined
            /* expect(result.constructor.name).to.equal('Object') */
            expect(result).to.be.instanceOf(Object)
            expect(result[0].content).to.equal(content)
            expect(result[0].title).to.equal(title)
            expect(result[0].id).to.equal(summaryId)
            expect(result[0].meeting.toString()).to.equal(meetingId)
            expect(result[0].workGroup.toString()).to.equal(workGroupId)
        });

        it('should fail to retrieve summary when user does not exist', async () => {
            await User.deleteMany()

            try {
                await retrieveSummarys(userId, meetingId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)

            }


        });
        it('should fail to retrieve summary when meeting does not exist', async () => {
            await Meeting.deleteMany()

            try {
                await retrieveSummarys(userId, meetingId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`meeting with id ${meetingId} does not exist`)

            }
        });
        it('should fail to retrieve meeting when summary does not exist', async () => {
            await Meeting.findByIdAndUpdate(meetingId, {host: workGroupId})

            try {
                await retrieveSummarys(userId, meetingId)
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user with id ${userId} not creator`)

            }
        });
        
    });
    describe('synchronous paths', () => {
        it('should fail on a non-string userId', () => {

            userId = random()
            expect(() => retrieveSummarys(userId, meetingId)).to.throw(TypeError, `${userId} is not a string`)

            userId = false
            expect(() => retrieveSummarys(userId, meetingId)).to.throw(TypeError, `${userId} is not a string`)

            userId = []
            expect(() => retrieveSummarys(userId, meetingId)).to.throw(TypeError, `${userId} is not a string`)

            userId = {}
            expect(() => retrieveSummarys(userId, meetingId)).to.throw(TypeError, `${userId} is not a string`)

            userId = undefined
            expect(() => retrieveSummarys(userId, meetingId)).to.throw(TypeError, `${userId} is not a string`)

            userId = null
            expect(() => retrieveSummarys(userId, meetingId)).to.throw(TypeError, `${userId} is not a string`)

            userId = ''
            expect(() => retrieveSummarys(userId, meetingId)).to.throw(Error, 'string is empty or blank')

            userId = '    '
            expect(() => retrieveSummarys(userId, meetingId)).to.throw(Error, 'string is empty or blank')
        });
        it('should fail on a non-string meetingId', () => {

            meetingId = random()
            expect(() => retrieveSummarys(userId, meetingId)).to.throw(TypeError, `${meetingId} is not a string`)

            meetingId = false
            expect(() => retrieveSummarys(userId, meetingId)).to.throw(TypeError, `${meetingId} is not a string`)

            meetingId = []
            expect(() => retrieveSummarys(userId, meetingId)).to.throw(TypeError, `${meetingId} is not a string`)

            meetingId = {}
            expect(() => retrieveSummarys(userId, meetingId)).to.throw(TypeError, `${meetingId} is not a string`)

            meetingId = undefined
            expect(() => retrieveSummarys(userId, meetingId)).to.throw(TypeError, `${meetingId} is not a string`)

            meetingId = null
            expect(() => retrieveSummarys(userId, meetingId)).to.throw(TypeError, `${meetingId} is not a string`)

            meetingId = ''
            expect(() => retrieveSummarys(userId, meetingId)).to.throw(Error, 'string is empty or blank')

            meetingId = '    '
            expect(() => retrieveSummarys(userId, meetingId)).to.throw(Error, 'string is empty or blank')
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