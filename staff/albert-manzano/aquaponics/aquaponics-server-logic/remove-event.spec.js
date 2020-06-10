require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const removeEvent = require('./remove-event')
const { random } = Math
const { expect } = require('chai')
require('aquaponics-commons/polyfills/json')
const { mongoose, models: { User,Event} } = require('aquaponics-data')


describe('logic - removeEvent', () => {
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
        beforeEach(() => {
            return User.create({ name, surname, email, password, role, confirmed, status, phone, password })
                .then(result => userId = result.id)
                .then(()=>Event.create({createdBy: userId, date, description}))
                .then(result=> eventId = result.id)
        })

        it('should add event on proper data', () => {
            return removeEvent(date, description, userId, eventId)
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
                    expect(events.length).to.equal(0)
                })
        })
    })

    describe('wrong inputs', () => {
        it('should fail on wrong input', () => {
            expect(() => {
                removeEvent(true, description, userId,eventId)
            }).to.throw(TypeError, `${'true'} is not a date`)

            expect(() => {
                removeEvent(undefined, description, userId,eventId)
            }).to.throw(Error, `date is empty or blank`)

            expect(() => {
                removeEvent(9, description, userId,eventId)
            }).to.throw(TypeError, `${'9'} is not a date`)

            expect(() => {
                removeEvent(date, true, userId,eventId)
            }).to.throw(TypeError, `${'true'} is not a string`)

            expect(() => {
                removeEvent(date, undefined, userId,eventId)
            }).to.throw(TypeError, `${'undefined'} is not a string`)

            expect(() => {
                removeEvent(date, 9, userId,eventId)
            }).to.throw(TypeError, `${'9'} is not a string`)

            expect(() => {
                removeEvent(date, description, true,eventId)
            }).to.throw(TypeError, `${'true'} is not a string`)

            expect(() => {
                removeEvent(date, description, undefined,eventId)
            }).to.throw(TypeError, `${'undefined'} is not a string`)

            expect(() => {
                removeEvent(date, description, 9,eventId)
            }).to.throw(TypeError, `${'9'} is not a string`)

            expect(() => {
                removeEvent(date, description, userId,true)
            }).to.throw(TypeError, `${'true'} is not a string`)

            expect(() => {
                removeEvent(date, description,userId, undefined)
            }).to.throw(TypeError, `${'undefined'} is not a string`)

            expect(() => {
                removeEvent(date, description,userId, 9)
            }).to.throw(TypeError, `${'9'} is not a string`)
        })
    })
    describe('when user does not exists', () => {
        beforeEach(() => {
            it('should fail when creating event because user does not exist', () => {
                return User.deleteMany()
                    .then(() => removeEvent(date, description, userId, eventId))
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.exist
                        expect(error).to.be.an.instanceOf(Error)
                        expect(error.message).to.equal(`user with id ${userId} does not exist`)
                    })

            })
        })

    })
    describe('when user does not exists', () => {
        it('should fail when creating event because user does not exist', () => {
            return User.deleteMany()
            .then(() => removeEvent(date, description, userId,eventId))
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