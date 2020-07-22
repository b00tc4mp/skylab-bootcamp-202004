/**
 * @jest-environment node
 */

const bcrypt = require("bcryptjs")
const AsyncStorage = require("not-async-storage")
const { __context__, getUserComments } = require("../src/")
const jwt = require("jsonwebtoken")
const { random } = Math
const {
	mongoose,
	models: { Users, Comments, Stores },
} = require("gluttony-data")
const {
	TEST_MONGODB_URL: MONGODB_URL,
    TEST_API_URL: API_URL,
    SECRET: JWT_SECRET
} = require("../config")

__context__.storage = AsyncStorage
__context__.API_URL = API_URL
__context__.httpClient = require("axios")

describe("logic - get user comments", () => {
    beforeAll(async () => {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    let commentId, text, creationDate, storeId, storeName, type, location, latitude, longitude, id, name, surname, email, password

    beforeEach(() => {
        commentId = `id-${random()}`
        text = `text-${random()}`
        creationDate = Date.now()
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

            await Comments.create(
                new Comments({ id: commentId, text, creationDate, user: id, store: storeId })
            )

            await Stores.create(
                new Stores({ id: storeId, name: storeName, type, location, coordinates: { latitude, longitude } })
            )

            await Users.create(
                new Users({ id, name, surname, email, password: _password })
            );

            const _token = jwt.sign({ sub: id }, JWT_SECRET);
            await __context__.storage.setItem("token", _token);
        });

        it("should succeed on valid data and returning it", async () => {
            await getUserComments()
                .then(comments => {
                    expect(comments).toHaveLength(1)
                    const comment = comments[0]
                    expect(comment.text).toBe(text)
                    expect(comment.user).toBe(id)
                    expect(comment.id).toBe(commentId)
                    expect(Date.parse(comment.creationDate)).toEqual(creationDate)
                    expect(comment.store.id).toBe(storeId)
                    expect(comment.store.name).toBe(storeName)
                    expect(comment.store.type).toBe(type)
                    expect(comment.store.location).toBe(location)
                    expect(comment.store.coordinates.latitude).toBe(latitude)
                    expect(comment.store.coordinates.longitude).toBe(longitude)
                })
        });

        afterEach(async () => {
            await __context__.storage.clear()
            await Users.deleteOne({id})
            return await Comments.deleteMany({ user: id })
        });
    });

    it("should fail on trying to get comments without token", async () => {
        await getUserComments()
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