require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, TEST_API_URL: API_URL,SECRET } } = process
const { random } = Math
const updateUser = require('./update-user')
const { expect } = require('chai')

require('books-commons/polyfills/json')

const { mongoose, models: { User } } = require('books-data')
const bcrypt = require('bcryptjs')
const {jwtPromised} = require('books-node-commons')
const { errors: { VoidError }} = require('books-commons')
global.fetch = require('node-fetch')
const context = require('./context')
const AsyncStorage = require('not-async-storage')

context.API_URL = API_URL
context.storage = AsyncStorage

describe("update-user", () => {
    let name, surname, email, password, encryptedPassword, userId,token;
    let _name,_surname,_email;


    before (async() => {
        await mongoose.connect(MONGODB_URL, {unifiedTopology: true});
        await User.deleteMany();
    })

    beforeEach(async() => {
        name = `name-${random()}`;
        surname = `surname-${random()}`;
        email = `email-${random()}@gmail.com`;
        password = `password-${random()}`;
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, surname, email, password: encryptedPassword });
        userId = user.id;
        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',token)

         _name = `name-${random()}`;
         _surname = `surname-${random()}`;
         _email = `email-${random()}@gmail.com`;
    })

    it("should succeed on update a user", async() => {

        const _name = `name-${random()}`;
        const _surname = `surname-${random()}`;
        const _email = `email-${random()}@gmail.com`;

        await updateUser(_name,_surname,_email,password)

        const user = await User.findById(userId)
  
        expect(user).to.exist
        expect(user.name).to.equal(_name)
        expect(user.surname).to.equal(_surname)
        expect(user.email).to.equal(_email)
    })

    it('Sould fail to update with wrong password', async () => {
      const _password = '123123123'
        try {
            await updateUser(_name,_surname,_email,_password)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal('The password is not valid')
        }
    })
    it('Sould fail to update with same email', async () => {
      
        try {
            await updateUser(_name,_surname,email,password)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal('this email already exist')
        }
    })

    it('Sould fail dont find second User', async () => {
        userId = '5edf984ec1be038dc909f783'
        const _token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',_token)
        try {
            await updateUser(_name,_surname,_email,password)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }
    })


    it('should fail on non-string field', () => {
        expect(() => {
            updateUser(123,_surname,_email,password)
        }).to.throw(TypeError, '123 is not a string')
        expect(() => {
            updateUser(_name,123,_email,password)
        }).to.throw(TypeError, '123 is not a string')
        expect(() => {
            updateUser(_name,_surname,123,password)
        }).to.throw(Error, '123 is not an e-mail')
        expect(() => {
            updateUser(_name,_surname,_email,true)
        }).to.throw(TypeError, 'true is not a string')
    })

    it('should fail on void-string field', () => {
        expect(() => {
            updateUser(_name,_surname,_email,'')
        }).to.throw(VoidError, 'string is empty or blank')

    })

    afterEach(async() => {
        await User.deleteMany()
    })

    after (async() => {
        await mongoose.disconnect();
    })
})