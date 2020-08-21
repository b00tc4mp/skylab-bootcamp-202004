require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const readByUsers = require('./add-read-by')
const { random } = Math
const { expect } = require('chai')
require('work-meeting-commons/polyfills/json')
const { mongoose, models: { User, Summary, Meeting } } = require('work-meeting-data')
const {errors:{UnexistenceError}} = require('work-meeting-commons') 



describe('logic - add-read-by', () => {
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

    describe('when user already exists and will add the user in ReadBy array', () => {
        

        it('should succeed on correct user id', async () => {
            debugger
            const result = await readByUsers(userId,summaryId)
            expect(result).to.be.undefined
            const summaries = await Summary.find()
            const [summary] = summaries //agrupar lineas
            const {readBy} = summary
            expect(readBy.length).to.equal(1)
            expect(readBy[0].toString()).to.equal(userId) 
        

        })


        it('should fail when user does not exist', () => {

        return User.deleteMany()
            .then(()=> readByUsers(userId,summaryId))
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user ${userId} not exist`)
                            })
        })
        it('should fail when summary does not exist', () => {
            return Summary.deleteMany()
                .then(()=>readByUsers(userId,summaryId))
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`summary ${summaryId} not exist`)
                })
        })

        describe('synchronous paths', () => {
            it('should return an error when synchronous non-string error exists', () => {

                let _summaryId = random()
                expect(() => {
                    readByUsers(_summaryId,userId)
                }).to.throw(TypeError, `${_summaryId} is not a string`)

                _summaryId = undefined
                expect(() => {
                    readByUsers(_summaryId,userId)
                }).to.throw(TypeError, `${_summaryId} is not a string`)
    
                _summaryId= null
                expect(() => {
                    readByUsers(_summaryId,userId)
                }).to.throw(TypeError, `${_summaryId} is not a string`)
               
                _summaryId = true
                expect(() => {
                    readByUsers(_summaryId,userId)
                }).to.throw(TypeError, `${_summaryId} is not a string`)

                _summaryId = []
                expect(() => {
                    readByUsers(_summaryId,userId)
                }).to.throw(TypeError, `${_summaryId} is not a string`)

                _summaryId = {}
                expect(() => {
                    readByUsers(_summaryId,userId)
                }).to.throw(TypeError, `${_summaryId} is not a string`)
                
                _summaryId= '    '
                expect(() => {
                    readByUsers(_summaryId,userId)
                }).to.throw(Error, 'string is empty or blank')

                _summaryId= ''
                expect(() => {
                    readByUsers(_summaryId,userId)
                }).to.throw(Error, 'string is empty or blank')
    
            })
        });
   

    })
    afterEach(async() => {
        await User.deleteMany()
        await Summary.deleteMany()

    })

    after(async ()=> await mongoose.disconnect())
})