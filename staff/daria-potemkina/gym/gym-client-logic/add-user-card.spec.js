require('dotenv').config()

const { env: { MONGODB_URL_TEST, SECRET_TEST: SECRET } } = process

const addUserCard = require('./add-user-card')
const { random, round } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
const { ObjectId } = mongo
require('gym-commons/polyfills/json')
require('gym-commons/ponyfills/xhr')
const { utils: { jwtPromised } } = require('gym-commons')

const context = require('./context')

context.storage = {}

describe('logic - add-user-card', () => {
    let users

    before(() => mongo.connect(MONGODB_URL_TEST)
        .then(connection => users = connection.db().collection('users')))

    let name, surname, email, password, card, _number, _holder, _expirationDate, _cvv

    beforeEach(() => {
        return users.deleteMany()

            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `email-${random()}`
                password = `password-${random()}`
                card = {
                    number: `${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}`,
                    holder: `name-${random()} surname-${random()}`,
                    expirationDate: new Date('Janury 23, 2025'),
                    cvv: `${round(random() * 1000)}`
                }
            })
    })

    describe('when the user is already exists', () => {
        beforeEach(() => {
            return users.insertOne({ name, surname, email, password })
                .then(user => {
                    userId = user.insertedId.toString()
                    return jwtPromised.sign({ sub: user.insertedId.toString() }, SECRET)
                        .then(_token => context.storage.token = _token)
                })
        })

        it('should success on add card', () =>
            addUserCard(card.number, card.holder, card.expirationDate, card.cvv)
                .then(() => users.find().toArray())
                .then(users => {
                    const [user] = users

                    expect(user.card.number).to.equal(card.number)
                    expect(user.card.holder).to.equal(card.holder)
                    expect(user.card.expirationDate).to.be.an.instanceOf(Date)
                    expect(user.card.cvv).to.equal(card.cvv)
                })
        )

        it('should return a type error', () => {
            let { number, holder, expirationDate, cvv } = card

            _number = undefined
            expect(() => {
                addUserCard(_number, holder, expirationDate, cvv)
            }).to.throw(TypeError, `${_number} is not a string`)

            _number = 123
            expect(() => {
                addUserCard(_number, holder, expirationDate, cvv)
            }).to.throw(TypeError, `${_number} is not a string`)

            _number = true
            expect(() => {
                addUserCard(_number, holder, expirationDate, cvv)
            }).to.throw(TypeError, `${_number} is not a string`)

            _holder = undefined
            expect(() => {
                addUserCard(number, _holder, expirationDate, cvv)
            }).to.throw(TypeError, `${_holder} is not a string`)

            _holder = 123
            expect(() => {
                addUserCard(number, _holder, expirationDate, cvv)
            }).to.throw(TypeError, `${_holder} is not a string`)

            _holder = true
            expect(() => {
                addUserCard(number, _holder, expirationDate, cvv)
            }).to.throw(TypeError, `${_holder} is not a string`)

            _expirationDate = undefined
            expect(() => {
                addUserCard(number, holder, _expirationDate, cvv)
            }).to.throw(TypeError, 'expiration date is do not have a date format')

            _expirationDate = true
            expect(() => {
                addUserCard(number, holder, _expirationDate, cvv)
            }).to.throw(TypeError, 'expiration date is do not have a date format')

            _cvv = 234
            expect(() => {
                addUserCard(number, holder, expirationDate, _cvv)
            }).to.throw(TypeError, `${_cvv} is not a string`)

            _cvv = true
            expect(() => {
                addUserCard(number, holder, expirationDate, _cvv)
            }).to.throw(TypeError, `${_cvv} is not a string`)
        })
    })

    it('should fail when the user is not exists', () => {
        const _userId = ObjectId().toString()

        return jwtPromised.sign({ sub: _userId }, SECRET)
            .then(_token => context.storage.token = _token)
            .then(() =>
                addUserCard(card.number, card.holder, card.expirationDate, card.cvv)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.exist

                        expect(error).to.be.an.instanceOf(Error)
                        expect(error.message).to.be.equal(`user with id ${_userId} does not exist`)
                    })
            )

    })

    afterEach(() => users.deleteMany())

    after(mongo.disconnect)
})