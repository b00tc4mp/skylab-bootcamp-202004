require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const unregisterAdmin = require('./unregister-admin')
const { random } = Math
const { expect } = require('chai')
require('commons/polyfills/json')
const { mongoose, models: { Admin } } = require('data')
const bcrypt = require('bcryptjs')
const { errors: { UnexistenceError, VoidError, CredentialsError } } = require('commons')

describe('logic - unregister admin', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let username, email, password, adminId, hash

    beforeEach(() =>
        Admin.deleteMany()
            .then(() => {
                username = `username-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`

                return bcrypt.hash(password, 10)
            })
            .then(_hash => hash = _hash)
    )

    describe('when admin already exists', () => {
        beforeEach(() =>
            Admin.create({ username, email, password: hash })
                .then(admin => adminId = admin.id)
        )

        it('should succeed on correct credentials', () =>
            (async ()=>{
                await unregisterAdmin(adminId, email, password)
                    
                const admin = await Admin.findOne({email})
                expect(admin).to.not.exist
            })()

        )

        it('should fail on wrong credentials', () => 
            (async ()=>{
                try{
                    await unregisterAdmin(adminId, email, 'wrong-' + password)
                    throw new Error('should not reach this point')
                }catch(error){
                    expect(error).to.be.an.instanceof(CredentialsError)
                        
                    expect(error.message).to.equal(`wrong password`)
                }

                try{
                    await unregisterAdmin(adminId, 'wrong-' + email, password)
                    throw new Error('should not reach this point')
                }catch(error){
                    expect(error).to.be.an.instanceof(CredentialsError)
                        
                    expect(error.message).to.equal(`wrong email`)
                }

            })()
        )
    })

    it('should fail when admin does not exist', () =>
        unregisterAdmin( "5edfd817d242780ac65bc59c",email, password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.an.instanceof(UnexistenceError)
                expect(error.message).to.equal(`admin with id 5edfd817d242780ac65bc59c does not exist`)
            })
    )

    it('should fail when inputs with incorrect format are introduced', async () => {

        try {
            unregisterAdmin("",  email, password)

        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(VoidError)
            expect(error.message).to.equal(`string is empty or blank`)
        }

        try {
            unregisterAdmin("5edfd817d242780ac65bc59c",  "", password)

        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(VoidError)
            expect(error.message).to.equal(`string is empty or blank`)
        }

        try {
            unregisterAdmin("5edfd817d242780ac65bc59c",  email, "")

        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(VoidError)
            expect(error.message).to.equal(`string is empty or blank`)
        }

        try {
            unregisterAdmin(["5edfd817d242780ac65bc59c"],  email, password)

        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`5edfd817d242780ac65bc59c is not a string`)
        }

        try {
            unregisterAdmin("5edfd817d242780ac65bc59c",  [""], password)

        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(` is not a string`)
        }

        try {
            unregisterAdmin("5edfd817d242780ac65bc59c",  email, [""])

        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(` is not a string`)
        }
    })

    afterEach(() => Admin.deleteMany())

    after(mongoose.disconnect)
})