/**
 * @jest-environment node
 */

const bcrypt = require("bcryptjs")
const AsyncStorage = require("not-async-storage")
const { __context__, getFavourites } = require("../src/")
const jwt = require("jsonwebtoken")
const { random } = Math
const {
	mongoose,
	models: { Users, Stores },
} = require("gluttony-data")
const {
	TEST_MONGODB_URL: MONGODB_URL,
    TEST_API_URL: API_URL,
    SECRET: JWT_SECRET
} = require("../config")

__context__.storage = AsyncStorage
__context__.API_URL = API_URL
__context__.httpClient = require("axios")

describe("logic - get favourites", () => {
    beforeAll(async () => {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    let storeId, storeName, type, location, latitude, longitude, id, name, surname, email, password

    beforeEach(() => {
        storeId = `id-${random()}`
        storeName = `name-${random()}`
        type = `type-${random()}`
        location = `location-${random()}`
        latitude = random()
        longitude = random()
        id = `id-${random()}`
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
    })
    
    describe("when user exists", () => {
        beforeEach(async () => {
            const _password = await bcrypt.hash(password, 10);

            await Stores.create(
                new Stores({ id: storeId, name: storeName, type, location, coordinates: { latitude, longitude } })
            )

            await Users.create(
                new Users({ id, name, surname, email, password: _password, favouriteStores: [storeId] })
            );

            const _token = jwt.sign({ sub: id }, JWT_SECRET);
            await __context__.storage.setItem("token", _token);
        });

        it("should succeed on valid data and returning it", async () => {
            await getFavourites()
                .then(favourites => {
                    expect(favourites).toHaveLength(1)

                    const favourite = favourites[0]

                    expect(favourite.id).toBe(storeId)
                    expect(favourite.name).toBe(storeName)
                    expect(favourite.type).toBe(type)
                    expect(favourite.location).toBe(location)
                    expect(favourite.coordinates.latitude).toBe(latitude)
                    expect(favourite.coordinates.longitude).toBe(longitude)
                })
        })

        afterEach(async () => {
            await __context__.storage.clear()
            await Users.deleteOne({id})
            return await Stores.deleteOne({id: storeId})
        });
    });

    it("should fail on trying to get favourites without token", async () => {
        await getFavourites()
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