require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const { random } = Math
require("gluttony-commons/polyfills/json")
const { mongoose, models: { Users, Stores } } = require("gluttony-data")
const addFavourite = require('../src/add-favourite')
const getFavourites = require('../src/get-favourites')

describe("logic - get favourites", () => {
    beforeAll(() => mongoose.connect(MONGODB_URL))

    let storeId, name, type, location, latitude, longitude, userId

    beforeEach(async () => {
        storeId = `id-${random()}`
        name = `name-${random()}`
        type = `type-${random()}`
        location = `location-${random()}`
        latitude = random()
        longitude = random()
        userId = `id-${random()}`

        await Users.create({ 
                id: userId, 
                name: "name", 
                surname: "surname", 
                email: `e-${random()}@mail.com`,
                password: "password"
            })
            .then(() => Stores.create({ id: storeId, name, type, location, coordinates: { latitude, longitude } }))
    });

    it("should succeed when user has favourites", async () => {
        await addFavourite(storeId, userId)

        const favourites = await getFavourites(userId)

        expect(favourites).toHaveLength(1)

        const favourite = favourites[0]

        expect(favourite.id).toBe(storeId)
        expect(favourite.name).toBe(name)
        expect(favourite.type).toBe(type)
        expect(favourite.location).toBe(location)
        expect(favourite.coordinates.latitude).toBe(latitude)
        expect(favourite.coordinates.longitude).toBe(longitude)
    });

    it("should return empty array when user has no favourites", async () => {
        const favourites = await getFavourites(userId)

        expect(favourites).toHaveLength(0)
    });

    afterEach(() => {
        Users.deleteMany()
        Stores.deleteMany()
    });

    afterAll(mongoose.disconnect);
})