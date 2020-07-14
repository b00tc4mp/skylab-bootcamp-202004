require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const retrieveUserCard = require('./retrieve-user-card')
const { random, round } = Math
const { expect } = require('chai')
const { mongoose, models: { User } } = require('gym-data')

describe('logic - retrieveUserCard', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let name, surname, email, password, userId, card

    beforeEach(async () => {
        await User.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        card = {
            number: `${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}-${round(random() * 10000)}`,
            holder: `name-${random()} surname-${random()}`,
            expirationDate: new Date(),
            cvv: `${round(random() * 1000)}`,

        }
    })

    describe('when user already exist', () => {
        beforeEach(async () => {
            const user = await User.create({ name, surname, email, password, card })
            userId = user._id.toString()
        })

        it('should return the user data', async () => {
            const result = await retrieveUserCard(userId)

            const { number, holder, expirationDate, cvv } = result

            expect(number).to.equal(card.number)
            expect(holder).to.equal(card.holder)
            expect(expirationDate).to.be.an.instanceOf(Date)
            expect(cvv).to.be.equal(undefined)
        })
        it('should fail when user does not exists', async () => {
            userId = '123455678990'
            try {
                await retrieveUserCard(userId)
    
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.exist
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.equal(`user with id ${userId} does not exist`)
            }
    
        })
        it('should fail when the card is not added', async () => {
            await User.updateOne({ _id: userId }, { $unset: { card } })
    
            try {
                await retrieveUserCard(userId)
    
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.exist
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.equal('user does not have a card added')
            }
        })
    })


    it('should return a type error', () => {
        userId = undefined
        expect(() => {
            retrieveUserCard(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = 123
        expect(() => {
            retrieveUserCard(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = true
        expect(() => {
            retrieveUserCard(userId)
        }).to.throw(TypeError, `${userId} is not a string`)
    })

    it('should return an error', () => {
        userId = ''
        expect(() => {
            retrieveUserCard(userId)
        }).to.throw(Error, 'string is empty or blank')

        userId = '    '
        expect(() => {
            retrieveUserCard(userId)
        }).to.throw(Error, 'string is empty or blank')
    })

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})