require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process


const registerCohousing = require('./register-cohousing')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { User, Cohousing } } = require('coohappy-data')
const bcrypt = require('bcryptjs')
const { errors: { DuplicityError, UnexistenceError } } = require('coohappy-commons')

describe.only('logic - register cohousing', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, hash, street, number, city

    beforeEach(() =>
        Promise.all(
            [User.deleteMany(),
            Cohousing.deleteMany()
            ])

            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `email-@${random()}.com`
                password = `password-${random()}`

                nameCohousing = `name-${random()}`
                street = `street-${random()}`
                number = random()
                city = `city-${random()}`

                return bcrypt.hash(password, 10)
            })
            .then(_hash => hash = _hash)
            .then(() =>
                User.create({ name, surname, email, password: hash })
            )
            .then(user => { userId = user.id })
    )

    describe('when user does not create any coohousing', () => {

        it('should succeed on valid data', () =>
            registerCohousing(nameCohousing, { street, number, city }, userId)
                .then(() => {
                    Cohousing.findOne({ author: userId })
                        .then(cohousing => {
                            expect(cohousing).to.exist
                            expect(cohousing.author.toString()).to.equal(userId.toString())
                            expect(cohousing.name.toString()).to.equal(nameCohousing)
                            expect(cohousing.address.street.toString()).to.equal(street)
                            expect(cohousing.address.number).to.equal(number)
                            expect(cohousing.address.city.toString()).to.equal(city)
                        }
                        )
                }
                )
        )
    })

    describe('when user already create any coohousing', () => {

        it('should succeed on valid data', () =>

            registerCohousing(nameCohousing, { street, number, city }, userId)
                .then(() => registerCohousing(nameCohousing, { street, number, city }, userId))

                .catch(error => {
                    expect(error).to.be.an.instanceOf(DuplicityError)
                    expect(error.message).to.equal(`user: ${name} ${surname} already create an cohousing`)
                })
        )
    })

    describe('when user already create any coohousing', () => {

        it('should throw an error when user already creates an cohousing', () =>

            registerCohousing(nameCohousing, { street, number, city }, userId)
                .then(() => registerCohousing(nameCohousing, { street, number, city }, userId))

                .catch(error => {
                    expect(error).to.be.an.instanceOf(DuplicityError)
                    expect(error.message).to.equal(`user: ${name} ${surname} already create an cohousing`)
                })
        )
    })

    describe('when user does not exist', () => {

        beforeEach(() => User.deleteMany())
        it('should throw an error when user does not exist', async () => {
            try {
                await registerCohousing(nameCohousing, { street, number, city }, userId)
                throw new Error('should not reach this point')

            } catch (error) {

                expect(error).to.be.an.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`user does not exists`)
            }
        })
    })
    describe('sync errors', () => {
        it('should throw error on wrong data', () => {

            expect(()=> registerCohousing(2, { street, number, city }, userId)).to.throw(TypeError, '2 is not a string')
            expect(()=> registerCohousing(nameCohousing, name, userId)).to.throw(TypeError, `${name} is not an object`)
            expect(()=> registerCohousing(nameCohousing, { street, number, city }, undefined)).to.throw(TypeError, `${undefined} is not a string`)

        })
    })


    afterEach(() => Promise.all([User.deleteMany(), Cohousing.deleteMany()]))

    after(mongoose.disconnect)
})