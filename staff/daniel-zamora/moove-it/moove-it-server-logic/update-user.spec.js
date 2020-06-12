require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
const { mongoose, models: { User } } = require('moove-it-data')
const updateUser = require('./update-user')
const { random } = Math
const { expect } = require('chai')
const { UnexistenceError, CredentialsError, ForbiddenError } = require('moove-it-commons')


describe('logic - update user', () => {
    before(() =>
        mongoose.connect(MONGODB_URL).then(() => User.deleteMany())
    )

    let name, surname, email, password, validatePassword

    beforeEach(() => {

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        validatePassword = password
    })


    describe('when user already exists', () => {
        beforeEach(() => {
            const user = { name, surname, email, password }
            return User.create(user)
                .then(user => userId = user.id)
        })


        it('should succeed on correct credentials', async() => {

            let data = { name: "newName", surname: "newSurname" }

            await updateUser(userId, data)

            const user = await User.findById(userId)
            expect(user.name).to.equal("newName")
            expect(user.surname).to.equal("newSurname")
            expect(user.email).to.equal(email)
        })

        it('should succeed if user attempts to change password and oldPassword is correct', async() => {

            let data = { password: "123", oldPassword: password }

            await updateUser(userId, data)

            const user = await User.findById(userId)
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.password).to.equal('123')

        })

        it('should fail if user attempts to change password and no oldPassword', () => {
            let data = { password: "123" }

            expect(() => updateUser(userId, data)).to.throw(CredentialsError, 'Old password is required')

        })

        it('should fail if user attempts to change email', () => {
            let data = { email: "cambio@mail.com" }

            expect(() => updateUser(userId, data)).to.throw(ForbiddenError, "Email cannot be updated")

        })

        it('should fail when incorrect credencials are introduced', () => {
            try {
                updateUser(userId, 1)
                    .then(() => { throw new Error("Should not be here") })
            } catch (error) {
                expect(error).to.be.an.instanceOf(TypeError)

                expect(error.message).to.equal("1 is not an object")
            }

            try {
                updateUser(1, { name: "123" })
                    .then(() => { throw new Error("Should not be here") })
            } catch (error) {
                expect(error).to.be.an.instanceOf(TypeError)

                expect(error.message).to.equal("1 is not a string")
            }
        })
    })


    afterEach(() => User.deleteMany())
    after(() => mongoose.disconnect)
})