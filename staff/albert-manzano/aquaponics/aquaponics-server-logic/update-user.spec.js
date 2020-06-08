require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const updateUser = require('./update-user')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('aquaponics-data')

describe('logic-updateUser', () => {
    let users

    before(() =>
        mongo.connect(MONGODB_URL_TEST)
            .then(connection => users = connection.db().collection('users'))
    )

    let name, surname, email, password, userId, _name, _surname

    beforeEach(() =>
        users.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
            })
    )

    describe('when user already exist', () => {
        beforeEach(() => {
            const user = { name, surname, email, password }

            return users.insertOne(user)
                .then(result => userId = result.insertedId.toString())
        })

        it('should update the user data', () => {
            _name = `name-${random()}`
            _surname = `surname-${random()}`

            const newUser = { name: _name, surname: _surname, email, password }

            return updateUser(userId, newUser)
                .then(() => users.find().toArray())
                .then(results => {
                    expect(results).to.have.lengthOf(1)

                    const [user] = results

                    expect(user.name).to.equal(_name)
                    expect(user.surname).to.equal(_surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                })
        })
    })

    it('should fail when user does not exist', () => {
        return updateUser(userId, { name, surname, email, password })
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
            })

    })

    afterEach(() => users.deleteMany())

    after(() => users.deleteMany().then(mongo.disconnect))
})