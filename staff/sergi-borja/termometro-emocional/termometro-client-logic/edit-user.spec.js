require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, JWT_SECRET: SECRET, TEST_API_URL: API_URL } } = process

const { random } = Math
const { expect } = require('chai')
require('termometro-commons/polyfills/json')
const { mongoose, models: { User } } = require('termometro-data')
require('termometro-commons/ponyfills/xhr')
const { utils: { jwtPromised } } = require('termometro-commons')
const context = require('./context')
const bcrypt = require('bcryptjs')
const editUser = require('./edit-user')

context.API_URL = API_URL

describe('logic - edit-member', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, hash, age, sex, location, token, memberId, admin, member
    let genderArray = ['M', 'F']

    beforeEach(async () => {
        await User.deleteMany()
        name = `name-${random()}`
        surname = `surname-${random()}`
        age = Math.floor(Math.random() * 100);
        sex = genderArray[Math.floor(genderArray.length * Math.random())];
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        location = 'Barcelona'

        hash = await bcrypt.hash(password, 10)
        admin = await User.create({ name, surname, age, sex, location, email, password: hash })

        name = `name-${random()}`
        surname = `surname-${random()}`
        age = Math.floor(Math.random() * 100);
        sex = genderArray[Math.floor(genderArray.length * Math.random())];
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        location = 'Barcelona'

        member = await User.create({ name, surname, age, sex, location, email, password, admin: admin.id })
        memberId = member.id
        admin.members.push(memberId)
        await admin.save()
    })

    it('should succeed on editing a member', async () => {

        let _name, _surname, _email, _age, _sex, _location;

        _name = `name-${random()}`
        _surname = `surname-${random()}`
        _age = Math.floor(Math.random() * 100);
        _sex = genderArray[Math.floor(genderArray.length * Math.random())];
        _email = `e-${random()}@mail.com`
        _location = 'Barcelona'

        await editUser(_name, _surname, _age, _sex, _location, _email, memberId)

        user = await User.findById(memberId)

        expect(user.name).to.equal(_name)
        expect(user.surname).to.equal(_surname)
        expect(user.age).to.equal(_age)
        expect(user.location).to.equal(_location)
        expect(user.email).to.equal(_email)

    })

    it('should throw error if email already exists', async () => {

        name = `name-${random()}`
        surname = `surname-${random()}`
        age = Math.floor(Math.random() * 100);
        sex = genderArray[Math.floor(genderArray.length * Math.random())];
        email = `e-${random()}@mail.com`
        location = 'Barcelona'

        user = await User.create({ name, surname, age, sex, location, email, password: hash })

        try {
            await editUser(name, surname, age, sex, location, user.email, memberId)
            throw new Error ('Should not reach this point')
        } catch (error) {
            expect(error.message).to.equal('Este email ya está en uso!')
        }
    })

    describe('when user does not exist', () => {
        let userId

        beforeEach(() => {
            userId = '5ed1204ee99ccf6fae798aef'
        })

        it('should fail when user does not exist', () =>
            editUser(name, surname, age, sex, location, email, userId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal('El usuario que quieres actualizar no existe')
                })
        )
    })

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)

})