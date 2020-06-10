require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const createEvent = require('./create-event')
const { random } = Math
const { expect } = require('chai')
require('aquaponics-commons/polyfills/json')
const { mongoose, models: { User, Event } } = require('aquaponics-data')


describe('logic - createEvent', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let userId, eventId, name, surname, email, password, role, confirmed, status, phone, description, date

    beforeEach(() =>
        User.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                role = "user"
                status = "enable"
                phone = random()
                description = "hello world"
                date = new Date()
            })
    )

    describe('when user already exists', () => {
        beforeEach(() =>
            User.create({ name, surname, email, password, role, confirmed, status, phone, password })
                .then(user => userId = user.id)
        )
    })

    it('should add event on proper data', () =>
        createEvent(date, description, userId)
            .then(event => eventId = event.id)
            .then(() => User.find())
            .then(users => {
                expect(users).to.have.lengthOf(1)
                const [user] = users
                console.log(user)
                expect(user.name).to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.surname).to.exist
                expect(user.email).to.equal(email)
                expect(user.email).to.exist
                expect(user.role).to.equal(role)
                expect(user.role).to.exist
                expect(user.status).to.equal(status)
                expect(user.status).to.exist
                expect(user.events).to.exist
                const { events } = user
                expect(events.length).to.equal(1)
                expect(events.event).to.exist
                expect(events.event).to.be.an.instanceOf(Object)
                const { event } = events
                expect(event.date).to.exist
                expect(event.date).to.be.an.instanceOf(Date)
                expect(event.date).to.equal(date)
                expect(event.description).to.exist
                expect(event.description).to.be.an.instanceOf(String)
                expect(event.description).to.equal(description)
                expect(event.id).to.exist.exist
                expect(event.id).to.equal(eventId)
            })
    )

    describe('wrong inputs', () => {
        it('should fail on wrong input', () => {
            expect(() => {
                createEvent(true, description, userId)
            }).to.throw(TypeError, `${'true'} is not a date`)
        
            expect(() => {
                createEvent(undefined, description, userId)
            }).to.throw(TypeError, `${'undefined'} is not a date`)
        
            expect(() => {
                createEvent(9, description, userId)
            }).to.throw(TypeError, `${'9'} is not a date`)
        
            expect(() => {
                createEvent(date, true, userId)
            }).to.throw(TypeError, `${'true'} is not a string`)
        
            expect(() => {
                createEvent(date, undefined, userId)
            }).to.throw(TypeError, `${'undefined'} is not a string`)
        
            expect(() => {
                createEvent(date, 9, userId)
            }).to.throw(TypeError, `${'9'} is not a string`)
        
            expect(() => {
                createEvent(date, description, true)
            }).to.throw(TypeError, `${'true'} is not a string`)
        
            expect(() => {
                createEvent(date, description, undefined)
            }).to.throw(TypeError, `${'undefined'} is not a string`)
        
            expect(() => {
                createEvent(date, description, 9)
            }).to.throw(TypeError, `${'9'} is not a string`)
        })
    })

    describe('when user does not exists', () => {
          it('should fail when creating event because user does not exist', () => {
            return createEvent(date, description, userId = "1234567890")
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.exist
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error.message).to.equal(`user with id ${userId} does not exist`)
                })
        })
    })

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})