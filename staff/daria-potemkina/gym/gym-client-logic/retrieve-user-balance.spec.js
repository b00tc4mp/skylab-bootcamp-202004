require('dotenv').config()

const { env: { MONGODB_URL_TEST, SECRET_TEST: SECRET } } = process

const retrieveUserBalance = require('./retrieve-user-balance')
const { random, round } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
require('gym-commons/ponyfills/xhr')
const { ObjectId } = mongo
const { utils: { jwtPromised } } = require('gym-commons')
const moment = require('moment')
const context = require('./context')

context.storage = {}

describe('logic - retrieve-user-balance', () => {
    let users, accountbalances

    before(() => mongo.connect(MONGODB_URL_TEST)
        .then(connection => {
            users = connection.db().collection('users')
            accountbalances = connection.db().collection('accountbalances')
        }))

    let user, token, userId, balance

    beforeEach(() => {
        return Promise.all([
            users.deleteMany(),
            accountbalances.deleteMany()
        ])
            .then(() => {
                user = {
                    name: `name-${random()}`,
                    surname: `surname-${random()}`,
                    email: `email-${random()}`,
                    password: `password-${random()}`,
                    card: {
                        number: `${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}`,
                        holder: `name-${random()} surname-${random()}`,
                        expirationDate: new Date('Janury 23, 2025'),
                        cvv: `${round(random() * 1000)}`
                    }
                }

                return users.insertOne(user).then(({ insertedId }) => {
                    userId = insertedId.toString()
                    return jwtPromised.sign({ sub: insertedId.toString() }, SECRET)
                        .then(_token => context.storage.token = _token)
                })
                    .then(() => {
                        balance = {
                            user: ObjectId(userId),
                            date: new Date(),
                            guarantee: (random() * 100).toFixed(2) * 1,
                            profitAndLoss: (random() * 100).toFixed(2) * 1
                        }
                        return accountbalances.insertOne(balance)
                    })
            })
    })

    it('should return the user account balance', () => {
        return retrieveUserBalance(token)
            .then(results => {
                expect(results).to.be.an('array')
                expect(results).to.have.lengthOf(1)

                const [result] = results

                expect(result.date).to.equal(moment(balance.date).format('DD-MMMM-YYYY'))
                expect(result.guarantee).to.equal(balance.guarantee)
                expect(result.profitAndLoss).to.equal(balance.profitAndLoss)
            })
    })

    it('should fail when user is not exist', () => {
        const _userId = ObjectId().toString()
        return jwtPromised.sign({ sub: _userId }, SECRET)
            .then(_token => context.storage.token = _token)
            .then(() => {
                return retrieveUserBalance()
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.exist

                        expect(error).to.be.an.instanceof(Error)
                        expect(error.message).to.equal(`user with id ${_userId} does not exist`)
                    })
            })
    })

    it('should fail when the balance is empty', () => {
        return accountbalances.deleteMany()
            .then(() => {
                return retrieveUserBalance()
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.exist

                        expect(error).to.be.an.instanceof(Error)
                        expect(error.message).to.equal('the balance is empty, there are no operations yet')
                    })
            })
    })

    afterEach(() =>
        Promise.all([
            users.deleteMany(),
            accountbalances.deleteMany()
        ])
    )

    after(mongo.disconnect)
})

