/**
 * @jest-environment node
 */

const bcrypt = require("bcryptjs")
const AsyncStorage = require("not-async-storage")
const { __context__, postComment } = require("../src/")
const { random } = Math
const jwt = require("jsonwebtoken")
const {
	mongoose,
	models: { Users, Comments },
} = require("gluttony-data")
const {
	TEST_MONGODB_URL: MONGODB_URL,
    TEST_API_URL: API_URL,
    SECRET: JWT_SECRET
} = require("../config")

__context__.storage = AsyncStorage
__context__.API_URL = API_URL
__context__.httpClient = require("axios")

describe("logic - post comment", () => {
    beforeAll(async () => {
		await mongoose.connect(MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
    });

    let id, name, surname, email, password, text, storeId

    beforeEach(() => {
        id = `id-${random()}`
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        text = `text-${random()}`
        storeId = `id-${random()}`
    });
    
    describe("when user exists", () => {        
        beforeEach(async () => {
            const _password = await bcrypt.hash(password, 10);

            await Users.create(
                new Users({ id, name, surname, email, password: _password })
            );

            const _token = jwt.sign({ sub: id }, JWT_SECRET);
            await __context__.storage.setItem("token", _token);
        });

        it("should succeed on valid data", async () => {   
            await postComment(text, storeId)
                .then(async result => {
                    expect(result).toBeUndefined()
                    const comments = await Comments.find({ user: id }).exec()
                    expect(comments).toHaveLength(1)
                    const comment = comments[0]
                    expect(comment.text).toBe(text)
                    expect(comment.user).toBe(id)
                    expect(comment.store).toBe(storeId)
                })
        });

        it("should fail on posting a blank comment", async () => {
            text = undefined;
            try {
                await postComment(text, storeId)
                throw new Error("should not reach this point");
            } catch(error) {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toEqual("Comment is empty");
            }

            text = "";
            try {
                await postComment(text, storeId)
                throw new Error("should not reach this point");
            } catch(error) {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toEqual("Comment is empty");
            }
        });

        it("should fail on posting a comment on invalid storeId", async () => {
            storeId = undefined;
            try {
                await postComment(text, storeId)
                throw new Error("should not reach this point");
            } catch(error) {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toEqual("Store is not valid");
            }

            storeId = "";
            try {
                await postComment(text, storeId)
                throw new Error("should not reach this point");
            } catch(error) {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toEqual("Store is not valid");
            }
        });

        afterEach(async () => {
            await __context__.storage.clear()
            await Users.deleteOne({id})
            return await Comments.deleteMany({ user: id })
        });
    });

    it("should fail on trying to post a comment without token", async () => {
        await postComment(text, storeId)
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