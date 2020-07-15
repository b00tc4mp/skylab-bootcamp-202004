require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, TEST_API_URL: API_URL,SECRET } } = process

const toggleFollowing = require('./toggle-following')
const { random } = Math
const { expect } = require('chai')
require('books-commons/polyfills/json')
const { errors: { VoidError} } = require('books-commons')
const { mongoose, models: { User} } = require('books-data')
const {jwtPromised} = require('books-node-commons')
const bcrypt = require('bcryptjs')
global.fetch = require('node-fetch')
const context = require('./context')
const AsyncStorage = require('not-async-storage')

context.API_URL = API_URL
context.storage = AsyncStorage

describe('toogle-following', ()=>{
    let name,surname,email,password,encryptedPassword,userId;
    let secondName, secondSurname,secondEmail,secondPassword, secondEncryptedPassword,secondUserId;
    let token;

    before(async()=>{
        await Promise.all([
            mongoose.connect(MONGODB_URL,{useUnifiedTopology:true}),
            User.deleteMany()
        ])
    })


    beforeEach(async()=>{
        name =`name-${random()}`;
        surname =`surname-${random()}`;
        email =`email-${random()}@mail.com`;
        password =`password${random()}`;
        encryptedPassword = await bcrypt.hash(password,10);

        const user = await User.create({name,surname,email,password:encryptedPassword})
        userId = user.id;
        
        secondName =`name-${random()}`;
        secondSurname =`surname-${random()}`;
        secondEmail =`email-${random()}@mail.com`;
        secondPassword =`password${random()}`;
        secondEncryptedPassword = await bcrypt.hash(secondPassword,10);

        const secondUser = await User.create({name:secondName,surname:secondSurname,email:secondEmail,password:secondEncryptedPassword})
        secondUserId = secondUser.id;

        token = await jwtPromised.sign({ sub: userId}, SECRET);
        await context.storage.setItem('token',token)
    })

    it("should successfully to add following user",async()=>{
        await toggleFollowing(secondUserId)

        const user = await User.findById(userId)
        expect(user).to.exist
        expect(user.following.length).to.equal(1);

        user.following.forEach(following=>{
            expect(following.toString()).to.equal(secondUserId)
        })

        const secondUser = await User.findById(secondUserId)
        expect(secondUser).to.exist
        expect(secondUser.followers.length).to.equal(1);

        secondUser.followers.forEach(follower=>{
            expect(follower.toString()).to.equal(userId)
        })

    })

    it("should successfully to remove following user",async()=>{
        await toggleFollowing(secondUserId)
        await toggleFollowing(secondUserId)
    

        const user = await User.findById(userId)
        expect(user).to.exist
        expect(user.following.length).to.equal(0);

        const secondUser = await User.findById(secondUserId)
        expect(secondUser).to.exist
        expect(secondUser.followers.length).to.equal(0);
    })


    it('Sould fail to try toogle yourself', async () => {
      
        try {
            await toggleFollowing(userId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("you can`t follow yourself")
        }
    })
    it('Sould fail dont find userId', async () => {
        userId = '5edf984ec1be038dc909f783'

        const _token = await jwtPromised.sign({ sub: userId}, SECRET);
        await context.storage.setItem('token',_token)
        try {
            await toggleFollowing(secondUserId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }
    })

    it('Sould fail dont find secondUserId', async () => {
        secondUserId = '5edf984ec1be038dc909f783'

        try {
            await toggleFollowing(secondUserId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${secondUserId} does not exist`)
        }
    })

    it('should fail on non-string field', () => {
        expect(() => {
            toggleFollowing(true)
        }).to.throw(TypeError, 'true is not a string')
        expect(() => {
            toggleFollowing(123)
        }).to.throw(TypeError, '123 is not a string')
    })

    it('should fail on non-string field', () => {
        expect(() => {
            toggleFollowing('',secondUserId)
        }).to.throw(VoidError, 'string is empty or blank')
    })


    afterEach(async()=>{await User.deleteMany()})
    after (async() => {
        return await mongoose.disconnect();
    })

})
