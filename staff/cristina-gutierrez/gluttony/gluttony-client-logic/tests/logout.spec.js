/**
 * @jest-environment node
 */

const AsyncStorage = require("not-async-storage")
const { __context__, logout} = require("../src/")
const { random } = Math

__context__.storage = AsyncStorage

describe("logic - logout", () => {
    let token

    beforeEach(() => {
        token = `token-${random()}`
        __context__.storage.setItem("token", token)
    });

    it("should succeed on logging out", () => {
       logout().then(async result => {
            expect(result).toBeUndefined()

            const token = await __context__.storage.getItem("token")

            expect(token).toBeUndefined()
        })
    });
})