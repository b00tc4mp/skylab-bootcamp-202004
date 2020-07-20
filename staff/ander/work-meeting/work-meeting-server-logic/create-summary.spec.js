require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const createSummary = require('./create-summary')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, Meeting, Summary } } = require('work-meeting-data')

describe('logic - create-summary', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, meetingTitle, meetingContent, meetingId, summaryTitle, summaryContent

    beforeEach(() =>
        User.deleteMany()
            .then(() => Meeting.deleteMany())
            .then(() => Summary.deleteMany())
            .then(() => {

                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                meetingTitle = "skylab coders academy 2020"
                meetingContent = "Reorganizar las mesas y sillas del aula por covid"
                summaryTitle = "skylab marketing"
                summaryContent = "el logo es una shit, we need change"


            })
    )

    describe('when user already exists', () => {
        beforeEach(async () => {
            debugger
            const user = await User.create({ name, surname, email, password })
            userId = user._id.toString()
            const meeting = await Meeting.create({ title: meetingTitle, content: meetingContent, host: userId })
            meetingId = meeting._id.toString()
        })

        it('should succeed on correct user id', async () => {
            debugger
            const result = await createSummary(userId, meetingId, summaryTitle, summaryContent) //(userId, meetingId, title, content)
            expect(result).to.be.undefined
            const summaries = await Summary.find()
            expect(summaries.length).to.equal(1)
            const [summary] = summaries
            expect(summary.title).to.equal(summaryTitle)
            expect(summary.content).equal(summaryContent)



        })


        it('should fail when user does not exist', () => {

            const userId = '5ed1204ee99ccf6fae798aef'
            return createSummary(userId, meetingId, summaryTitle, summaryContent)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`user ${userId} not exist`)
                })
        })
        it('should fail when meetingId does not exist', () => {

            const meetingId = '5ed1204ee99ccf6fae798aef'
            return createSummary(userId, meetingId, summaryTitle, summaryContent)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist

                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`meeting ${meetingId} is not exist`)
                })
        })
        it('should fail when summary title is duplicated', () => {
            return createSummary(userId, meetingId, summaryTitle, summaryContent)
                .then(() => createSummary(userId, meetingId, summaryTitle, summaryContent))
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`title ${summaryTitle} already exist`)
                })
        })
    })

    afterEach(() => {
        User.deleteMany()
        Meeting.deleteMany()
        Summary.deleteMany()


    })

    after(async ()=> await mongoose.disconnect)
})