require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const updateEvent = require('./update-event')
const { random } = Math
const { expect } = require('chai')
require('aquaponics-commons/polyfills/json')
const { mongoose, models: { User, Event } } = require('aquaponics-data')


describe('logic - updateEvent', () => {
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
                newDate = new Date()
                newDescription = "hola mundo"
            })
    )

    describe('when user already exists', () => {
        beforeEach(() => {
            debugger
            return User.create({ name, surname, email, password, role, confirmed, status, phone, password })
                .then(result => userId = result.id)
                .then(()=> Event.create({ createdBy: userId , date, description}))
                .then(event => eventId = event.id)
                .then(() => User.findByIdAndUpdate(userId, { $addToSet: { events: eventId } }))
        })

        it('should upadate event on proper data', () => {
            return updateEvent(newDate, newDescription, userId, eventId)
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
                    const [event] = events
                    expect(events.length).to.equal(1)
                    expect(event.date).to.exist
                    expect(event.date).to.be.an.instanceOf(Date)
                    expect(event.date).to.deep.equal(newDate)
                    expect(event.description).to.exist
                    expect(event.description).to.be.a('string')
                    expect(event.description).to.equal(newDescription)
                    expect(event._id).to.exist
                })
        })
    })

    describe('wrong inputs', () => {

        it('should fail on wrong input', () => {
            expect(() => {
                updateEvent(true, newDescription, userId, eventId)
            }).to.throw(TypeError, `true is not a date`)

            expect(() => {
                updateEvent(undefined, newDescription, userId, eventId)
            }).to.throw(Error, `date is empty or blank`)

            expect(() => {
                updateEvent(9, newDescription, userId, eventId)
            }).to.throw(TypeError, `${'9'} is not a date`)

            expect(() => {
                updateEvent(newDate, true, userId, eventId)
            }).to.throw(TypeError, `${'true'} is not a string`)

            expect(() => {
                updateEvent(newDate, undefined, userId, eventId)
            }).to.throw(TypeError, `${'undefined'} is not a string`)

            expect(() => {
                updateEvent(newDate, 9, userId, eventId)
            }).to.throw(TypeError, `${'9'} is not a string`)

            expect(() => {
                updateEvent(newDate, newDescription, true, eventId)
            }).to.throw(TypeError, `${'true'} is not a string`)

            expect(() => {
                updateEvent(newDate, newDescription, undefined, eventId)
            }).to.throw(TypeError, `${'undefined'} is not a string`)

            expect(() => {
                updateEvent(newDate, newDescription, 9, eventId)
            }).to.throw(TypeError, `${'9'} is not a string`)

            expect(() => {
                updateEvent(newDate, newDescription, userId, true)
            }).to.throw(TypeError, `${'true'} is not a string`)

            expect(() => {
                updateEvent(newDate, newDescription, userId, undefined)
            }).to.throw(TypeError, `${'undefined'} is not a string`)

            expect(() => {
                updateEvent(newDate, newDescription, userId, 9)
            }).to.throw(TypeError, `${'9'} is not a string`)
        })
    })

    describe('when event does not exists', () => {
        beforeEach(() => {
            it('should fail when creating event because user does not exist', () => {
                return Event.deleteMany()
                    .then(() => updateEvent(newDate, newDescription, userId, eventId))
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.exist
                        expect(error).to.be.an.instanceOf(Error)
                        expect(error.message).to.equal(`event with id ${eventId} does not exist`)
                    })

            })
        })
    })

    describe('when user does not exists', () => {
        beforeEach(() => {
            it('should fail when creating event because user does not exist', () => {
                return User.deleteMany()
                    .then(() => updateEvent(newDate, newDescription, userId, eventId))
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.exist
                        expect(error).to.be.an.instanceOf(Error)
                        expect(error.message).to.equal(`user with id ${userId} does not exist`)
                    })

            })
        })

    })
    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})