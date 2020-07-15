require('dotenv').config();
const { env: { TEST_MONGODB_URL: MONGODB_URL }} = process;
const { DuplicityError, UnexistenceError, VoidError } = require('plates-commons/errors');
const bcrypt = require('bcryptjs');
const { floor, random } = Math;
const {expect} = require('chai');
const { mongoose, models: {User, Restaurant } } = require('plates-data');
const registerUser = require('./register-user')
require('plates-commons/utils/call')

describe("registerUser", () => {
    let name, surname, email, password, userId;
    
    before(async() => {
        await mongoose.connect(MONGODB_URL);
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany()
        ]);
    })

    beforeEach(() => {
        name = `name-${random()}`;
        surname = `surname-${random()}`;
        email = `email-${random()}@gmail.com`;
        password = `password-${random()}`;
    })

    it("should succeed to register a new user on correct data", async() => {
       
        const result = await registerUser(name, surname, email, password);

        expect(result).to.be.undefined;

        const user = await User.findOne({name, surname, email});
        expect(user).to.exist;
        expect(user).to.be.instanceof(Object);
        expect(user.name).to.equal(name);
        expect(user.surname).to.equal(surname);
        expect(user.email).to.equal(email);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        expect(isPasswordValid).to.be.true;
    })

    it("should fail to register a user if the user already exists", async() => {
        await registerUser(name, surname, email, password)

        let _error;

        try {
            await registerUser(name, surname, email, password)
        } catch(error) {
            _error= error;
        }

        expect(_error).to.exist;
        expect(_error).to.be.instanceof(DuplicityError);
        expect(_error.message).to.equal(`User with e-mail: ${email}, already exists`)
    })

    it('should fail to register a new user with wrong data', () => {
         name = ''
         
        expect(() => registerUser(name,surname,email, password)).to.throw(VoidError, `string is empty or blank`)

        name = 'pepito'
        email = '0.patatero'

        expect(() => registerUser(name,surname,email, password)).to.throw(Error, `${email} is not an e-mail`)
        
        name = `name-${random()}`;
        email = `email-${random()}@gmail.com`;
        password = '';

        expect(() => registerUser(name,surname,email, password)).to.throw(Error, `string is empty or blank`)

        name = `name-${random()}`;
        surname = '';
        email = `email-${random()}@gmail.com`;
        password = `password-${random()}`;

        expect(() => registerUser(name,surname,email, password)).to.throw(Error, `string is empty or blank`)


    })

    afterEach(async() => {
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany()
        ]);
    })

    after(async() => {
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany()
        ]);
        await mongoose.disconnect();
    })
})