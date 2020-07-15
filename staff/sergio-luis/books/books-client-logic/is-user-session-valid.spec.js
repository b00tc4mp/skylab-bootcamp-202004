require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, TEST_API_URL: API_URL,SECRET } } = process

const isUserSessioinValid = require('./is-user-session-valid')
const { random } = Math
const { expect } = require('chai')
require('books-commons/polyfills/json')
const {jwtPromised} = require('books-node-commons')
const { mongoose, models: { User } } = require('books-data')
const bcrypt = require('bcryptjs')
global.fetch = require('node-fetch')
const context = require('./context')
const AsyncStorage = require('not-async-storage')

context.API_URL = API_URL
context.storage = AsyncStorage

describe("client-logic-is-user-session-valid", () => {
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

        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',token)
    })

    

    it("should successfully have token", async() => {

       const result = await isUserSessioinValid()

        expect(result).to.be.true;

    })

    it("should successfully on no have token", async() => {
        await context.storage.removeItem('token')

        const result = await isUserSessioinValid()

        expect(result).to.be.false;

    })


    afterEach(async()=>{await User.deleteMany()})

    after (async() => {
        return await mongoose.disconnect();
    })

})