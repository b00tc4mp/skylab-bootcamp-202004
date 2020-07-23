/**
 * @jest-environment node
 */

const AsyncStorage = require("not-async-storage")
const { __context__, registerUser } = require("../src/")
const { random } = Math
const {
	mongoose,
	models: { Users },
} = require("gluttony-data")
const {
	TEST_MONGODB_URL: MONGODB_URL,
	TEST_API_URL: API_URL,
} = require("../config")

__context__.storage = AsyncStorage
__context__.API_URL = API_URL
__context__.httpClient = require("axios")

describe("logic - register user", () => {
    beforeAll(async () => {
		await mongoose.connect(MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
    });
    
    let name, surname, email, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
    });

    it("should succeed on valid data", async () => {
        await registerUser(name, surname, email, password)
            .then(async result => {
                expect(result).toBeUndefined()
                const user = await Users.findOne({ email }).exec()
                expect(user._id).toBeDefined()
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)
                expect(user.password).toBeDefined()
                expect(user.password).not.toBe(password)
            })
    });

    it("should fail on non-string name", async () => {
        name = undefined 
        try {
            await registerUser(name, surname, email, password)
            throw new Error("should not reach this point");
        } catch(error) {
            expect(error).toBeInstanceOf(Error);
			expect(error.message).toEqual("Name is empty");
        }

        name = "";
        try {
            await registerUser(name, surname, email, password)
            throw new Error("should not reach this point");
        } catch(error) {
            expect(error).toBeInstanceOf(Error);
			expect(error.message).toEqual("Name is empty");
        }
    });
    
    it("should fail on non-string surname", async () => {
        surname = undefined; 
        try {
            await registerUser(name, surname, email, password)
            throw new Error("should not reach this point");
        } catch(error) {
            expect(error).toBeInstanceOf(Error);
			expect(error.message).toEqual("Surname is empty");
        }

        surname = "";
        try {
            await registerUser(name, surname, email, password)
            throw new Error("should not reach this point");
        } catch(error) {
            expect(error).toBeInstanceOf(Error);
			expect(error.message).toEqual("Surname is empty");
        }
    });

    it("should fail on non-email email", async () => {
        email = undefined; 
        try {
            await registerUser(name, surname, email, password)
            throw new Error("should not reach this point");
        } catch(error) {
            expect(error).toBeInstanceOf(Error);
			expect(error.message).toEqual(`'${email}' is not an e-mail`);
        }

        email = "";
        try {
            await registerUser(name, surname, email, password)
            throw new Error("should not reach this point");
        } catch(error) {
            expect(error).toBeInstanceOf(Error);
			expect(error.message).toEqual(`'${email}' is not an e-mail`);
        }

        email = "email";
        try {
            await registerUser(name, surname, email, password)
            throw new Error("should not reach this point");
        } catch(error) {
            expect(error).toBeInstanceOf(Error);
			expect(error.message).toEqual(`'${email}' is not an e-mail`);
        }
    });

    it("should fail on non-string password", async () => {
        password = undefined; 
        try {
            await registerUser(name, surname, email, password)
            throw new Error("should not reach this point");
        } catch(error) {
            expect(error).toBeInstanceOf(Error);
			expect(error.message).toEqual("Password should be at least 8 characters long");
        }

        password = "";
        try {
            await registerUser(name, surname, email, password)
            throw new Error("should not reach this point");
        } catch(error) {
            expect(error).toBeInstanceOf(Error);
			expect(error.message).toEqual("Password should be at least 8 characters long");
        }
    });
    
    afterAll(async () => {
		return await mongoose.disconnect();
	});
})