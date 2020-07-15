require('dotenv').config();

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process;
const {  random } = Math;
const { expect } = require('chai');
const retrieveFollowing = require('./retrieve-following');
const { errors: { VoidError} } = require('books-commons')
const { mongoose, models: { User } } = require('books-data');
const bcrypt = require('bcryptjs');

describe("retrieveFollowing", () => {
    let name, surname, email, password, encryptedPassword, userId;
    let secondName, secondSurname, secondEmail, secondPassword, secondEncryptedPassword, secondUserId;

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
    })

    

    it("should successfully retrieve all users following an specific user", async() => {
        const users = await retrieveFollowing(userId);
        expect(users).to.exist;
        expect(users).to.be.instanceof(Array);
        expect(users.length).to.equal(10);
    })


    it('Sould fail dont find userId', async () => {
        userId = '5edf984ec1be038dc909f783'
        try {
            await retrieveFollowing(userId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }
    })


    // this test dont pass - we retrieve the followers in logic
    // it('Sould fail on no have any following', async () => {
    //     await User.findByIdAndUpdate(userId, { $set: { following:[] } })

    //     const user = await User.findById(userId)
        
    //     try {
    //         await retrieveFollowing(userId)
    //         throw new Error('should not reach this point')
    //     } catch (error) {
    //         expect(error).to.exist
    //         expect(error).to.be.an.instanceof(Error)
    //         expect(error.message).to.equal("you don`t have any users following")
    //     }
    // })

    it('should fail on non-string field', () => {
        expect(() => {
            retrieveFollowing(true)
        }).to.throw(TypeError, 'true is not a string')
        expect(() => {
            retrieveFollowing(123)
        }).to.throw(TypeError, '123 is not a string')
    })

    it('should fail on non-string field', () => {
      
        expect(() => {
            retrieveFollowing('')
        }).to.throw(VoidError, 'string is empty or blank')
    })


    afterEach(async()=>{await User.deleteMany()})
    after (async() => {
        return await mongoose.disconnect();
    })

})