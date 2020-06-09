require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process


const retrieveCohousing = require('./retrieve-cohousing')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { User, Cohousing } } = require('coohappy-data')
const bcrypt = require('bcryptjs')
const { errors: { DuplicityError, UnexistenceError } } = require('coohappy-commons')
const { utils: { randomAccessCode } } = require('coohappy-commons')

describe('logic - retrieve cohousing', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, hash, street, number, city, cohousingId, accesCode

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
                accessCode = randomAccessCode(name)

                return bcrypt.hash(password, 10)
            })
            .then(_hash => hash = _hash)
            .then(() => User.create({ name, surname, email, password: hash })
            )
            .then(user => {
                userId = user.id
                let address = { street, number, city }
                return Cohousing.create({ name: nameCohousing, address, author: userId, accessCode, members: [userId] })
            })
            .then(cohousing => {
                cohousingId = cohousing._id.toString()
            })
    )

    describe('when cohousing exist', () => {

        it('should succeed on valid cohousingId', () =>
            retrieveCohousing(userId)
                .then((cohousing) => {

                    expect(cohousing).to.exist
                    expect(cohousing.author.toString()).to.equal(userId.toString())
                    expect(cohousing.name.toString()).to.equal(nameCohousing)
                    expect(cohousing.address.street.toString()).to.equal(street)
                    expect(cohousing.address.number).to.equal(number)
                    expect(cohousing.address.city.toString()).to.equal(city)
                }
                )
        )
    })

    describe('when coohousing does not exist', () => {

        it('should fail on innexitence cohousing', async () => {
            let cohousing
            await Cohousing.deleteMany()
            try {
                cohousing = await retrieveCohousing(userId)

            } catch (error) {

                expect(cohousing).to.be.undefined
                expect(error).to.exist
                expect(error.message).to.equal(`cohousing of user with id ${userId} does not exist`)

            }
        })
    })
    
    describe('sync errors', () => {
        it('should throw error on wrong type', () => {

            expect(()=> retrieveCohousing(2)).to.throw(TypeError, '2 is not a string')
            expect(()=> retrieveCohousing(true)).to.throw(TypeError, 'true is not a string')
            expect(()=> retrieveCohousing(undefined)).to.throw(TypeError, 'undefined is not a string')
           
        })
    })


    afterEach(() => Promise.all([User.deleteMany(), Cohousing.deleteMany()]))

    after(mongoose.disconnect)
})