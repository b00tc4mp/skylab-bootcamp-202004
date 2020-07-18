/**
 * @jest-environment node
 */

const bcrypt = require("bcryptjs")
const AsyncStorage = require("not-async-storage")
const { __context__, authenticateUser } = require("../src/")
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

describe("logic - authenticate user", () => {
    beforeAll(async () => {
		await mongoose.connect(MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	});

    let id, name, surname, email, password

    beforeEach(() => {
        id = `id-${random()}`
        name = `name-${random()}`
		surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
    });

    describe("when user already exists", () => {
		beforeEach(async () => {
			const _password = await bcrypt.hash(password, 10);

			await Users.create(
				new Users({ id, name, surname, email, password: _password })
			);
        });

        it("should succeed on correct credentials", async () => {
            const returnValue = await authenticateUser(email, password);

			const token = await __context__.storage.getItem("token");

			const [header, payload, signature] = token.split(".");

			expect(returnValue).toBeUndefined();
			expect(header.length).toBeGreaterThan(0);
			expect(payload.length).toBeGreaterThan(0);
			expect(signature.length).toBeGreaterThan(0);
        });

        it("should fail on incorrect password", async () => {
			password = `${password}-wrong`;
			try {
				await authenticateUser(email, password);
				throw new Error("should not reach this point");
			} catch (error) {
				expect(error).toBeInstanceOf(Error);
				expect(error.message).toEqual("Email or password is not valid");
			}
        });
        
        it("should fail on incorrect email", async () => {
			email = `wrong-${email}`;
			try {
				await authenticateUser(email, password);
				throw new Error("should not reach this point");
			} catch (error) {
				expect(error).toBeInstanceOf(Error);
				expect(error.message).toEqual("Email or password is not valid");
			}
        });
        
        afterEach(async () => {
            return await Users.deleteOne({id})
        });
    });

    it("should fail on non-string password", async () => {
        password = undefined; 
        try {
            await authenticateUser(email, password)
            throw new Error("should not reach this point");
        } catch(error) {
            expect(error).toBeInstanceOf(Error);
			expect(error.message).toEqual("Password is empty");
        }

        password = "";
        try {
            await authenticateUser(email, password)
            throw new Error("should not reach this point");
        } catch(error) {
            expect(error).toBeInstanceOf(Error);
			expect(error.message).toEqual("Password is empty");
        }
    });
    
    it("should fail on non-email email", async () => {
        email = undefined; 
        try {
            await authenticateUser(email, password)
            throw new Error("should not reach this point");
        } catch(error) {
            expect(error).toBeInstanceOf(Error);
			expect(error.message).toEqual(`'${email}' is not an e-mail`);
        }

        email = "";
        try {
            await authenticateUser(email, password)
            throw new Error("should not reach this point");
        } catch(error) {
            expect(error).toBeInstanceOf(Error);
			expect(error.message).toEqual(`'${email}' is not an e-mail`);
        }

        email = "email";
        try {
            await authenticateUser(email, password)
            throw new Error("should not reach this point");
        } catch(error) {
            expect(error).toBeInstanceOf(Error);
			expect(error.message).toEqual(`'${email}' is not an e-mail`);
        }
	});

	afterAll(async () => {
		return await mongoose.disconnect()
	});
})