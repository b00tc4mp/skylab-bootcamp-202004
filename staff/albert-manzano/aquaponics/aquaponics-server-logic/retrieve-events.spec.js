require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const retrieveEvents = require('./retrieve-events')
const { random } = Math
const { expect } = require('chai')
require('aquaponics-commons/polyfills/json')
const { mongoose, models: { User, Event } } = require('aquaponics-data')


describe('logic - retrieveEvents', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let userId, name, surname, email, password, role, confirmed, status, phone, description
    let descriptionTwo, descriptionThree
    let date, dateTwo, dateThree
    let eventId, eventIdTwo, eventIdThree;

    beforeEach(async () => {
        await User.deleteMany()
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        role = "user"
        status = "enable"
        phone = random()
        date = new Date()
        dateTwo = new Date()
        dateThree = new Date()
        description = "hello world"
        descriptionTwo = "hola mundo"
        descriptionThree = "hola mon"

        const result = await User.create({ name, surname, email, password, role, confirmed, status, phone, password })
        userId = result.id

        const event = await Event.create({ createdBy: userId, date, description })
        eventId = event.id

        const event1  = await Event.create({ createdBy: userId, date: dateTwo, description: descriptionTwo })
        eventIdTwo = event1.id

        const event2 = await Event.create({ createdBy: userId, date: dateThree, description: descriptionThree })
        eventIdThree = event2.id

        await User.findByIdAndUpdate(userId,( {$addToSet: {events: eventId}} ))

        await User.findByIdAndUpdate(userId,( {$addToSet: {events: eventIdTwo}} ))

        await User.findByIdAndUpdate(userId,( {$addToSet: {events: eventIdThree}} ))

    })
    describe('when userId exist', () => {
            it('should retireve events', async () =>{
                const result = await retrieveEvents(userId)
                expect(result).to.be.an.instanceOf(Array)
                const user = await User.find().populate('events')
                expect(user[0].name).to.exist
                expect(user[0].name).to.equal(name)
                expect(user[0].surname).to.equal(surname)
                expect(user[0].surname).to.exist
                expect(user[0].email).to.equal(email)
                expect(user[0].email).to.exist
                expect(user[0].role).to.equal(role)
                expect(user[0].role).to.exist
                expect(user[0].status).to.equal(status)
                expect(user[0].status).to.exist
                expect(user[0].events).to.exist
                const { events } = user[0]
                expect(events).to.have.lengthOf(3)
                expect(events).to.exist
                expect(events.length).to.equal(3)
                expect(events[0].date).to.exist
                expect(events[0].date).to.be.an.instanceOf(Date)
                expect(events[0].date).to.deep.equal(date)
                expect(events[0].description).to.exist
                expect(events[0].description).to.be.a('string')
                expect(events[0].description).to.equal(description)
                expect(events[0].id).to.exist
                expect(events[0].id).to.equal(eventId)
                expect(events[1].date).to.exist
                expect(events[1].date).to.be.an.instanceOf(Date)
                expect(events[1].date).to.deep.equal(date)
                expect(events[1].description).to.exist
                expect(events[1].description).to.be.a('string')
                expect(events[1].description).to.equal(descriptionTwo)
                expect(events[1].id).to.exist
                expect(events[1].id).to.equal(eventIdTwo)
                expect(events[2].date).to.exist
                expect(events[2].date).to.be.an.instanceOf(Date)
                expect(events[2].date).to.deep.equal(date)
                expect(events[2].description).to.exist
                expect(events[2].description).to.be.a('string')
                expect(events[2].description).to.equal(descriptionThree)
                expect(events[2].id).to.exist
                expect(events[2].id).to.equal(eventIdThree)
            })
    
    })

    it('should fail on wrong input', () => {
        expect(() => {
            retrieveEvents(true)
        }).to.throw(TypeError, `${'true'} is not a string`)

        expect(() => {
            retrieveEvents(undefined)
        }).to.throw(TypeError, `${'undefined'} is not a string`)

        expect(() => {
            retrieveEvents(9)
        }).to.throw(TypeError, `${'9'} is not a string`)

    })

    describe('when userId does not exist', () => {
        beforeEach(() => {
            it('should fail on trying to retireve', async () => {

                try {
                    await User.deleteMany()
                    await retrieveEvents(userId)

                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.exist
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error.message).to.equal(`user id ${userId} does not exist`)
                }
            })
        })

    })

    afterEach(async() =>await User.deleteMany())

    after(async()=>await mongoose.disconnect)
})