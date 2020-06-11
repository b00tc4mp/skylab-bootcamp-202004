require('dotenv').config();

const{env : {MONGODB_URL_TEST: MONGODB_URL}} = process;
const {random} = Math;
const {expect} = require('chai');
const toggleFollowing = require('./toggle-following');
const { errors: { VoidError} } = require('books-commons')
const {mongoose, models:{User}} = require('books-data');
const bcrypt = require('bcryptjs');

describe('toogle-following', ()=>{
    let name,surname,email,password,encryptedPassword,userId;
    let secondName, secondSurname,secondEmail,secondPassword, secondEncryptedPassword,secondUserId;
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
    })

    it("should successfully to add following user",async()=>{
        await toggleFollowing(userId,secondUserId)

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
        await toggleFollowing(userId,secondUserId)
        await toggleFollowing(userId,secondUserId)
    

        const user = await User.findById(userId)
        expect(user).to.exist
        expect(user.following.length).to.equal(0);

        const secondUser = await User.findById(secondUserId)
        expect(secondUser).to.exist
        expect(secondUser.followers.length).to.equal(0);
    })


    it('Sould fail to try toogle yourself', async () => {
      
        try {
            await toggleFollowing(userId,userId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("you can`t follow yourself")
        }
    })
    it('Sould fail dont find userId', async () => {
        userId = '5edf984ec1be038dc909f783'
        try {
            await toggleFollowing(userId,secondUserId)
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
            await toggleFollowing(userId,secondUserId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${secondUserId} does not exist`)
        }
    })

    it('should fail on non-string field', () => {
        expect(() => {
            toggleFollowing(true,secondUserId)
        }).to.throw(TypeError, 'true is not a string')
        expect(() => {
            toggleFollowing(userId,123)
        }).to.throw(TypeError, '123 is not a string')
    })

    it('should fail on non-string field', () => {
      
        expect(() => {
            toggleFollowing('',secondUserId)
        }).to.throw(VoidError, 'string is empty or blank')
        expect(() => {
            toggleFollowing(userId,'')
        }).to.throw(VoidError, 'string is empty or blank')
    })


    afterEach(async()=>{await User.deleteMany()})
    after (async() => {
        return await mongoose.disconnect();
    })

})
