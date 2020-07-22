/**
 * @jest-environment node
 */

const bcrypt = require("bcryptjs")
const AsyncStorage = require("not-async-storage")
const { __context__, removeFavourite } = require("../src/")
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

describe("logic - remove favourite", () => {
    beforeAll(async () => {
		await mongoose.connect(MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
    });

    let id, name, surname, email, password, storeId

    beforeEach(() => {
        id = `id-${random()}`
        name = `name-${random()}`
		surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        storeId = `id-${random()}`
    })
    
    describe("when user exists", () => {        
        beforeEach(async () => {
            const _password = await bcrypt.hash(password, 10);

            await Users.create(
                new Users({ id, name, surname, email, password: _password, favouriteStores: [storeId] })
            );

            const _token = jwt.sign({ sub: id }, JWT_SECRET);
            await __context__.storage.setItem("token", _token);
        });

        it("should succeed on valid data", async () => {   
            await removeFavourite(storeId)
                .then(async result => {
                    expect(result).toBeUndefined()
                    
                    const user = await Users.findById(id)
                    expect(user.favouriteStores).toHaveLength(0)
                })
        });

        afterEach(async () => {
            await __context__.storage.clear()
            return await Users.deleteOne({id})
        });
    });

    it("should fail on trying to remove favourite without token", async () => {
        await removeFavourite(storeId)
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