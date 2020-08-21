require('dotenv').config()
global.XMLHttpRequest = require('xhr2')
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL, JWT_SECRET } } = process
const { utils: { jwtPromised }} = require('../work-meeting-commons')

const readByUsers = require('./retrieve-read-by')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, Summary, Meeting } } = require('work-meeting-data')
const {errors:{UnexistenceError}} = require('work-meeting-commons') 


const context = require('./context')
context.API_URL = API_URL


describe('logic - read-by-users', () => {
    //user-oriented-variables
    let name, surname, email, password, userId
    //summary-oriented-variables
    let summaryContent, summaryTitle, summaryId
    //meeting-oriented-variables
    let meetingId,title,content

    before(() => mongoose.connect(MONGODB_URL))
    

    beforeEach(async() =>{
                await Promise.all([User.deleteMany(),Summary.deleteMany()])
                
                //user-oriented
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `pass-${random()}`
                //summary-oriented
                summaryContent = `content-${random()}`
                summaryTitle = `title-${random()}`
                //meeting-oriented
                content = `content-${random()}`
                title = `title-${random()}`
                const user = await User.create({ name, surname, email, password })
                userId = user.id

                const meeting = await Meeting.create({title, content, host: userId})
                meetingId=meeting.id.toString()

                const summary = await Summary.create({title: summaryTitle, content: summaryContent, readBy:[userId], meeting: meetingId})
                summaryId = summary.id
            })
      

    describe('when user not exist and returns users who have read the summary', () => {
      

        it('should succeed on correct meeting id', async () => {
            debugger
            const result = await readByUsers(summaryId)
            expect(result).to.not.be.undefined
            expect(result).to.be.an('array')
            expect(result.length).to.equal(1) //expect(result).to.have.lengthOf(1)
            expect(result[0].toString()).to.equal(userId)

        })


        it('should fail when summary Id not exist', () => {

           
            return Summary.deleteMany()
                .then(()=>readByUsers(summaryId))
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`summary with Id ${summaryId} not exist`)
                })
        })
        it('should return an error when synchronous error exists', () => {
            
            summaryId= random()
            expect(() => {
                readByUsers(summaryId)
            }).to.throw(TypeError, `${summaryId} is not a string`)

            summaryId= undefined
            expect(() => {
                readByUsers(summaryId)
            }).to.throw(TypeError, `${summaryId} is not a string`)

            summaryId= null
            expect(() => {
                readByUsers(summaryId)
            }).to.throw(TypeError, `${summaryId} is not a string`)
            
            summaryId = true
            expect(() => {
                readByUsers(summaryId)
            }).to.throw(TypeError, `${summaryId} is not a string`)

            summaryId = {}
            expect(() => {
                readByUsers(summaryId)
            }).to.throw(TypeError, `${summaryId} is not a string`)

            summaryId = []
            expect(() => {
                readByUsers(summaryId)
            }).to.throw(TypeError, `${summaryId} is not a string`)
            
            summaryId = ''
            expect(() => {
                readByUsers(summaryId)
            }).to.throw(Error, 'string is empty or blank')

            summaryId= '    '
            expect(() => {
                readByUsers(summaryId)
            }).to.throw(Error, 'string is empty or blank')
            
        })

    })
    afterEach(async() => {
        await User.deleteMany()
        await Summary.deleteMany()

    })

    after(async ()=> await mongoose.disconnect())
})