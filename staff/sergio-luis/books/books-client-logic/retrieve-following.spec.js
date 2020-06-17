require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, TEST_API_URL: API_URL,SECRET } } = process

const retrieveFollowing = require('./retrieve-following')
const { random } = Math
const { expect } = require('chai')
require('books-commons/polyfills/json')
const { errors: { VoidError} } = require('books-commons')
const {jwtPromised} = require('books-node-commons')
const { mongoose, models: { User } } = require('books-data')
const bcrypt = require('bcryptjs')
global.fetch = require('node-fetch')
const context = require('./context')
const AsyncStorage = require('not-async-storage')

context.API_URL = API_URL
context.storage = AsyncStorage

describe("client-logic-retrieveFollowing", () => {
    let name, surname, email, password, encryptedPassword, userId,token;

    before(async() => {
        await mongoose.connect(MONGODB_URL, { useUnifiedTopology: true });
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

        for (let i = 0; i < 10; i++) {
            let name, surname, email, password, encryptedPassword, _userId;
            name = `name-${i}`;
            surname = `surname-${i}`;
            email = `email-${i}@gmail.com`;
            password = `password-${i}`;
            encryptedPassword = await bcrypt.hash(password, 10);

            const _user = await User.create({ name, surname, email, password: encryptedPassword })
            _userId = _user.id

            await User.findByIdAndUpdate(userId, { $addToSet: { following: _userId } });
            await User.findByIdAndUpdate(_userId, { $addToSet: { followers: userId } });
        }

        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',token)
    })

    

    it("should successfully retrieve all users following an specific user", async() => {
        const users = await retrieveFollowing(token);

        expect(users).to.exist;
        expect(users).to.be.instanceof(Array);
        expect(users.length).to.equal(10);
    })


    it('Sould fail dont find userId', async () => {
        userId = '5edf984ec1be038dc909f783'

        const _token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',_token)
        try {
            await retrieveFollowing(_token)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }
    })

    afterEach(async()=>{await User.deleteMany()})

    after (async() => {
        return await mongoose.disconnect();
    })

})