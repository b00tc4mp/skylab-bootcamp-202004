require('dotenv').config()

const { env: { MONGODB_URL_TEST, SECRET_TEST: SECRET } } = process

const retrieveUserCard = require('./retrieve-user-card')
const { random, round } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
require('gym-commons/ponyfills/xhr')
const { ObjectId } = mongo
const { utils: { jwtPromised } } = require('gym-commons')
const moment = require('moment')
const context = require('./context')

context.storage = {}

describe('logic - retrieve-user-card', () => {
    let users

    before(() => mongo.connect(MONGODB_URL_TEST)
        .then(connection => {
            users = connection.db().collection('users')
        }))

    let name, surname, email, password, card, userId

    beforeEach(() => {
        return Promise.all([
            users.deleteMany(),
        ])
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

    describe('when the user already exists', () => {
        beforeEach(() => {
            return users.insertOne({ name, surname, email, password }).then(({ insertedId }) => {
                userId = insertedId.toString()
                return jwtPromised.sign({ sub: insertedId.toString() }, SECRET)
                    .then(_token => context.storage.token = _token)
            })
        })

        it('should return a credit card of user', () => {
            return users.updateOne({ _id: ObjectId(userId) }, { $set: { card } })
                .then(() => {
                    return retrieveUserCard()
                        .then(result => {
                            expect(result.number).to.equal(card.number)
                            expect(result.holder).to.equal(card.holder)
                            expect(result.expirationDate).to.equal(moment(card.expirationDate).format('DD-MM-YYYY'))
                            expect(result.cvv).to.be.undefined
                        })
                })
        })

        it('should fail when the card does not exist', () => {
            return retrieveUserCard()
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist

                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal('user does not have a card added')
                })
        })
    })

    it('should fail when the user does not exist', () => {
        const _userId = ObjectId().toString()
        return jwtPromised.sign({ sub: _userId }, SECRET)
            .then(_token => context.storage.token = _token)
            .then(() => {
                return retrieveUserCard()
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.exist

                        expect(error).to.be.an.instanceof(Error)
                        expect(error.message).to.equal(`user with id ${_userId} does not exist`)
                    })
            })
    })

    afterEach(() =>
        Promise.all([
            users.deleteMany()
        ])
    )

    after(mongo.disconnect)
})