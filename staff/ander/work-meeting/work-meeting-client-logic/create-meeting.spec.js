require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const createMeeting = require('./create-meeting')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, Meeting} } = require('work-meeting-data')

describe('logic - create work group', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, meetingTitle, meetingContent

    beforeEach(() =>
        User.deleteMany()
            .then(()=>Meeting.deleteMany())
            .then(() => {
                
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                meetingTitle = "skylab coders academy 2020"
                meetingContent= "Reorganizar las mesas y sillas del aula por covid"

            })
    )

    describe('when user already exists', () => {
        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(user => userId = user.id) 
                
        )

        it('should succeed on correct user id', async () =>{
            const result =await createMeeting(meetingTitle, meetingContent, userId)
            console.log(result)

                expect(result).to.be.undefined  
            const meetings= await Meeting.find()
                expect(meetings.length).to.equal(1) 
            const [meeting] = meetings
            expect(meeting.title).to.equal(meetingTitle)
            expect(meeting.host.toString()).to.equal(userId)
            expect(meeting.content).equal(meetingContent)
            
            
            const user = await User.findById(userId)
            
            expect(user.host.length).to.equal(1)
            expect(user.host[0].toString()).to.equal(meeting._id.toString())

                
        })
    })

    it('should fail when user does not exist', () => {
        const userId = '5ed1204ee99ccf6fae798aef'
        return createMeeting(meetingTitle, meetingContent, userId)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user ${userId} not exist`)
            })
    })

    afterEach(() => {
        User.deleteMany()
        Meeting.deleteMany()
      
    
    })

    after(mongoose.disconnect)
})