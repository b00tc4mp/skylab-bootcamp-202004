require("dotenv").config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const addFavourite = require("../src/add-favourite")
const { random } = Math
require("gluttony-commons/polyfills/json")
const { mongoose, models: { Users, Stores } } = require("gluttony-data")

describe("logic - add favourite", () => {
    beforeAll(() => mongoose.connect(MONGODB_URL))

    let userId, storeId

    beforeEach(async () => {
        userId = `id-${random()}`
        storeId = `id-${random()}`

        await Users.create({ 
                id: userId, 
                name: "name", 
                surname: "surname", 
                email: `e-${random()}@mail.com`,
                password: "password" 
            })
            .then(() => Stores.create({ 
                id: storeId, 
                name: "name", 
                type: "bar", 
                location: "location", 
                coordinates: { 
                    latitude: random(), 
                    longitude: random() 
                } 
            }))
    });

    it("should succeed on valid data", async () => {
        await addFavourite(storeId, userId)
            .then(result => {
                expect(result).toBeUndefined()

                return Users.findById(userId, "favouriteStores").lean()
            })
            .then(user => user.favouriteStores)
            .then(favourites => {
                expect(favourites).toHaveLength(1)
                expect(favourites).toContain(storeId);
            })
    });

    it("should fail on trying to add favourite", async () => {
            
        try {
            await addFavourite(storeId, userId)
            
            await addFavourite(storeId, userId)
            
            throw new Error("should not reach this point")
        } catch (error) {
            expect(error).toBeDefined()

            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe(`${storeId} already exists`)
        }
    });

    afterEach(() => {
        Users.deleteMany()
        Stores.deleteMany()
    });

    afterAll(mongoose.disconnect);
})