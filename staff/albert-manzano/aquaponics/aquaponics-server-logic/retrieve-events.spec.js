require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const retrieveEvents = require('./retrieve-events')
const { random } = Math
const { expect } = require('chai')
require('aquaponics-commons/polyfills/json')
const { mongoose, models: { User, Event } } = require('aquaponics-data')


describe('logic - retrieveEvents', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let userId, name, surname, email, password, role, confirmed, status, phone
    let description1, description2, date1, date2, eventId, eventId1, eventId2

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
                date = new Date()
                date1 = new Date()
                date2 = new Date()
                description = "hello world"
                description1 = "hola mundo"
                description2 = "hola mon"
            })
    )

    describe('when user already exists', () => {
        beforeEach(() => {
            return User.create({ name, surname, email, password, role, confirmed, status, phone, password })
                .then(([result]) => userId = result.id)
                .then(() => {
                    return Promise.all([
                        Event.create({ createdBy: userId, date, description }),
                        Event.create({ createdBy: userId, date: date1, description: description1 }),
                        Event.create({ createdBy: userId, date: date2, description: description2 }),
                    ])
                        .then(([, result]) => eventId = result.id)
                        .then(([, , result]) => eventId1 = result.id)
                        .then(([, , , result]) => eventId2 = result.id)
                })
        })

        it('should upadate event on proper data', () => {
            return retrieveEvents(date, description, userId)
                .then(() => User.find().populate('events'))
                .then(users => {
                    expect(users).to.have.lengthOf(1)
                    const [user] = users
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
                    expect(events).to.exist
                    expect(events.length).to.equal(3)
                    expect(events[0].date).to.exist
                    expect(events[0].date).to.be.an.instanceOf(Date)
                    expect(events[0].date).to.deep.equal(date)
                    expect(events[0].description).to.exist
                    expect(events[0].description).to.be.a('string')
                    expect(events[0].description).to.equal(description)
                    expect(events[0]._id).to.exist
                })
        })
    })

    describe('wrong inputs', () => {

        it('should fail on wrong input', () => {
            expect(() => {
                retrieveEvents(true, description, userId)
            }).to.throw(TypeError, `true is not a date`)

            expect(() => {
                retrieveEvents(undefined, description, userId)
            }).to.throw(Error, `date is empty or blank`)

            expect(() => {
                retrieveEvents(9, description, userId)
            }).to.throw(TypeError, `${'9'} is not a date`)

            expect(() => {
                retrieveEvents(date, true, userId)
            }).to.throw(TypeError, `${'true'} is not a string`)

            expect(() => {
                retrieveEvents(date, undefined, userId)
            }).to.throw(TypeError, `${'undefined'} is not a string`)

            expect(() => {
                retrieveEvents(date, 9, userId)
            }).to.throw(TypeError, `${'9'} is not a string`)

            expect(() => {
                retrieveEvents(date, description, true)
            }).to.throw(TypeError, `${'true'} is not a string`)

            expect(() => {
                retrieveEvents(date, description, undefined)
            }).to.throw(TypeError, `${'undefined'} is not a string`)

            expect(() => {
                retrieveEvents(date, description, 9)
            }).to.throw(TypeError, `${'9'} is not a string`)

        })
    })

    describe('when event does not exists', () => {
        beforeEach(() => {
            it('should fail when creating event because user does not exist', () => {
                return Event.deleteMany()
                    .then(() => retrieveEvents(date, description, userId))
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.exist
                        expect(error).to.be.an.instanceOf(Error)
                        expect(error.message).to.equal(`event user id ${userId} does not exist`)
                    })

            })
        })
    })

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})