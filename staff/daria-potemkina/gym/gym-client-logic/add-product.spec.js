require('dotenv').config()

const { env: { MONGODB_URL_TEST, SECRET_TEST: SECRET } } = process

const addProduct = require('./add-product')
const { random, round } = Math
const { expect } = require('chai')
const { mongo } = require('gym-data')
const { ObjectId } = mongo
require('gym-commons/polyfills/json')
const { utils: { jwtPromised } } = require('gym-commons')

describe('logic - add-product', () => {
    let users, products, contracts, prices

    before(() => mongo.connect(MONGODB_URL_TEST)
        .then(connection => {
            users = connection.db().collection('users')
            products = connection.db().collection('products')
            contracts = connection.db().collection('contracts')
            prices = connection.db().collection('prices')
        }))

    let user, product, price, userId, token, productId, priceId, side, _side, quantity

    beforeEach(() =>
        Promise.all([
            users.deleteMany(),
            products.deleteMany(),
            contracts.deleteMany(),
            prices.deleteMany()
        ])
            .then(() => {
                product = {
                    productType: 'future',
                    productType: 'future',
                    ticker: `ticker-${random()}`,
                    exchange: `exchange-${random()}`,
                    sector: `sector-${random()}`,
                    contractSize: round(random() * 100),
                    settlementDate: new Date('September 18 2020')
                }

                side = ['Buy', 'Sell']

                quantity = round(random() * 10)

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
                
                return Promise.all([products.insertOne(product).then(_product => productId = _product.insertedId.toString())
                    .then(() => {
                        price = {
                            product: productId,
                            date: new Date(),
                            price: random().toFixed(2) * 1
                        }
                    }),
                prices.insertOne(price).then(_price => priceId = _price.insertedId.toString())
                ])
            })
    )

    describe('when user already exists', () => {
        beforeEach(() =>
            users.insertOne(user)
                .then(_user => {
                    userId = _user.insertedId.toString()
                    return jwtPromised.sign({ sub: _user.insertedId.toString() }, SECRET)
                })
                .then(_token => token = _token)
        )

        it('should create a contact with trade details', () => {
            _side = side[round(random())]

            return addProduct(token, productId, priceId, _side, quantity)
                .then(() => contracts.find().toArray())
                .then(contract => {

                    expect(contract.user.toString()).to.equal(userId)
                    expect(contract.product.toString()).to.equal(productId)
                    expect(contract.trades).to.be.an('array')
                    expect(trades).to.have.lengthOf(1)

                    const [trade] = contract.trades

                    expect(trade).to.be.an.instanceOf(Object)
                    expect(trade.price.toString()).to.equal(priceId)
                    expect(trade.type).to.equal(_side)
                    expect(trade.quantity).to.equal(quantity)
                })
        })
    })

    it('should fail when user does not exist', () => {
        const _userId = ObjectId().toString()
        _side = side[round(random())]

        return jwtPromised.sign({ sub: _userId }, SECRET)
            .then(_token => token = _token)
            .then(() =>
                addProduct(token, productId, priceId, _side, quantity)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).to.exist

                        expect(error).to.be.an.instanceof(Error)
                        expect(error.message).to.equal(`user with id ${_userId} does not exist`)
                    })
            )
    })

    afterEach(() =>
        Promise.all([
            users.deleteMany(),
            products.deleteMany(),
            contracts.deleteMany(),
            prices.deleteMany()
        ])
    )

    after(mongo.disconnect)
})