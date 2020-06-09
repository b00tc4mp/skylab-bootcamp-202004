require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const addUserCard = require('./add-user-card')
const { round, random } = Math
const { expect } = require('chai')
const { mongoose, models: { User } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')
const { ObjectId } = mongoose
const bcrypt = require('bcryptjs')

describe('logic - addUserCard', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let name, surname, email, password, userId, number, holder, expirationDate, cvv, _userId, _number, _holder, _expirationDate, _cvv

    beforeEach(async () => {
        await User.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        number = `${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}`
        holder = `name-${random()} surname-${random()}`
        expirationDate = new Date()
        cvv = `${round(random() * 1000)}`

        hash = await bcrypt.hash(password, 10)
    })

    describe('when user already exists', () => {
        beforeEach(async () => {
            const user = await User.create({ name, surname, email, password: hash })

            userId = user._id.toString()
        })

        it('it should add a card to user data', async () => {
            await addUserCard(userId, number, holder, expirationDate, cvv)

            const user = await User.findById(userId)

            const { card } = user

            expect(card.number).to.equal(number)
            expect(card.holder).to.equal(holder)
            expect(card.expirationDate).to.be.instanceOf(Date)
            expect(card.cvv).to.equal(cvv)
        })

        it('should return an type error when synchronous error exists', () => {
            _userId = undefined
            expect(() => {
                addUserCard(_userId, number, holder, expirationDate, cvv)
            }).to.throw(TypeError, `${_userId} is not a string`)

            _userId = 123
            expect(() => {
                addUserCard(_userId, number, holder, expirationDate, cvv)
            }).to.throw(TypeError, `${_userId} is not a string`)

            _userId = true
            expect(() => {
                addUserCard(_userId, number, holder, expirationDate, cvv)
            }).to.throw(TypeError, `${_userId} is not a string`)

            _number = undefined
            expect(() => {
                addUserCard(userId, _number, holder, expirationDate, cvv)
            }).to.throw(TypeError, `${_number} is not a string`)

            _number = 123
            expect(() => {
                addUserCard(userId, _number, holder, expirationDate, cvv)
            }).to.throw(TypeError, `${_number} is not a string`)

            _number = true
            expect(() => {
                addUserCard(userId, _number, holder, expirationDate, cvv)
            }).to.throw(TypeError, `${_number} is not a string`)

            _holder = undefined
            expect(() => {
                addUserCard(userId, number, _holder, expirationDate, cvv)
            }).to.throw(TypeError, `${_holder} is not a string`)

            _holder = 123
            expect(() => {
                addUserCard(userId, number, _holder, expirationDate, cvv)
            }).to.throw(TypeError, `${_holder} is not a string`)

            _holder = true
            expect(() => {
                addUserCard(userId, number, _holder, expirationDate, cvv)
            }).to.throw(TypeError, `${_holder} is not a string`)

            _expirationDate = undefined
            expect(() => {
                addUserCard(userId, number, holder, _expirationDate, cvv)
            }).to.throw(TypeError, `${_expirationDate} is not a date`)

            _expirationDate = 123
            expect(() => {
                addUserCard(userId, number, holder, _expirationDate, cvv)
            }).to.throw(TypeError, `${_expirationDate} is not a date`)

            _expirationDate = true
            expect(() => {
                addUserCard(userId, number, holder, _expirationDate, cvv)
            }).to.throw(TypeError, `${_expirationDate} is not a date`)

            _cvv = undefined
            expect(() => {
                addUserCard(userId, number, holder, expirationDate, _cvv)
            }).to.throw(TypeError, `${_cvv} is not a string`)

            _cvv = 123
            expect(() => {
                addUserCard(userId, number, holder, expirationDate, _cvv)
            }).to.throw(TypeError, `${_cvv} is not a string`)

            _cvv = true
            expect(() => {
                addUserCard(userId, number, holder, expirationDate, _cvv)
            }).to.throw(TypeError, `${_cvv} is not a string`)

        })

        it('should return an error when synchronous error exists', () => {
            userId = ObjectId().toString()
            _userId = ''
            expect(() => {
                addUserCard(_userId, number, holder, expirationDate, cvv)
            }).to.throw(Error, 'string is empty or blank')

            _userId = '    '
            expect(() => {
                addUserCard(_userId, number, holder, expirationDate, cvv)
            }).to.throw(Error, 'string is empty or blank')

            _number = ''
            expect(() => {
                addUserCard(userId, _number, holder, expirationDate, cvv)
            }).to.throw(Error, 'string is empty or blank')

            _number = '    '
            expect(() => {
                addUserCard(userId, _number, holder, expirationDate, cvv)
            }).to.throw(Error, 'string is empty or blank')

            _holder = ''
            expect(() => {
                addUserCard(userId, number, _holder, expirationDate, cvv)
            }).to.throw(Error, 'string is empty or blank')

            _holder = '    '
            expect(() => {
                addUserCard(userId, number, _holder, expirationDate, cvv)
            }).to.throw(Error, 'string is empty or blank')

            _cvv = ''
            expect(() => {
                addUserCard(userId, number, holder, expirationDate, _cvv)
            }).to.throw(Error, 'string is empty or blank')

            _cvv = '    '
            expect(() => {
                addUserCard(userId, number, holder, expirationDate, _cvv)
            }).to.throw(Error, 'string is empty or blank')
        })
    })

    describe('when the user exist and card added', () => {
        beforeEach(async () => {
            const user = await User.create({ name, surname, email, password: hash, card: {number, holder, expirationDate, cvv} })
            
            userId = user._id.toString()
        })

        it('should modify the user card added before', async() => {
            _number = `${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}`
            _holder = `name-${random()} surname-${random()}`
            _expirationDate = new Date()
            _cvv = `${round(random() * 1000)}`

            await addUserCard(userId, _number, _holder, _expirationDate, _cvv)

            const user = await User.findById(userId)

            const { card } = user

            expect(card.number).to.equal(_number)
            expect(card.holder).to.equal(_holder)
            expect(card.expirationDate).to.be.instanceOf(Date)
            expect(card.cvv).to.equal(_cvv)
        })
    })

    it('should fail when the user does not exist', async () => {
        _userId = ObjectId().toString()

        try {
            await addUserCard(_userId, number, holder, expirationDate, cvv)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceOf(UnexistenceError)
            expect(error.message).to.equal(`user with id ${_userId} does not exist`)
        }
    })


    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})