/**
 * @jest-environment node
 */

const bcrypt = require("bcryptjs")
const AsyncStorage = require("not-async-storage")
const { __context__, retrieveUser } = require("../src/")
const jwt = require("jsonwebtoken")
const { random } = Math
const {
	mongoose,
	models: { Users },
} = require("gluttony-data")
const {
	TEST_MONGODB_URL: MONGODB_URL,
    TEST_API_URL: API_URL,
    SECRET: JWT_SECRET
} = require("../config")

__context__.storage = AsyncStorage
__context__.API_URL = API_URL
__context__.httpClient = require("axios")

describe("logic - retrieve user", () => {
    beforeAll(async () => {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });
    
    describe("when user exists", () => {
        let id, name, surname, email, password

        beforeEach(async () => {
            id = `id-${random()}`
            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`

            const _password = await bcrypt.hash(password, 10);

            await Users.create(
                new Users({ id, name, surname, email, password: _password })
            );

            const _token = jwt.sign({ sub: id }, JWT_SECRET);
            await __context__.storage.setItem("token", _token);
        });

        it("should succeed on valid data and returning it", async () => {
            const user = await retrieveUser();
    
            expect(user.id).toBe(id);
            expect(user.name).toBe(name);
            expect(user.surname).toBe(surname);
            expect(user.email).toBe(email);
            expect(user.password).toBeUndefined();
        })

        afterEach(async () => {
            await __context__.storage.clear()
            return await Users.deleteOne({id})
        });
    });

    it("should fail on trying to retrieve user", async () => {
        await retrieveUser()
            .then(() => { throw new Error("should not reach this point") })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe("User is not authenticated")
            })
    });

    afterAll(async () => {
		return await mongoose.disconnect()
	});
})