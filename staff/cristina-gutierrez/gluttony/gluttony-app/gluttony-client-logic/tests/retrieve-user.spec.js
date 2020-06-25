const retrieveUser = require('../src/retrieve-user')
const { random } = Math
require("gluttony-commons/polyfills/json")

describe("logic - retrieve user", () => {
    let name, surname, email, password

    beforeEach(async done => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        await registerUser(name, surname, email, password)
        await authenticateUser(email, password)

        done()
    })

    it("when user already exists should succeed on correct user id", async done => {
        const user = await retrieveUser()

        expect(user.id).toBeDefined()
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)
        expect(user.password).toBeUndefined()

        done()
    })
})